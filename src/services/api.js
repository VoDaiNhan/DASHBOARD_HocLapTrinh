const API_BASE_URL = 'https://be-dashboard-hoclaptrinh.onrender.com';

/**
 * Decode JWT token to get payload (without verification)
 * WARNING: This is client-side decoding only, backend always verifies
 */
export const decodeJWT = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

/**
 * Check if token is expired
 */
export const isTokenExpired = (token) => {
  if (!token) return true;
  
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) return true;
  
  // exp is in seconds, Date.now() is in milliseconds
  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
};

/**
 * Refresh token helper (bypasses apiCall to avoid infinite loop)
 */
async function refreshAccessToken() {
  const refreshToken = sessionStorage.getItem('refresh_token');
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to refresh token');
  }

  return data;
}

/**
 * Base API call function with automatic token refresh
 */
async function apiCall(endpoint, options = {}) {
  try {
    // Get access token from sessionStorage
    const accessToken = sessionStorage.getItem('access_token');
    
    // Check if token is expired BEFORE making the request
    if (accessToken && isTokenExpired(accessToken) && endpoint !== '/auth/refresh-token' && endpoint !== '/auth/login' && endpoint !== '/auth/register') {
      console.log('Access token expired, refreshing...');
      try {
        // Try to refresh the token
        const refreshResponse = await refreshAccessToken();
        
        // Save new tokens
        sessionStorage.setItem('access_token', refreshResponse.data.access_token);
        sessionStorage.setItem('refresh_token', refreshResponse.data.refresh_token);
      } catch (refreshError) {
        // If refresh failed, clear tokens and redirect to login
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('refresh_token');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('dashboardType');
        window.location.href = '/login';
        throw new Error('Session expired. Please login again.');
      }
    }
    
    // Get the current (potentially refreshed) access token
    const currentAccessToken = sessionStorage.getItem('access_token');
    
    // Add Authorization header if token exists
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
    
    if (currentAccessToken) {
      headers['Authorization'] = `Bearer ${currentAccessToken}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers,
      ...options,
    });

    const data = await response.json();

    // If still 401 after refresh, try once more with the new token
    if (response.status === 401 && currentAccessToken && endpoint !== '/auth/refresh-token' && endpoint !== '/auth/login' && endpoint !== '/auth/register') {
      console.log('Received 401, attempting refresh...');
      try {
        // Try to refresh the token again
        const refreshResponse = await refreshAccessToken();
        
        // Save new tokens
        sessionStorage.setItem('access_token', refreshResponse.data.access_token);
        sessionStorage.setItem('refresh_token', refreshResponse.data.refresh_token);
        
        // Retry the original request with new token
        headers['Authorization'] = `Bearer ${refreshResponse.data.access_token}`;
        const retryResponse = await fetch(`${API_BASE_URL}${endpoint}`, {
          headers,
          ...options,
        });
        
        const retryData = await retryResponse.json();
        
        if (!retryResponse.ok) {
          throw new Error(retryData.message || 'Something went wrong');
        }
        
        return retryData;
      } catch (refreshError) {
        // If refresh failed, clear tokens and redirect to login
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('refresh_token');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('dashboardType');
        window.location.href = '/login';
        throw new Error('Session expired. Please login again.');
      }
    }

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    throw error;
  }
}

/**
 * Authentication API calls
 */
export const authAPI = {
  // Register
  register: async (userData) => {
    return apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Login
  login: async (credentials) => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Get current user
  getCurrentUser: async () => {
    // Token is automatically added by apiCall from sessionStorage
    return apiCall('/auth/me', {
      method: 'GET',
    });
  },

  // Logout
  logout: async () => {
    // Token is automatically added by apiCall from sessionStorage
    return apiCall('/auth/logout', {
      method: 'POST',
    });
  },

  // Forgot password
  forgotPassword: async (email) => {
    return apiCall('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  // Verify reset token
  verifyResetToken: async (token) => {
    return apiCall(`/auth/verify-reset-token?token=${token}`, {
      method: 'GET',
    });
  },

  // Reset password
  resetPassword: async (data) => {
    return apiCall('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Refresh token
  refreshToken: async (refreshToken) => {
    return apiCall('/auth/refresh-token', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
  },
};

export default {
  authAPI,
  decodeJWT,
  isTokenExpired,
};

