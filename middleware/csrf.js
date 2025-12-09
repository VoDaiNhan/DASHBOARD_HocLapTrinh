import crypto from 'crypto';

// Check if we're in production (HTTPS) or development (HTTP)
// For Render.com or any HTTPS deployment, we need secure cookies
const isProduction = process.env.NODE_ENV === 'production' || 
                     process.env.FRONTEND_URL?.includes('https://') ||
                     process.env.PORT; // If PORT is set, likely production

export const generateCsrfToken = () => crypto.randomBytes(32).toString('hex');

export const setCsrfCookie = (res, token) => {
  // For production (HTTPS), use secure: true and sameSite: 'none'
  // For development (HTTP), use secure: false and sameSite: 'lax'
  const cookieOptions = {
    httpOnly: false, // must be readable by client to send back in header
    secure: isProduction, // true for HTTPS, false for HTTP
    sameSite: isProduction ? 'none' : 'lax', // 'none' requires secure: true
    path: '/',
    maxAge: 30 * 24 * 60 * 60 * 1000, // align with refresh token lifetime
    // Don't set domain - let browser set it to the request origin (frontend domain)
    // This allows frontend to read the cookie even in cross-origin scenarios
  };
  
  // If sameSite is 'none', secure must be true
  if (cookieOptions.sameSite === 'none' && !cookieOptions.secure) {
    cookieOptions.secure = true;
  }
  
  console.log('🍪 Setting CSRF cookie with options:', {
    secure: cookieOptions.secure,
    sameSite: cookieOptions.sameSite,
    isProduction,
    domain: 'not set (will use request origin)'
  });
  
  res.cookie('csrf_token', token, cookieOptions);
};

export const csrfProtection = (req, res, next) => {
  const cookieToken = req.cookies?.csrf_token;
  const headerToken = req.headers['x-csrf-token'];

  console.log('🔒 CSRF validation check:', {
    path: req.path,
    method: req.method,
    hasCookieToken: !!cookieToken,
    hasHeaderToken: !!headerToken,
    cookieTokenPreview: cookieToken ? cookieToken.substring(0, 20) + '...' : null,
    headerTokenPreview: headerToken ? headerToken.substring(0, 20) + '...' : null,
    tokensMatch: cookieToken === headerToken,
    allCookies: Object.keys(req.cookies || {})
  });

  if (!cookieToken || !headerToken || cookieToken !== headerToken) {
    console.error('❌ CSRF validation failed:', {
      missingCookie: !cookieToken,
      missingHeader: !headerToken,
      mismatch: cookieToken !== headerToken
    });
    return res.status(403).json({
      error: 'CSRF validation failed',
      message: 'Invalid or missing CSRF token'
    });
  }

  console.log('✅ CSRF validation passed');
  next();
};

export default {
  generateCsrfToken,
  setCsrfCookie,
  csrfProtection
};

