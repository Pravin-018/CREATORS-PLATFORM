export const AUTH_TOKEN_KEY = 'token';
export const AUTH_USER_KEY = 'user';

export const saveAuth = (token, user) => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
};

export const clearAuth = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
};

export const getToken = () => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

export const getUser = () => {
  const raw = localStorage.getItem(AUTH_USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
};

export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;
  return !isTokenExpired(token);
};

export const decodeJwt = (token) => {
  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decodeURIComponent(escape(decoded)));
  } catch (error) {
    return null;
  }
};

export const isTokenExpired = (token) => {
  const data = decodeJwt(token);
  if (!data || !data.exp) return true;
  return Date.now() >= data.exp * 1000;
};
