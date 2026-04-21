export type Env = {
  DB: D1Database;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  OAUTH_REDIRECT_URI: string;
  ENCRYPTION_KEY: string; // 64 hex chars
  DASHBOARD_URL: string;
};

export type UserRow = {
  user_key: string;
  google_sub: string;
  email: string;
  refresh_token_enc: string;
  created_at: number;
  updated_at: number;
};

export type SpreadsheetRow = {
  id: string;
  user_key: string;
  google_spreadsheet_id: string;
  title: string | null;
  is_default: number;
  created_at: number;
};
