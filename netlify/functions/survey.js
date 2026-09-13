import { google } from "googleapis";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
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

    if (!data.deliveryInterest || !data.postalCode) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Delivery interest and postal code are required",
        }),
      };
    }

    const postalCodeRaw = String(data.postalCode)
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "");

    const postalCode = postalCodeRaw.replace(/^(.{3})(.{3})$/, "$1 $2");

    const postalCodeRegex =
      /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/;

    if (!postalCodeRegex.test(postalCode)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Invalid postal code",
        }),
      };
    }

    // GOOGLE SHEETS AUTH

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

    // SAVE SURVEY RESPONSE

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Delivery Survey!A:E",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            String(data.deliveryInterest),
            postalCode,
            String(data.frequency || ""),
            submissionDate,
            String(data.language || "").toUpperCase(),
          ],
        ],
      },
    });

    console.log("Survey response saved", {
      postalCode,
      deliveryInterest: data.deliveryInterest,
      timestamp: new Date().toISOString(),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Survey submitted successfully.",
      }),
    };
  } catch (err) {
    console.error("Survey submission failed", {
      error: err.message,
      timestamp: new Date().toISOString(),
    });

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message,
      }),
    };
  }
}
