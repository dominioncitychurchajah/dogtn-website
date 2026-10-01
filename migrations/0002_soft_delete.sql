-- Deleting from the admin moves a row to Trash (restorable) instead of erasing it.
ALTER TABLE submissions ADD COLUMN deleted_at TEXT;
CREATE INDEX submissions_deleted ON submissions (deleted_at);
