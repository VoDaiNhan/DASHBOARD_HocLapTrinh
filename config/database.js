import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

// PostgreSQL Pool (Direct database connection - Neon)
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Required for Neon SSL connection
  }
});

// Test connection function
export async function testConnection() {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL configuration missing');
    }

    // Test PostgreSQL connection
    const client = await pool.connect();
    await client.query('SELECT 1');
    client.release();
    
    // Chỉ hiển thị thông báo thành công
    console.log('✅ Database connected successfully');
    
    return true;
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    return false;
  }
}

export default {
  pool,
  testConnection
};