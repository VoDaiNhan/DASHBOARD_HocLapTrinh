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
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đặt lại mật khẩu</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5; padding: 40px 0;">
        <tr>
            <td align="center">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden;">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600; letter-spacing: 0.5px;">
                                🔐 Đặt lại mật khẩu
                            </h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                                Xin chào <strong style="color: #667eea;">${fullName}</strong>,
                            </p>
                            <p style="margin: 0 0 30px 0; color: #555555; font-size: 15px; line-height: 1.6;">
                                Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản của mình. Vui lòng nhấn vào nút bên dưới để tiếp tục.
                            </p>
                            
                            <!-- Button -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center" style="padding: 20px 0;">
                                        <a href="${resetUrl}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 6px; font-size: 16px; font-weight: 600; display: inline-block; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4); transition: all 0.3s ease;">
                                            Đặt lại mật khẩu
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Warning -->
                            <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 25px 0; border-radius: 4px;">
                                <p style="margin: 0; color: #856404; font-size: 14px; line-height: 1.5;">
                                    <strong>⚠️ Lưu ý:</strong> Link này sẽ hết hạn sau <strong style="color: #dc3545;">15 phút</strong>. Vui lòng đặt lại mật khẩu ngay.
                                </p>
                            </div>
                            
                            <!-- Security Notice -->
                            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                                <p style="margin: 0 0 15px 0; color: #888888; font-size: 13px; line-height: 1.6;">
                                    <strong>🔒 Bảo mật tài khoản:</strong> Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này và liên hệ với chúng tôi ngay lập tức.
                                </p>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 25px 30px; text-align: center; border-top: 1px solid #e0e0e0;">
                            <p style="margin: 0 0 10px 0; color: #666666; font-size: 14px;">
                                Trân trọng,
                            </p>
                            <p style="margin: 0; color: #667eea; font-size: 15px; font-weight: 600;">
                                Hệ thống Quản lý Học Lập Trình
                            </p>
                            <p style="margin: 15px 0 0 0; color: #999999; font-size: 12px;">
                                Email này được gửi tự động, vui lòng không trả lời.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
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
