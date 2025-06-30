import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { getSession } from '@/lib/session';

async function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({ auth, version: 'v4' });
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user || session.user.role !== 'client') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, location, budget, requiredByDate } = body;

    if (!title || !description || !location || !budget || !requiredByDate) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }
    
    const sheets = await getSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const sheetName = 'Jobs';
    const range = `${sheetName}!A1`;

    const dataToWrite = {
      postedBy: session.user.email,
      postedAt: new Date().toISOString(),
      title,
      description,
      location,
      budget: budget.toString(),
      requiredByDate,
      status: 'Open',
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
    console.error('Error writing job to Google Sheet:', error);
    return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
