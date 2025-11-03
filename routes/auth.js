import express from 'express';
import {
  register,
  login,
  getCurrentUser,
  logout,
  forgotPassword,
  verifyResetToken,
  resetPassword,
  refreshToken
} from '../controllers/authController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Đăng ký tài khoản mới (mặc định role = sinh_vien)
 * @access  Public
 */
router.post('/register', register);

/**
 * @route   POST /api/auth/login
 * @desc    Đăng nhập
 * @access  Public
 */
router.post('/login', login);

/**
 * @route   GET /api/auth/me
 * @desc    Lấy thông tin user hiện tại
 * @access  Private
 */
router.get('/me', verifyToken, getCurrentUser);

/**
 * @route   POST /api/auth/logout
 * @desc    Đăng xuất session hiện tại
 * @access  Private
 */
router.post('/logout', verifyToken, logout);

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Gửi email reset password
 * @access  Public
 */
router.post('/forgot-password', forgotPassword);

/**
 * @route   GET /api/auth/verify-reset-token
 * @desc    Kiểm tra token reset password có hợp lệ không
 * @access  Public
 */
router.get('/verify-reset-token', verifyResetToken);

/**
 * @route   POST /api/auth/reset-password
 * @desc    Đặt lại mật khẩu mới
 * @access  Public
 */
router.post('/reset-password', resetPassword);

/**
 * @route   POST /api/auth/refresh-token
 * @desc    Làm mới access token
 * @access  Public
 */
router.post('/refresh-token', refreshToken);

export default router;