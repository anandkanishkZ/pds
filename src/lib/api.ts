// Simple API client for the backend
export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

export type LoginResponse = {
  token: string;
  user: { id: string; name: string; email: string; role: 'admin' | 'user' };
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  avatar?: string;
  department?: string;
  location?: string;
  bio?: string;
  joinDate: string;
  lastLoginAt?: string;
  theme: 'light' | 'dark' | 'system';
  timezone?: string;
  language: string;
};

export type NotificationSettings = {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
  securityAlerts: boolean;
  systemUpdates: boolean;
  weeklyReports: boolean;
  instantAlerts: boolean;
};

export type SecuritySettings = {
  twoFactorAuth: boolean;
  loginAlerts: boolean;
  sessionTimeout: number;
  passwordExpiry: number;
};

export type Activity = {
  id: string;
  action: string;
  description: string;
  timestamp: string;
  ip: string;
  device: string;
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

// Settings API functions
export async function getProfile(token: string): Promise<{
  profile: UserProfile;
  notifications: NotificationSettings;
  security: SecuritySettings;
}> {
  const res = await fetch(`${API_BASE}/api/settings/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Failed to load profile');
  }
  return res.json();
}

export async function updateProfile(token: string, profileData: Partial<UserProfile>): Promise<{ profile: UserProfile }> {
  const res = await fetch(`${API_BASE}/api/settings/profile`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}` 
    },
    body: JSON.stringify(profileData)
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Failed to update profile');
  }
  return res.json();
}

export async function updateAvatar(token: string, avatar: string): Promise<{ avatar: string }> {
  const res = await fetch(`${API_BASE}/api/settings/avatar`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}` 
    },
    body: JSON.stringify({ avatar })
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Failed to update avatar');
  }
  return res.json();
}

export async function updateNotifications(token: string, notifications: Partial<NotificationSettings>): Promise<{ notifications: NotificationSettings }> {
  const res = await fetch(`${API_BASE}/api/settings/notifications`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}` 
    },
    body: JSON.stringify(notifications)
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Failed to update notifications');
  }
  return res.json();
}

export async function updateSecurity(token: string, security: Partial<SecuritySettings>): Promise<{ security: SecuritySettings }> {
  const res = await fetch(`${API_BASE}/api/settings/security`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}` 
    },
    body: JSON.stringify(security)
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Failed to update security settings');
  }
  return res.json();
}

export async function updateTheme(token: string, theme: 'light' | 'dark' | 'system'): Promise<{ theme: string }> {
  const res = await fetch(`${API_BASE}/api/settings/theme`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}` 
    },
    body: JSON.stringify({ theme })
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Failed to update theme');
  }
  return res.json();
}

export async function changePassword(token: string, currentPassword: string, newPassword: string, confirmPassword: string): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/api/settings/password`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}` 
    },
    body: JSON.stringify({ currentPassword, newPassword, confirmPassword })
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Failed to change password');
  }
  return res.json();
}

export async function getActivity(token: string): Promise<{ activities: Activity[] }> {
  const res = await fetch(`${API_BASE}/api/settings/activity`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Failed to load activity');
  }
  return res.json();
}

export async function exportUserData(token: string): Promise<Blob> {
  const res = await fetch(`${API_BASE}/api/settings/export`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Failed to export data');
  }
  return res.blob();
}

export async function deleteAccount(token: string, password: string): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/api/settings/account`, {
    method: 'DELETE',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}` 
    },
    body: JSON.stringify({ password, confirmation: 'DELETE' })
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Failed to delete account');
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
