import { pool } from '../config/database.js';

/**
 * Tạo MSSV tự động cho sinh viên (Thread-safe với database sequence)
 * Format: YY + số tăng dần (5 chữ số)
 * Ví dụ: 2400001, 2400002, ...
 * 
 * ✅ Fix race condition: Sử dụng PostgreSQL sequence
 * Nhiều user đăng ký cùng lúc không bị trùng MSSV
 */
export const generateMSSV = async () => {
  const client = await pool.connect();
  
  try {
    // Bắt đầu transaction
    await client.query('BEGIN');
    
    // Gọi function generate_mssv_safe() từ database
    // Function này sử dụng sequence nên thread-safe
    const result = await client.query('SELECT public.generate_mssv_safe() as mssv');
    const mssv = result.rows[0].mssv;
    
    // Commit transaction
    await client.query('COMMIT');
    
    return mssv;
  } catch (error) {
    // Rollback nếu có lỗi
    await client.query('ROLLBACK');
    console.error('Error generating MSSV:', error);
    
    // Fallback: Tạo MSSV từ timestamp + random
    const timestamp = Date.now().toString().slice(-5);
    const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    const currentYear = new Date().getFullYear().toString().slice(-2);
    return currentYear + timestamp + random;
  } finally {
    client.release();
  }
};

export default {
  generateMSSV
};
