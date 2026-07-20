import { google } from 'googleapis'

const FORMULA_PREFIXES = ['=', '+', '-', '@', '\t', '\r']

type WaitlistRow = {
  timestamp: string
  email: string
  ip: string
  source: string
}

function sanitizeCell(value: string): string {
  const trimmed = value.trim()
  return FORMULA_PREFIXES.some((prefix) => trimmed.startsWith(prefix))
    ? `'${trimmed}`
    : trimmed
}

function getGoogleSheetsConfig() {
  const sheetId = process.env.GOOGLE_SHEET_ID
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL
  const privateKey = process.env.GOOGLE_PRIVATE_KEY

  if (!sheetId || !clientEmail || !privateKey) {
    throw new Error(
      'Google Sheets is not configured. Set GOOGLE_SHEET_ID, GOOGLE_CLIENT_EMAIL, and GOOGLE_PRIVATE_KEY.',
    )
  }

  return {
    sheetId,
    clientEmail,
    privateKey: privateKey.replace(/\\n/g, '\n'),
  }
}

export async function appendWaitlistToSheet(data: WaitlistRow): Promise<void> {
  const config = getGoogleSheetsConfig()
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: config.clientEmail,
      private_key: config.privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
  const sheets = google.sheets({ version: 'v4', auth })

  await sheets.spreadsheets.values.append({
    spreadsheetId: config.sheetId,
    range: 'Sheet1!A:D',
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [
        [
          sanitizeCell(data.timestamp),
          sanitizeCell(data.email),
          sanitizeCell(data.ip),
          sanitizeCell(data.source),
        ],
      ],
    },
  })
}
