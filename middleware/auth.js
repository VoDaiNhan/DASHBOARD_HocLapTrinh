import { verifyAccessToken } from '../utils/jwt.js';
import { pool } from '../config/database.js';

/**
 * Middleware để verify JWT token từ request header
 */
export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Token không được cung cấp'
      });
    }

    const token = authHeader.split(' ')[1];
    
    // Verify token với JWT
    const decoded = verifyAccessToken(token);
    
    if (!decoded) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Token không hợp lệ hoặc đã hết hạn'
      });
    }

    // Lấy thông tin user từ database
    try {
      const result = await pool.query(
        'SELECT id, role FROM public.users WHERE id = $1',
        [decoded.userId]
      );

      if (!result.rows || result.rows.length === 0) {
        return res.status(401).json({
          error: 'Unauthorized',
          message: 'User không tồn tại'
        });
      }

      // Check session exists, is active, and not expired
      // We check both JWT signature (above) and database timestamp (here)
      // Note: token_expires_at is stored in VN time (UTC+7), so we need to convert NOW() to VN time
      const sessionResult = await pool.query(
        'SELECT id FROM public.user_sessions WHERE access_token = $1 AND is_active = true AND token_expires_at > NOW() AT TIME ZONE \'Asia/Ho_Chi_Minh\'',
        [token]
      );

      if (!sessionResult.rows || sessionResult.rows.length === 0) {
        return res.status(401).json({
          error: 'Unauthorized',
          message: 'Session không tồn tại, đã hết hạn hoặc đã bị đăng xuất'
        });
      }

      // Lưu user vào request để sử dụng trong routes
      req.user = {
        userId: result.rows[0].id,
        role: result.rows[0].role
      };
      req.token = token;
      
      next();
    } catch (dbError) {
      console.error('Database error in verifyToken:', dbError);
      return res.status(500).json({
        error: 'Server error',
        message: 'Lỗi database'
      });
    }
  } catch (error) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: error.message
    });
  }
};

/**
 * Middleware để check role
 */
export const checkRole = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          error: 'Unauthorized',
          message: 'Vui lòng đăng nhập'
        });
      }

      const userRole = req.user.role || 'sinh_vien';
      
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          error: 'Forbidden',
          message: 'Bạn không có quyền truy cập'
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        error: 'Server error',
        message: error.message
      });
    }
  };
};

export default {
  verifyToken,
  checkRole
};