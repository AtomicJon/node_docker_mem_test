import { Pool } from 'pg';

export const pgNodePool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
