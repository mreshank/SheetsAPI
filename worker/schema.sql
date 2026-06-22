-- SheetsAPI D1 schema

CREATE TABLE IF NOT EXISTS users (
  user_key TEXT PRIMARY KEY,              -- opaque random ID exposed in URLs
  google_sub TEXT NOT NULL UNIQUE,        -- Google account ID (stable)
  email TEXT NOT NULL,
  refresh_token_enc TEXT NOT NULL,        -- AES-GCM encrypted refresh token (iv:ciphertext, base64)
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_users_sub ON users(google_sub);

CREATE TABLE IF NOT EXISTS api_keys (
  key TEXT PRIMARY KEY,                   -- random token, sent as Authorization: Bearer ...
  user_key TEXT NOT NULL,
  label TEXT,
  created_at INTEGER NOT NULL,
  last_used_at INTEGER,
  FOREIGN KEY (user_key) REFERENCES users(user_key) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_api_keys_user ON api_keys(user_key);

-- Optional: per-endpoint spreadsheet binding.
-- A user may have many spreadsheets; we resolve sheetName against a specific spreadsheet
-- that the user has registered. If only one, it's the default.
CREATE TABLE IF NOT EXISTS spreadsheets (
  id TEXT PRIMARY KEY,                    -- our opaque ID for this binding
  user_key TEXT NOT NULL,
  google_spreadsheet_id TEXT NOT NULL,
  title TEXT,
  is_default INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (user_key) REFERENCES users(user_key) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_ss_user ON spreadsheets(user_key);

CREATE TABLE IF NOT EXISTS oauth_states (
  state TEXT PRIMARY KEY,
  created_at INTEGER NOT NULL,
  return_to TEXT
);
