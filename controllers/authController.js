import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { pool } from '../config/database.js';
import { generateMSSV } from '../utils/mssvGenerator.js';
import { sendMSSVEmail, sendResetPasswordEmail } from '../utils/emailService.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt.js';

/**
 * Register - Đăng ký tài khoản mới
 * Sinh viên cần: email, password, full_name, class_name
 * Kiểm tra email và full_name có trong danh sách lớp không
 * Mặc định role = "sinh_vien"
 * Tự động tạo MSSV và gửi qua email
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
    
    // KIỂM TRA: Email và full_name có trong danh sách lớp không
    if (userRole === 'sinh_vien') {
      const classCheck = await pool.query(
        'SELECT id, is_registered FROM public.class WHERE class_name = $1 AND email = $2 AND full_name = $3',
        [class_name, email, full_name]
      );

      if (!classCheck.rows || classCheck.rows.length === 0) {
        return res.status(403).json({
          error: 'Registration denied',
          message: 'Bạn không có trong danh sách lớp học này'
        });
      }

      // Kiểm tra đã đăng ký chưa
      if (classCheck.rows[0].is_registered) {
        return res.status(400).json({
          error: 'Registration failed',
          message: 'Tài khoản này đã được đăng ký'
        });
      }

      // Kiểm tra email đã được sử dụng bởi tài khoản khác chưa
      const existingUser = await pool.query('SELECT id FROM public.users WHERE email = $1', [email]);
      if (existingUser.rows.length > 0) {
        return res.status(400).json({
          error: 'Registration failed',
          message: 'Email đã được sử dụng'
        });
      }

      // Tạo MSSV tự động cho sinh viên
      let mssv = null;
      try {
        mssv = await generateMSSV();
      } catch (mssvError) {
        console.error('Error generating MSSV:', mssvError);
        return res.status(500).json({
          error: 'Server error',
          message: 'Không thể tạo MSSV. Vui lòng thử lại sau.'
        });
      }

      // Hash password với bcrypt
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      // Lưu user vào database
      const insertQuery = `
        INSERT INTO public.users (email, mssv, full_name, password, class_id, role)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, email, mssv, full_name, role, created_at
      `;
      
      const result = await pool.query(insertQuery, [
        email,
        mssv,
        full_name,
        passwordHash,
        classCheck.rows[0].id,
        userRole
      ]);

      const newUser = result.rows[0];

      // Cập nhật trạng thái đã đăng ký trong bảng class
      await pool.query(
        'UPDATE public.class SET is_registered = true WHERE id = $1',
        [classCheck.rows[0].id]
      );

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
      const existingUser = await pool.query('SELECT id FROM public.users WHERE email = $1', [email]);
      if (existingUser.rows.length > 0) {
        return res.status(400).json({
          error: 'Registration failed',
          message: 'Email đã được sử dụng'
        });
      }

      // Hash password với bcrypt
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      // Lưu user vào database (không có class_id cho giảng viên)
      const insertQuery = `
        INSERT INTO public.users (email, mssv, full_name, password, role)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, email, mssv, full_name, role, created_at
      `;
      
      const result = await pool.query(insertQuery, [
        email,
        null,
        full_name,
        passwordHash,
        userRole
      ]);

      const newUser = result.rows[0];

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
    
    // Check for duplicate email or mssv
    if (error.code === '23505') { // PostgreSQL unique violation
      return res.status(400).json({
        error: 'Registration failed',
        message: error.constraint === 'users_email_key' 
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
    let user;
    if (mssv && !email) {
      // Login bằng MSSV
      const result = await pool.query(
        `SELECT u.id, u.email, u.mssv, u.full_name, u.password, u.role, c.class_name 
         FROM public.users u 
         LEFT JOIN public.class c ON u.class_id = c.id 
         WHERE u.mssv = $1`,
        [mssv]
      );
      user = result.rows[0];
    } else {
      // Login bằng email
      const result = await pool.query(
        `SELECT u.id, u.email, u.mssv, u.full_name, u.password, u.role, c.class_name 
         FROM public.users u 
         LEFT JOIN public.class c ON u.class_id = c.id 
         WHERE u.email = $1`,
        [email]
      );
      user = result.rows[0];
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
      await pool.query(
        `INSERT INTO public.user_sessions 
         (user_id, access_token, refresh_token, token_expires_at, refresh_token_expires_at)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          user.id,
          accessToken,
          refreshToken,
          tokenExpiresAt.toISOString(),
          refreshTokenExpiresAt.toISOString()
        ]
      );
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
        refresh_token: refreshToken,
        token_expires_at: tokenExpiresAt.toISOString(),
        refresh_token_expires_at: refreshTokenExpiresAt.toISOString()
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
    const result = await pool.query(
      'SELECT id, email, mssv, full_name, phone, address, class_id, role, created_at FROM public.users WHERE id = $1',
      [req.user.userId]
    );

    if (!result.rows || result.rows.length === 0) {
      return res.status(404).json({
        error: 'Not found',
        message: 'User không tồn tại'
      });
    }

    const user = result.rows[0];

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
      await pool.query(
        'DELETE FROM public.user_sessions WHERE access_token = $1',
        [token]
      );
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
    const result = await pool.query(
      'SELECT id, email, full_name FROM public.users WHERE email = $1',
      [email]
    );

    const user = result.rows[0];

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
    await pool.query(
      'INSERT INTO public.password_resets (user_id, token, expires_at) VALUES ($1, $2, $3)',
      [user.id, resetToken, expiresAt]
    );

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
    const result = await pool.query(
      'SELECT id, user_id, expires_at, is_used FROM public.password_resets WHERE token = $1',
      [token]
    );

    const resetRecord = result.rows[0];

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
    const tokenResult = await pool.query(
      'SELECT id, user_id, expires_at, is_used FROM public.password_resets WHERE token = $1',
      [token]
    );

    const resetRecord = tokenResult.rows[0];

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
    await pool.query(
      'UPDATE public.users SET password = $1, updated_at = NOW() WHERE id = $2',
      [hashedPassword, resetRecord.user_id]
    );

    // Đánh dấu token đã được sử dụng
    await pool.query(
      'UPDATE public.password_resets SET is_used = true WHERE id = $1',
      [resetRecord.id]
    );

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
    // Note: refresh_token_expires_at is stored in VN time (UTC+7), so we need to convert NOW() to VN time
    const sessionResult = await pool.query(
      'SELECT user_id, is_active FROM public.user_sessions WHERE refresh_token = $1 AND refresh_token_expires_at > NOW() AT TIME ZONE \'Asia/Ho_Chi_Minh\'',
      [refresh_token]
    );

    if (!sessionResult.rows || sessionResult.rows.length === 0) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Refresh token không còn hợp lệ'
      });
    }

    const session = sessionResult.rows[0];

    // Get user info to generate new tokens
    const userResult = await pool.query(
      'SELECT id, role FROM public.users WHERE id = $1',
      [decoded.userId]
    );

    if (!userResult.rows || userResult.rows.length === 0) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'User không tồn tại'
      });
    }

    const user = userResult.rows[0];

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
    await pool.query(
      `UPDATE public.user_sessions 
       SET access_token = $1, refresh_token = $2, token_expires_at = $3, refresh_token_expires_at = $4, updated_at = NOW()
       WHERE refresh_token = $5`,
      [newAccessToken, newRefreshToken, tokenExpiresAt.toISOString(), refreshTokenExpiresAt.toISOString(), refresh_token]
    );

    return res.json({
      success: true,
      message: 'Token đã được làm mới',
      data: {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
        token_expires_at: tokenExpiresAt.toISOString(),
        refresh_token_expires_at: refreshTokenExpiresAt.toISOString()
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