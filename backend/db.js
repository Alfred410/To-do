import dotenv from 'dotenv';
import path from 'path';
import { Client } from 'pg';

const envFile =
  process.env.NODE_ENV === 'production' ? '.env.docker' : '.env.local';

dotenv.config({ path: path.resolve(process.cwd(), envFile) });
console.log('✅ Loaded env file for DB:', envFile);

if (!process.env.PGURI) {
  throw new Error('❌ Missing PGURI in environment variables');
}

const pgClient = new Client({
  connectionString: process.env.PGURI,
});

pgClient
  .connect()
  .then(() => console.log('✅ Connected to PostgreSQL'))
  .catch((err) => console.error('❌ Database connection failed:', err));

export default pgClient;
