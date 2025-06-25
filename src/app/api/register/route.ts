import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    const sheets = google.sheets({
      auth,
      version: 'v4',
    });

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = 'A1';

    // Hash password
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const { password, confirmPassword, ...dataToWrite } = body;
    dataToWrite.password = hashedPassword;


    // Check if the sheet has headers
    const getRows = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'A1:Z1',
    });

    const headers = Object.keys(dataToWrite);
    let needsHeader = !getRows.data.values || getRows.data.values.length === 0;

    if (needsHeader) {
      // Prepend headers to the sheet
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: 'A1',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [headers],
        },
      });
    }

    const values = headers.map(header => {
      const value = dataToWrite[header];
      if (Array.isArray(value)) {
        return value.join(', ');
      }
      return value || "";
    });

    // Append the new row of data
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [values],
      },
    });

    return NextResponse.json({ success: true, data: response.data });

  } catch (error: any) {
    console.error('Error writing to Google Sheet:', error);
    return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
