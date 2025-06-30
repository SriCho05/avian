'use server';

import { google } from 'googleapis';

const getSheetsClient = () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({
    auth,
    version: 'v4',
  });
};

export const getSheetData = async (range: string) => {
  const sheets = getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  return response.data.values;
};

export const appendSheetData = async (range: string, values: any[][]) => {
  const sheets = getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  const getRows = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'A1:Z1',
  });

  if (!getRows.data.values || getRows.data.values.length === 0) {
    const headers = [Object.keys(values[0][0])];
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'A1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: headers,
      },
    });
  }

  const response = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values,
    },
  });

  return response.data;
};

export const getAllJobs = async () => {
  try {
    const sheets = getSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const sheetName = 'Jobs';
    const range = `${sheetName}!A:Z`;

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    if (!rows || rows.length <= 1) {
      return []; // No jobs or only header exists
    }

    const headers = rows[0];
    const jobs = rows.slice(1).map(row => {
      const job: { [key: string]: any } = {};
      headers.forEach((header, index) => {
        job[header] = row[index];
      });
      return job;
    });

    return jobs.reverse(); // Show newest jobs first
  } catch (error: any) {
    if (error.message.includes("Unable to parse range") || error.message.includes("No sheet with the name 'Jobs' exists")) {
      // This likely means the 'Jobs' sheet doesn't exist yet.
      return [];
    }
    console.error('Error fetching jobs from Google Sheet:', error);
    throw new Error('Could not fetch jobs.');
  }
};

export const getJobsByClient = async (clientEmail: string) => {
    const allJobs = await getAllJobs();
    return allJobs.filter(job => job.postedBy === clientEmail);
}
