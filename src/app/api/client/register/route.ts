import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, fullName, companyName } = body;

    if (!email || !password || !fullName) {
      return NextResponse.json({ message: 'Email, password and full name are required' }, { status: 400 });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ auth, version: 'v4' });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const sheetName = 'Clients'; 
    const range = `${sheetName}!A1`;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const dataToWrite = {
        fullName,
        companyName: companyName || "",
        email,
        password: hashedPassword,
        registeredAt: new Date().toISOString(),
    };

    const headers = Object.keys(dataToWrite);
    const values = Object.values(dataToWrite);

    // Check if the sheet exists, create it if it doesn't
    const spreadsheetInfo = await sheets.spreadsheets.get({ spreadsheetId });
    const sheetExists = spreadsheetInfo.data.sheets?.some(s => s.properties?.title === sheetName);
    
    if (!sheetExists) {
        await sheets.spreadsheets.batchUpdate({
            spreadsheetId,
            requestBody: {
                requests: [{ addSheet: { properties: { title: sheetName } } }]
            }
        });
    }

    // Check if the sheet has headers
    const getRows = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A1:Z1`,
    });

    let needsHeader = !getRows.data.values || getRows.data.values.length === 0;

    if (needsHeader) {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${sheetName}!A1`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [headers],
        },
      });
    }

    // Append the new row of data
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [values],
      },
    });

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Error writing to Google Sheet:', error);
    return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
