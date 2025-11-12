import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { Client } from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../backend/.env')});

const pgClient = new Client({
  connectionString: process.env.PGURI,
});

pgClient
  .connect()
  .then(() => console.log('✅ Connected to PostgreSQL'))
  .catch((err) => console.error('❌ Database connection failed:', err));

export default pgClient;
