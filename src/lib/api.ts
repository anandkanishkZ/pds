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
  avatarFilename?: string | null;
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

// User management types
export type AdminUser = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'user' | 'moderator';
  status: 'active' | 'inactive' | 'pending' | 'blocked';
  createdAt: string;
  lastLogin?: string;
  avatar?: string | null;
  adminNotes?: string | null;
  blockedAt?: string | null;
  blockedUntil?: string | null;
  remainingBlockSeconds?: number | null;
};

export async function listUsers(token: string, params: { page?: number; pageSize?: number; search?: string; role?: string; status?: string } = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k,v]) => { if (v !== undefined && v !== '') qs.append(k, String(v)); });
  const res = await fetch(`${API_BASE}/api/users?${qs.toString()}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Failed to fetch users');
  }
  const data = await res.json();
  data.data = data.data.map((u: any) => ({
    ...u,
    avatar: u.avatar && u.avatar.startsWith('/') ? API_BASE.replace(/\/$/, '') + u.avatar : u.avatar
  }));
  return data as { data: AdminUser[]; pagination: { page: number; pageSize: number; total: number; pages: number } };
}

export async function createUser(token: string, user: { name: string; email: string; password: string; role?: string; status?: string; adminNotes?: string }) {
  const res = await fetch(`${API_BASE}/api/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(user)
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Failed to create user');
  }
  return res.json();
}

export async function updateUser(token: string, id: string, patch: { role?: string; status?: string; adminNotes?: string; blockedUntil?: string | null }) {
  const res = await fetch(`${API_BASE}/api/users/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(patch)
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Failed to update user');
  }
  return res.json();
}

export async function deleteUser(token: string, id: string) {
  const res = await fetch(`${API_BASE}/api/users/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Failed to delete user');
  }
  return res.json();
}

export async function getUserDetail(token: string, id: string): Promise<{ user: AdminUser }> {
  const res = await fetch(`${API_BASE}/api/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Failed to fetch user');
  }
  const data = await res.json();
  if (data?.user?.avatar && data.user.avatar.startsWith('/')) {
    data.user.avatar = API_BASE.replace(/\/$/, '') + data.user.avatar;
  }
  return data;
}

export type UserBlockAudit = {
  id: string;
  action: 'block' | 'unblock' | 'extend';
  reason?: string | null;
  previousBlockedUntil?: string | null;
  newBlockedUntil?: string | null;
  actingUserId: string;
  actor?: { id: string; name: string; email: string; role: string } | null;
  createdAt: string;
};

export async function getUserBlockAudits(token: string, id: string): Promise<{ audits: UserBlockAudit[] }> {
  const res = await fetch(`${API_BASE}/api/users/${id}/block-audits`, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) {
    const data = await res.json().catch(()=>({}));
    throw new Error(data.message || 'Failed to load audit trail');
  }
  return res.json();
}

export async function blockUser(token: string, id: string, note?: string, blockedUntil?: Date | string | null) {
  let until: string | null | undefined = undefined;
  if (blockedUntil instanceof Date) until = blockedUntil.toISOString();
  else if (typeof blockedUntil === 'string') until = blockedUntil;
  return updateUser(token, id, { status: 'blocked', ...(note ? { adminNotes: note } : {}), ...(until ? { blockedUntil: until } : {}) });
}

export async function unblockUser(token: string, id: string, note?: string) {
  return updateUser(token, id, { status: 'active', ...(note ? { adminNotes: note } : {}) });
}

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
  const data = await res.json();
  if (data?.profile?.avatar && data.profile.avatar.startsWith('/')) {
    data.profile.avatar = API_BASE.replace(/\/$/, '') + data.profile.avatar;
  }
  return data;
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

export async function uploadAvatar(token: string, file: File): Promise<{ avatar: string }> {
  const form = new FormData();
  form.append('avatar', file);
  const res = await fetch(`${API_BASE}/api/settings/avatar/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: form
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Failed to upload avatar');
  }
  const data = await res.json();
  if (data?.avatar && data.avatar.startsWith('/')) {
    data.avatar = API_BASE.replace(/\/$/, '') + data.avatar;
  }
  return data;
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
  getCurrentUser(): { id: string; role: 'admin' | 'user' } | null {
    try {
      const raw = localStorage.getItem('pds_current_user');
      if (!raw) return null;
      return JSON.parse(raw);
    } catch { return null; }
  },
  setCurrentUser(user: { id: string; role: 'admin' | 'user'; name?: string; email?: string }) {
    try { localStorage.setItem('pds_current_user', JSON.stringify(user)); } catch {}
  },
  clear() {
    localStorage.removeItem('pds_token');
    localStorage.removeItem('pds_current_user');
  }
};
