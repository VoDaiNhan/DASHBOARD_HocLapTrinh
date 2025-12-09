import crypto from 'crypto';

const isProduction = process.env.NODE_ENV === 'production';

export const generateCsrfToken = () => crypto.randomBytes(32).toString('hex');

export const setCsrfCookie = (res, token) => {
  res.cookie('csrf_token', token, {
    httpOnly: false, // must be readable by client to send back in header
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    path: '/',
    maxAge: 30 * 24 * 60 * 60 * 1000 // align with refresh token lifetime
  });
};

export const csrfProtection = (req, res, next) => {
  const cookieToken = req.cookies?.csrf_token;
  const headerToken = req.headers['x-csrf-token'];

  if (!cookieToken || !headerToken || cookieToken !== headerToken) {
    return res.status(403).json({
      error: 'CSRF validation failed',
      message: 'Invalid or missing CSRF token'
    });
  }

  next();
};

export default {
  generateCsrfToken,
  setCsrfCookie,
  csrfProtection
};

