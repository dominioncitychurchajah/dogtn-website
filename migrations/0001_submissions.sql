-- Every form submission (event registration or mentorship waitlist) lands here
-- first; the Google Sheet and the confirmation email are downstream of this row.
CREATE TABLE submissions (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  type            TEXT NOT NULL CHECK (type IN ('registration', 'waitlist')),
  -- Event slug for registrations, track slug (or '') for the waitlist. Together
  -- with type + email it makes a resubmission update the row, not duplicate it.
  ref             TEXT NOT NULL DEFAULT '',
  ref_title       TEXT NOT NULL DEFAULT '',
  full_name       TEXT NOT NULL,
  email           TEXT NOT NULL,
  phone           TEXT NOT NULL,
  country         TEXT NOT NULL,
  seats           INTEGER,
  volunteer       TEXT,
  volunteer_areas TEXT,
  current_role    TEXT,
  -- pending -> sent | failed. Failed rows are retried from the admin page.
  email_status    TEXT NOT NULL DEFAULT 'pending',
  email_error     TEXT,
  created_at      TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at      TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  UNIQUE (type, ref, email)
);

CREATE INDEX submissions_created ON submissions (created_at);
CREATE INDEX submissions_email_status ON submissions (email_status);
