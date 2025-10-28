import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config({ quiet: true });

const pgClient = new Client({
  connectionString: process.env.PGURI,
  ssl: { rejectUnauthorized: false },
});

pgClient
  .connect()
  .then(() => console.log('✅ Connected to PostgreSQL'))
  .catch((err) => console.error('❌ Database connection failed:', err));

export default pgClient;
