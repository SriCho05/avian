import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

const secretKey = process.env.JWT_SECRET_KEY!;
const key = new TextEncoder().encode(secretKey);

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
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const sheets = await getSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const sheetName = 'Clients';
    const range = `${sheetName}!A:Z`;

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    if (!rows || rows.length <= 1) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const headers = rows[0];
    const emailIndex = headers.indexOf('email');
    const passwordIndex = headers.indexOf('password');

    if (emailIndex === -1 || passwordIndex === -1) {
      return NextResponse.json({ message: 'Client sheet configuration error' }, { status: 500 });
    }
    
    const clientRow = rows.slice(1).find(row => row[emailIndex] === email);

    if (!clientRow) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const hashedPassword = clientRow[passwordIndex];
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);

    if (!passwordsMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const clientData: { [key: string]: any } = { role: 'client' };
    headers.forEach((header, index) => {
        if(header !== 'password') {
            clientData[header] = clientRow[index];
        }
    });

    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    const session = await new SignJWT({ user: clientData, expires })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(key);
      
    cookies().set('session', session, { expires, httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    return NextResponse.json({ success: true });

  } catch (error: any) {
    if (error.message.includes("No sheet with the name 'Clients' exists")) {
       return NextResponse.json({ message: 'No clients have registered yet. Please register a client account first.' }, { status: 404 });
    }
    console.error('Client login error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
