import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

/**
 * Gửi email MSSV cho sinh viên sau khi đăng ký thành công
 * Email chỉ chứa MSSV vì sinh viên dùng MSSV và password để login
 */
export const sendMSSVEmail = async (email, fullName, mssv) => {
  try {
    // Kiểm tra email config có đầy đủ không
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn('⚠️ Email config chưa được setup. Chỉ log email content.');
      console.log('📧 Email content:', {
        to: email,
        subject: 'Thông tin đăng ký tài khoản - MSSV của bạn',
        body: `
Xin chào ${fullName},

Chúc mừng bạn đã đăng ký tài khoản thành công!

MSSV của bạn: ${mssv}

Vui lòng sử dụng MSSV và mật khẩu đã đăng ký để đăng nhập vào hệ thống.

Trân trọng,
Hệ thống Quản lý Học Lập Trình
        `
      });
      return {
        success: true,
        message: 'Email config chưa setup - chỉ log'
      };
    }

    // Tạo transporter với SMTP config
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true', // true cho 465, false cho các port khác
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // Nội dung email
    const subject = 'Thông tin đăng ký tài khoản - MSSV của bạn';
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Chúc mừng bạn đã đăng ký thành công!</h2>
        <p>Xin chào <strong>${fullName}</strong>,</p>
        <p>Chúc mừng bạn đã đăng ký tài khoản thành công trên hệ thống!</p>
        <div style="background-color: #f4f4f4; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 0; font-size: 18px;"><strong>MSSV của bạn:</strong></p>
          <p style="margin: 10px 0; font-size: 24px; color: #007bff; font-weight: bold;">${mssv}</p>
        </div>
        <p>Vui lòng sử dụng <strong>MSSV</strong> và <strong>mật khẩu</strong> đã đăng ký để đăng nhập vào hệ thống.</p>
        <p style="margin-top: 30px; color: #666; font-size: 14px;">Trân trọng,<br>Hệ thống Quản lý Học Lập Trình</p>
      </div>
    `;

    const textBody = `
Xin chào ${fullName},

Chúc mừng bạn đã đăng ký tài khoản thành công!

MSSV của bạn: ${mssv}

Vui lòng sử dụng MSSV và mật khẩu đã đăng ký để đăng nhập vào hệ thống.

Trân trọng,
Hệ thống Quản lý Học Lập Trình
    `;

    // Gửi email
    const info = await transporter.sendMail({
      from: `"Hệ thống Quản lý Học Lập Trình" <${process.env.EMAIL_FROM || process.env.SMTP_USER}>`,
      to: email,
      subject: subject,
      text: textBody,
      html: htmlBody
    });

    console.log('✅ Email sent successfully:', info.messageId);
    
    return {
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId
    };
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return {
      success: false,
      message: error.message
    };
  }
};

/**
 * Gửi email reset password cho user
 */
export const sendResetPasswordEmail = async (email, fullName, resetToken) => {
  try {
    // Kiểm tra email config có đầy đủ không
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn('⚠️ Email config chưa được setup. Chỉ log email content.');
      const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
      console.log('📧 Email content:', {
        to: email,
        subject: 'Đặt lại mật khẩu',
        body: `
Xin chào ${fullName},

Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản của mình.

Link đặt lại mật khẩu: ${resetUrl}

Link này sẽ hết hạn sau 15 phút.

Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.

Trân trọng,
Hệ thống Quản lý Học Lập Trình
        `
      });
      return {
        success: true,
        message: 'Email config chưa setup - chỉ log'
      };
    }

    // Tạo transporter với SMTP config
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // Tạo URL reset password
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const resetUrl = `${frontendUrl}/reset-password?token=${resetToken}`;

    // Nội dung email
    const subject = 'Đặt lại mật khẩu';
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Đặt lại mật khẩu</h2>
        <p>Xin chào <strong>${fullName}</strong>,</p>
        <p>Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản của mình.</p>
        <div style="background-color: #f4f4f4; padding: 20px; border-radius: 5px; margin: 20px 0; text-align: center;">
          <a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Đặt lại mật khẩu
          </a>
        </div>
        <p style="color: #666; font-size: 14px;">Hoặc copy link sau vào trình duyệt:</p>
        <p style="color: #007bff; font-size: 12px; word-break: break-all;">${resetUrl}</p>
        <p style="color: #ff0000; font-size: 14px;"><strong>Lưu ý:</strong> Link này sẽ hết hạn sau 15 phút.</p>
        <p style="margin-top: 30px; color: #666; font-size: 14px;">
          Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.<br>
          Trân trọng,<br>Hệ thống Quản lý Học Lập Trình
        </p>
      </div>
    `;

    const textBody = `
Xin chào ${fullName},

Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản của mình.

Link đặt lại mật khẩu: ${resetUrl}

Link này sẽ hết hạn sau 15 phút.

Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.

Trân trọng,
Hệ thống Quản lý Học Lập Trình
    `;

    // Gửi email
    const info = await transporter.sendMail({
      from: `"Hệ thống Quản lý Học Lập Trình" <${process.env.EMAIL_FROM || process.env.SMTP_USER}>`,
      to: email,
      subject: subject,
      text: textBody,
      html: htmlBody
    });

    console.log('✅ Reset password email sent successfully:', info.messageId);
    
    return {
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId
    };
  } catch (error) {
    console.error('❌ Error sending reset password email:', error);
    return {
      success: false,
      message: error.message
    };
  }
};

export default {
  sendMSSVEmail,
  sendResetPasswordEmail
};
