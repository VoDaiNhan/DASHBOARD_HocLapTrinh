import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { getPool, sql } from '../config/database.js';
import { sendMSSVEmail, sendResetPasswordEmail } from '../utils/emailService.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt.js';

/**
 * Register - Đăng ký tài khoản mới
 * Sinh viên cần: email, password, full_name, class_name
 * Kiểm tra full_name và class_name có trong danh sách lớp không
 * Lấy StudentID từ bảng class làm MSSV
 * Mặc định role = "sinh_vien"
 * Gửi MSSV qua email mà user đã nhập
 */
export const register = async (req, res) => {
  try {
    const { email, password, full_name, class_name, role } = req.body;

    // Validation - Sinh viên cần email, password, full_name, class_name
    if (!email || !password || !full_name || !class_name) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'Email, password, full_name và class_name là bắt buộc'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'Password phải có ít nhất 6 ký tự'
      });
    }

    // Mặc định role = "sinh_vien"
    const userRole = role || 'sinh_vien';
    
    // KIỂM TRA: full_name và class_name có trong danh sách lớp không
    if (userRole === 'sinh_vien') {
      // Check trong bảng class: LopID = class_name và HoTenSV = full_name
      const pool = await getPool();
      const classCheckResult = await pool.request()
        .input('class_name', sql.NVarChar(20), class_name)
        .input('full_name', sql.NVarChar(255), full_name)
        .query('SELECT id, StudentID FROM class WHERE LopID = @class_name AND HoTenSV = @full_name');

      if (!classCheckResult.recordset || classCheckResult.recordset.length === 0) {
        return res.status(403).json({
          error: 'Registration denied',
          message: 'Bạn không có trong danh sách lớp học này'
        });
      }

      // Lấy StudentID từ bảng class làm MSSV
      const mssv = classCheckResult.recordset[0].StudentID;

      // Kiểm tra MSSV (StudentID) đã được sử dụng chưa (đã có user nào đăng ký với MSSV này chưa)
      const existingMSSVResult = await pool.request()
        .input('mssv', sql.NVarChar(20), mssv)
        .query('SELECT id FROM users WHERE mssv = @mssv');
      
      if (existingMSSVResult.recordset.length > 0) {
        return res.status(400).json({
          error: 'Registration failed',
          message: 'MSSV này đã được đăng ký'
        });
      }

      // Kiểm tra email đã được sử dụng bởi tài khoản khác chưa
      const existingUserResult = await pool.request()
        .input('email', sql.NVarChar(255), email)
        .query('SELECT id FROM users WHERE email = @email');
      
      if (existingUserResult.recordset.length > 0) {
        return res.status(400).json({
          error: 'Registration failed',
          message: 'Email đã được sử dụng'
        });
      }

      // Hash password với bcrypt
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      // Lưu user vào database
      const insertResult = await pool.request()
        .input('email', sql.NVarChar(255), email)
        .input('mssv', sql.NVarChar(20), mssv)
        .input('full_name', sql.NVarChar(255), full_name)
        .input('password', sql.NVarChar(255), passwordHash)
        .input('class_id', sql.Int, classCheckResult.recordset[0].id)
        .input('role', sql.NVarChar(20), userRole)
        .query(`
          INSERT INTO users (email, mssv, full_name, password, class_id, role)
          OUTPUT INSERTED.id, INSERTED.email, INSERTED.mssv, INSERTED.full_name, INSERTED.role, INSERTED.created_at
          VALUES (@email, @mssv, @full_name, @password, @class_id, @role)
        `);

      const newUser = insertResult.recordset[0];

      // Gửi email MSSV cho sinh viên
      if (mssv) {
        try {
          await sendMSSVEmail(email, full_name, mssv);
          console.log(`✅ MSSV ${mssv} sent to ${email}`);
        } catch (emailError) {
          console.error('Error sending MSSV email:', emailError);
          // Không fail registration nếu không gửi được email
        }
      }

      return res.status(201).json({
        success: true,
        message: 'Đăng ký thành công! MSSV đã được gửi đến email của bạn.',
        data: {
          user: {
            id: newUser.id,
            email: newUser.email,
            mssv: newUser.mssv,
            full_name: newUser.full_name,
            role: newUser.role
          }
        }
      });
    } else {
      // Cho giảng viên và quản lý ngành đăng ký mà không cần kiểm tra class
      const pool = await getPool();
      const existingUserResult = await pool.request()
        .input('email', sql.NVarChar(255), email)
        .query('SELECT id FROM users WHERE email = @email');
      
      if (existingUserResult.recordset.length > 0) {
        return res.status(400).json({
          error: 'Registration failed',
          message: 'Email đã được sử dụng'
        });
      }

      // Hash password với bcrypt
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      // Lưu user vào database (không có class_id cho giảng viên)
      const insertResult = await pool.request()
        .input('email', sql.NVarChar(255), email)
        .input('mssv', sql.NVarChar(20), null)
        .input('full_name', sql.NVarChar(255), full_name)
        .input('password', sql.NVarChar(255), passwordHash)
        .input('role', sql.NVarChar(20), userRole)
        .query(`
          INSERT INTO users (email, mssv, full_name, password, role)
          OUTPUT INSERTED.id, INSERTED.email, INSERTED.mssv, INSERTED.full_name, INSERTED.role, INSERTED.created_at
          VALUES (@email, @mssv, @full_name, @password, @role)
        `);

      const newUser = insertResult.recordset[0];

      return res.status(201).json({
        success: true,
        message: 'Đăng ký thành công!',
        data: {
          user: {
            id: newUser.id,
            email: newUser.email,
            mssv: newUser.mssv,
            full_name: newUser.full_name,
            role: newUser.role
          }
        }
      });
    }
  } catch (error) {
    console.error('Register error:', error);
    
    // Check for duplicate email or mssv (SQL Server error code 2627)
    if (error.number === 2627) { // SQL Server unique violation
      return res.status(400).json({
        error: 'Registration failed',
        message: error.message.includes('email') || error.message.includes('users_email')
          ? 'Email đã tồn tại'
          : 'MSSV đã tồn tại'
      });
    }
    
    return res.status(500).json({
      error: 'Server error',
      message: error.message
    });
  }
};

/**
 * Login - Đăng nhập
 * Có thể login bằng email hoặc MSSV
 */
export const login = async (req, res) => {
  try {
    const { email, mssv, password } = req.body;

    // Validation
    if (!password || (!email && !mssv)) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'Email hoặc MSSV và password là bắt buộc'
      });
    }

    // Tìm user bằng email hoặc MSSV
    const pool = await getPool();
    let user;
    if (mssv && !email) {
      // Login bằng MSSV
      const result = await pool.request()
        .input('mssv', sql.NVarChar(20), mssv)
        .query(`
          SELECT u.id, u.email, u.mssv, u.full_name, u.password, u.role, c.LopID as class_name 
          FROM users u 
          LEFT JOIN class c ON u.class_id = c.id 
          WHERE u.mssv = @mssv
        `);
      user = result.recordset[0];
    } else {
      // Login bằng email
      const result = await pool.request()
        .input('email', sql.NVarChar(255), email)
        .query(`
          SELECT u.id, u.email, u.mssv, u.full_name, u.password, u.role, c.LopID as class_name 
          FROM users u 
          LEFT JOIN class c ON u.class_id = c.id 
          WHERE u.email = @email
        `);
      user = result.recordset[0];
    }

    // Check user exists
    if (!user) {
      return res.status(401).json({
        error: 'Login failed',
        message: 'Email/MSSV hoặc password không đúng'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Login failed',
        message: 'Email/MSSV hoặc password không đúng'
      });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id);

    // Decode JWT để lấy thời gian hết hạn từ token
    const accessTokenDecoded = jwt.decode(accessToken);
    const refreshTokenDecoded = jwt.decode(refreshToken);
    
    // Tính toán thời gian hết hạn từ JWT (exp is in seconds)
    // Convert sang giờ VN (UTC+7) để lưu vào database
    const tokenExpiresAtUTC = new Date(accessTokenDecoded.exp * 1000);
    const refreshTokenExpiresAtUTC = new Date(refreshTokenDecoded.exp * 1000);
    
    const tokenExpiresAt = new Date(tokenExpiresAtUTC.getTime() + 7 * 60 * 60 * 1000);
    const refreshTokenExpiresAt = new Date(refreshTokenExpiresAtUTC.getTime() + 7 * 60 * 60 * 1000);

    // Lưu session vào database (đã convert sang giờ VN)
    try {
      await pool.request()
        .input('user_id', sql.UniqueIdentifier, user.id)
        .input('access_token', sql.NVarChar(sql.MAX), accessToken)
        .input('refresh_token', sql.NVarChar(sql.MAX), refreshToken)
        .input('token_expires_at', sql.DateTime2, tokenExpiresAt.toISOString())
        .input('refresh_token_expires_at', sql.DateTime2, refreshTokenExpiresAt.toISOString())
        .query(`
          INSERT INTO user_sessions 
          (user_id, access_token, refresh_token, token_expires_at, refresh_token_expires_at)
          VALUES (@user_id, @access_token, @refresh_token, @token_expires_at, @refresh_token_expires_at)
        `);
    } catch (sessionError) {
      console.warn('Warning: Could not insert into user_sessions table:', sessionError.message);
    }

    // Remove password from response
    delete user.password;

    return res.json({
      success: true,
      message: 'Đăng nhập thành công',
      data: {
        user: {
          id: user.id,
          email: user.email,
          mssv: user.mssv,
          full_name: user.full_name,
          class: user.class_name || null
        },
        access_token: accessToken,
        refresh_token: refreshToken
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      error: 'Server error',
      message: error.message
    });
  }
};

/**
 * Get Current User - Lấy thông tin user hiện tại
 */
export const getCurrentUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Vui lòng đăng nhập'
      });
    }

    // Lấy thông tin user từ database
    const pool = await getPool();
    const result = await pool.request()
      .input('user_id', sql.UniqueIdentifier, req.user.userId)
      .query('SELECT id, email, mssv, full_name, phone, address, class_id, role, created_at FROM users WHERE id = @user_id');

    if (!result.recordset || result.recordset.length === 0) {
      return res.status(404).json({
        error: 'Not found',
        message: 'User không tồn tại'
      });
    }

    const user = result.recordset[0];

    return res.json({
      success: true,
      data: {
        user
      }
    });
  } catch (error) {
    console.error('Get current user error:', error);
    return res.status(500).json({
      error: 'Server error',
      message: error.message
    });
  }
};

/**
 * Logout - Đăng xuất (xóa session hiện tại)
 */
export const logout = async (req, res) => {
  try {
    const token = req.token;

    if (!token) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Vui lòng đăng nhập'
      });
    }

    // Xóa session khỏi database (hard delete để bảo mật)
    try {
      const pool = await getPool();
      await pool.request()
        .input('token', sql.NVarChar(sql.MAX), token)
        .query('DELETE FROM user_sessions WHERE access_token = @token');
      console.log('✅ Session deleted successfully from database');
    } catch (sessionError) {
      console.warn('Warning: Could not delete session from user_sessions table:', sessionError.message);
    }

    return res.json({
      success: true,
      message: 'Đăng xuất thành công'
    });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({
      error: 'Server error',
      message: error.message
    });
  }
};

/**
 * Forgot Password - Gửi email reset password
 */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Validation
    if (!email) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'Email là bắt buộc'
      });
    }

    // Tìm user trong database
    const pool = await getPool();
    const result = await pool.request()
      .input('email', sql.NVarChar(255), email)
      .query('SELECT id, email, full_name FROM users WHERE email = @email');

    const user = result.recordset[0];

    // Không báo lỗi nếu email không tồn tại để tránh brute force
    if (!user) {
      return res.json({
        success: true,
        message: 'Nếu email tồn tại, bạn sẽ nhận được link đặt lại mật khẩu'
      });
    }

    // Tạo token reset password
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 phút

    // Lưu token vào database
    await pool.request()
      .input('user_id', sql.UniqueIdentifier, user.id)
      .input('token', sql.NVarChar(255), resetToken)
      .input('expires_at', sql.DateTime2, expiresAt)
      .query('INSERT INTO password_resets (user_id, token, expires_at) VALUES (@user_id, @token, @expires_at)');

    // Gửi email reset password
    try {
      await sendResetPasswordEmail(user.email, user.full_name, resetToken);
      console.log(`✅ Reset password email sent to ${user.email}`);
    } catch (emailError) {
      console.error('Error sending reset password email:', emailError);
      // Không fail nếu không gửi được email
    }

    return res.json({
      success: true,
      message: 'Nếu email tồn tại, bạn sẽ nhận được link đặt lại mật khẩu'
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return res.status(500).json({
      error: 'Server error',
      message: error.message
    });
  }
};

/**
 * Verify Reset Token - Kiểm tra token reset password có hợp lệ không
 */
export const verifyResetToken = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'Token không được cung cấp'
      });
    }

    // Tìm token trong database
    const pool = await getPool();
    const result = await pool.request()
      .input('token', sql.NVarChar(255), token)
      .query('SELECT id, user_id, expires_at, is_used FROM password_resets WHERE token = @token');

    const resetRecord = result.recordset[0];

    // Kiểm tra token có tồn tại không
    if (!resetRecord) {
      return res.status(404).json({
        error: 'Invalid token',
        message: 'Token không hợp lệ hoặc không tồn tại'
      });
    }

    // Kiểm tra token đã được sử dụng chưa
    if (resetRecord.is_used) {
      return res.status(400).json({
        error: 'Token already used',
        message: 'Token này đã được sử dụng'
      });
    }

    // Kiểm tra token đã hết hạn chưa
    if (new Date() > new Date(resetRecord.expires_at)) {
      return res.status(400).json({
        error: 'Token expired',
        message: 'Token đã hết hạn'
      });
    }

    // Token hợp lệ
    return res.json({
      success: true,
      message: 'Token hợp lệ',
      valid: true
    });
  } catch (error) {
    console.error('Verify reset token error:', error);
    return res.status(500).json({
      error: 'Server error',
      message: error.message
    });
  }
};

/**
 * Reset Password - Đặt lại mật khẩu mới
 */
export const resetPassword = async (req, res) => {
  try {
    const { token, password, confirmPassword } = req.body;

    // Validation
    if (!token || !password || !confirmPassword) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'Token, password và confirmPassword là bắt buộc'
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'Password và confirmPassword không khớp'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'Password phải có ít nhất 6 ký tự'
      });
    }

    // Tìm token trong database
    const pool = await getPool();
    const tokenResult = await pool.request()
      .input('token', sql.NVarChar(255), token)
      .query('SELECT id, user_id, expires_at, is_used FROM password_resets WHERE token = @token');

    const resetRecord = tokenResult.recordset[0];

    // Kiểm tra token có tồn tại không
    if (!resetRecord) {
      return res.status(404).json({
        error: 'Invalid token',
        message: 'Token không hợp lệ hoặc không tồn tại'
      });
    }

    // Kiểm tra token đã được sử dụng chưa
    if (resetRecord.is_used) {
      return res.status(400).json({
        error: 'Token already used',
        message: 'Token này đã được sử dụng'
      });
    }

    // Kiểm tra token đã hết hạn chưa
    if (new Date() > new Date(resetRecord.expires_at)) {
      return res.status(400).json({
        error: 'Token expired',
        message: 'Token đã hết hạn'
      });
    }

    // Hash password mới
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Cập nhật password mới cho user
    await pool.request()
      .input('password', sql.NVarChar(255), hashedPassword)
      .input('user_id', sql.UniqueIdentifier, resetRecord.user_id)
      .query('UPDATE users SET password = @password, updated_at = GETDATE() WHERE id = @user_id');

    // Đánh dấu token đã được sử dụng
    await pool.request()
      .input('id', sql.UniqueIdentifier, resetRecord.id)
      .query('UPDATE password_resets SET is_used = 1 WHERE id = @id');

    return res.json({
      success: true,
      message: 'Đặt lại mật khẩu thành công'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    return res.status(500).json({
      error: 'Server error',
      message: error.message
    });
  }
};

/**
 * Refresh Token - Làm mới access token khi token hết hạn
 */
export const refreshToken = async (req, res) => {
  try {
    const { refresh_token } = req.body;

    // Validation
    if (!refresh_token) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'Refresh token là bắt buộc'
      });
    }

    // Verify refresh token
    const decoded = verifyRefreshToken(refresh_token);
    
    if (!decoded) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Refresh token không hợp lệ hoặc đã hết hạn'
      });
    }

    // Check refresh token exists in database and is still valid
    const pool = await getPool();
    const sessionResult = await pool.request()
      .input('refresh_token', sql.NVarChar(sql.MAX), refresh_token)
      .query('SELECT user_id, is_active FROM user_sessions WHERE refresh_token = @refresh_token AND refresh_token_expires_at > GETDATE()');

    if (!sessionResult.recordset || sessionResult.recordset.length === 0) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Refresh token không còn hợp lệ'
      });
    }

    const session = sessionResult.recordset[0];

    // Get user info to generate new tokens
    const userResult = await pool.request()
      .input('user_id', sql.UniqueIdentifier, decoded.userId)
      .query('SELECT id, role FROM users WHERE id = @user_id');

    if (!userResult.recordset || userResult.recordset.length === 0) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'User không tồn tại'
      });
    }

    const user = userResult.recordset[0];

    // Generate new tokens
    const newAccessToken = generateAccessToken(user.id, user.role);
    const newRefreshToken = generateRefreshToken(user.id);

    // Decode new tokens to get expiry times
    const newAccessTokenDecoded = jwt.decode(newAccessToken);
    const newRefreshTokenDecoded = jwt.decode(newRefreshToken);
    
    // Convert sang giờ VN (UTC+7) để lưu vào database
    const tokenExpiresAtUTC = new Date(newAccessTokenDecoded.exp * 1000);
    const refreshTokenExpiresAtUTC = new Date(newRefreshTokenDecoded.exp * 1000);
    
    const tokenExpiresAt = new Date(tokenExpiresAtUTC.getTime() + 7 * 60 * 60 * 1000);
    const refreshTokenExpiresAt = new Date(refreshTokenExpiresAtUTC.getTime() + 7 * 60 * 60 * 1000);

    // Update session in database (đã convert sang giờ VN)
    await pool.request()
      .input('access_token', sql.NVarChar(sql.MAX), newAccessToken)
      .input('refresh_token', sql.NVarChar(sql.MAX), newRefreshToken)
      .input('token_expires_at', sql.DateTime2, tokenExpiresAt.toISOString())
      .input('refresh_token_expires_at', sql.DateTime2, refreshTokenExpiresAt.toISOString())
      .input('old_refresh_token', sql.NVarChar(sql.MAX), refresh_token)
      .query(`
        UPDATE user_sessions 
        SET access_token = @access_token, refresh_token = @refresh_token, token_expires_at = @token_expires_at, refresh_token_expires_at = @refresh_token_expires_at, updated_at = GETDATE()
        WHERE refresh_token = @old_refresh_token
      `);

    return res.json({
      success: true,
      message: 'Token đã được làm mới',
      data: {
        access_token: newAccessToken,
        refresh_token: newRefreshToken
      }
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    return res.status(500).json({
      error: 'Server error',
      message: error.message
    });
  }
};

export default {
  register,
  login,
  getCurrentUser,
  logout,
  forgotPassword,
  verifyResetToken,
  resetPassword,
  refreshToken
};