import { google } from "googleapis";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const data = JSON.parse(event.body);

    // VALIDATION
    if (!data.name || !data.email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Name and email are required" }),
      };
    }

    if (!data.items || data.items.trim() === "") {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "At least one item must be selected" }),
      };
    }

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

    const pickupDate = getNextPickupDate();

    await sheets.spreadsheets.values.append({
      spreadsheetId: "1XQKiYR-1TwWMSml0jOCLqXBUKo7vIjdfHY7QkmmxPrU",
      range: "Orders!A:J",
      valueInputOption: "RAW",
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

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Saved to sheet" }),
    };
  } catch (err) {
    console.error("ERROR:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
