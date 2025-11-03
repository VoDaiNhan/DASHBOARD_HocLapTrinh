import { pool } from '../config/database.js';

/**
 * Tạo MSSV tự động cho sinh viên
 * Format: YY + số tăng dần (5 chữ số)
 * Ví dụ: 2400001, 2400002, ...
 */
export const generateMSSV = async () => {
  try {
    // Lấy 2 số cuối của năm hiện tại
    const currentYear = new Date().getFullYear().toString().slice(-2);
    
    // Query để tìm MSSV lớn nhất trong năm hiện tại
    const query = `
      SELECT COALESCE(MAX(CAST(SUBSTRING(mssv, 3) AS INTEGER)), 0) as max_num
      FROM public.users
      WHERE mssv LIKE $1 || '%'
        AND role = 'sinh_vien'
        AND mssv IS NOT NULL
    `;
    
    const result = await pool.query(query, [currentYear]);
    const maxNum = result.rows[0]?.max_num || 0;
    
    // Tạo MSSV mới: YY + số tăng dần (5 chữ số)
    const newNum = maxNum + 1;
    const mssv = currentYear + String(newNum).padStart(5, '0');
    
    return mssv;
  } catch (error) {
    console.error('Error generating MSSV:', error);
    
    // Fallback: Tạo MSSV từ timestamp nếu có lỗi
    const timestamp = Date.now().toString().slice(-7);
    const currentYear = new Date().getFullYear().toString().slice(-2);
    return currentYear + timestamp;
  }
};

export default {
  generateMSSV
};
