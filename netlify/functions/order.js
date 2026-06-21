import { google } from "googleapis";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let data;

  try {
    data = JSON.parse(event.body);

    // HONEYPOT

    if (data.website) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Spam detected" }),
      };
    }

    // TIMING CHECK

    const startedAt = Number(data.form_started_at || 0);
    const elapsed = Date.now() - startedAt;

    if (elapsed < 3000) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Submission too fast" }),
      };
    }

    // VALIDATION

    
    if (!data.name || !data.email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Name and email are required" }),
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(data.email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid email" }),
      };
    }

    const hasItems =
      (data.items && data.items.trim() !== "") ||
      (data.notSlicedItems && data.notSlicedItems.trim() !== "");

    if (!hasItems) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "At least one item must be selected",
        }),
      };
    }

    console.log("Incoming order", {
      email: data.email,
      total: data.total,
      timestamp: new Date().toISOString(),
    });

    // Convert private key to proper multiline format
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(
      /\\n/g,
      "\n",
    ).replace(/\r/g, "");

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: privateKey,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({
      version: "v4",
      auth: await auth.getClient(),
    });

    const submissionDate = new Date().toLocaleString("en-CA", {
      timeZone: "America/Toronto",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

    function getNextPickupDate() {
      const today = new Date();
      const day = today.getDay(); // 0=Sunday

      const daysUntilMonday = (1 - day + 7) % 7 || 7;

      const nextMonday = new Date(today);
      nextMonday.setDate(today.getDate() + daysUntilMonday);

      return nextMonday.toLocaleDateString("en-CA", {
        month: "short",
        day: "numeric",
      });
    }

    if (!data.pickupDate) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Pickup date is required",
        }),
      };
    }

    const [year, month, date] = data.pickupDate.split("-").map(Number);

    const pickupDateObj = new Date(year, month - 1, date);

    const day = pickupDateObj.getDay();

    if (![4, 5, 6].includes(day)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Invalid pickup date",
        }),
      };
    }

    const pickupDate = data.pickupDate;

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Orders!A:J",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            data.name,
            data.email,
            data.phone,
            data.items,
            data.notSlicedItems || "",
            data.total,
            data.comments,
            "Pending",
            pickupDate,
            submissionDate,
          ],
        ],
      },
    });

    console.log("Order saved successfully", {
      email: data.email,
      pickupDate,
      submissionDate,
    });

    // EMAIL SUBMISSION FUNCTION

    try {
      const resendResponse = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: process.env.ORDER_ADMIN_EMAIL,
        subject: `New bakery order — ${data.name}`,
        text: `
New bakery order received

Customer
--------
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || "N/A"}

Order
-----
Sliced Items:
${data.items || "None"}

Not Sliced:
${data.notSlicedItems || "None"}

Total:
${data.total || "N/A"}

Comments:
${data.comments || "None"}

Pickup Date:
${pickupDate}

Submitted:
${submissionDate}
    `,
      });

      if (resendResponse.error) {
        console.error("Order email failed", {
          error: resendResponse.error,
          email: data.email,
          timestamp: new Date().toISOString(),
        });
      } else {
        console.log("Order email sent", {
          email: data.email,
          resendId: resendResponse.data?.id,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (emailError) {
      console.error("Order email exception", {
        error: emailError.message,
        email: data.email,
        timestamp: new Date().toISOString(),
      });
    }

    // END

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Saved to sheet" }),
    };
  } catch (err) {
    console.error("Google Sheets append failed", {
      error: err.message,
      email: data?.email,
      timestamp: new Date().toISOString(),
    });

    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
