// Simple API client for the backend
export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

export type LoginResponse = {
  token: string;
  user: { id: string; name: string; email: string; role: 'admin' | 'user' };
};

export async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Login failed');
  }
  return res.json();
}

export async function getDashboard(token: string) {
  const res = await fetch(`${API_BASE}/api/dashboard`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Failed to load dashboard');
  }
  return res.json();
}

export const auth = {
  getToken(): string | null {
    return localStorage.getItem('pds_token');
  },
  setToken(token: string) {
    localStorage.setItem('pds_token', token);
  },
  clear() {
    localStorage.removeItem('pds_token');
  }
};
