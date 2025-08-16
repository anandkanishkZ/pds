import { useEffect, useState } from 'react';
import { Search, Plus, Edit, Trash2, UserCheck, UserX, Mail, Phone, Calendar, Filter, RefreshCw, X, Loader2, Ban, Info } from 'lucide-react';
import { auth, listUsers, createUser, updateUser, deleteUser, type AdminUser } from '../../lib/api';
import { blockUser, unblockUser, getUserDetail } from '../../lib/api';
import { toast } from 'react-toastify';

type User = AdminUser & { role: 'admin' | 'user' | 'moderator' };

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'moderator' | 'user'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'pending' | 'blocked'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'user', status: 'active' });
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailUser, setDetailUser] = useState<any>(null);
  const [notesEditing, setNotesEditing] = useState('');
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [blockTarget, setBlockTarget] = useState<User | null>(null);
  const [blockNote, setBlockNote] = useState('');

  const loadUsers = async () => {
    try {
      setFetching(true);
      const token = auth.getToken();
      if (!token) throw new Error('Not authenticated');
      const data = await listUsers(token, {
        search: searchTerm || undefined,
        role: roleFilter !== 'all' ? roleFilter : undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined,
      });
      // Cast for moderator support (not in backend role enum, keep for UI continuity)
      setUsers(data.data as User[]);
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : 'Failed to load users');
    } finally {
      setFetching(false);
      setLoading(false);
    }
  };

  useEffect(() => { loadUsers(); /* eslint-disable-next-line */ }, [roleFilter, statusFilter]);

  const onSearch = () => loadUsers();

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleEditUser = (_user: User) => {
    toast.info('Edit user modal not yet implemented');
  };

  const handleAddUser = () => {
    setShowCreateModal(true);
  };

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    try {
      const token = auth.getToken();
      if (!token) throw new Error('Not authenticated');
      await deleteUser(token, userToDelete.id);
      toast.success('User deleted');
      setUsers(u => u.filter(x => x.id !== userToDelete.id));
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setUserToDelete(null);
      setShowDeleteModal(false);
    }
  };

  const handleStatusChange = async (userId: string, newStatus: User['status']) => {
    try {
      const token = auth.getToken();
      if (!token) throw new Error('Not authenticated');
      await updateUser(token, userId, { status: newStatus });
      setUsers(users.map(user => user.id === userId ? { ...user, status: newStatus } : user));
      toast.success('Status updated');
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : 'Update failed');
    }
  };

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'active': return 'text-emerald-700 bg-emerald-50 ring-emerald-600/20';
      case 'inactive': return 'text-slate-700 bg-slate-50 ring-slate-600/20';
      case 'pending': return 'text-amber-700 bg-amber-50 ring-amber-600/20';
  case 'blocked': return 'text-red-700 bg-red-50 ring-red-600/20';
      default: return 'text-slate-700 bg-slate-50 ring-slate-600/20';
    }
  };

  const getRoleColor = (role: User['role']) => {
    if (role === 'admin') return 'text-purple-700 bg-purple-50 ring-purple-600/20';
    if (role === 'moderator') return 'text-blue-700 bg-blue-50 ring-blue-600/20';
    return 'text-slate-700 bg-slate-50 ring-slate-600/20';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
                      {user.status !== 'blocked' && (
                        <button
                          onClick={() => { setBlockTarget(user); setShowBlockModal(true); }}
                          className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition"
                          title="Block user"
                        >
                          <Ban className="h-4 w-4" />
                        </button>
                      )}
                      {user.status === 'blocked' && (
                        <button
                          onClick={async () => { try { const token = auth.getToken(); if (!token) throw new Error('Not authenticated'); await unblockUser(token, user.id); setUsers(us => us.map(u => u.id === user.id ? { ...u, status: 'active', blockedAt: null } : u)); toast.success('User unblocked'); } catch (e:any){ toast.error(e.message); } }}
                          className="p-1 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded transition"
                          title="Unblock user"
                        >
                          <UserCheck className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={async () => { try { const token = auth.getToken(); if (!token) throw new Error('Not authenticated'); const detail = await getUserDetail(token, user.id); setDetailUser(detail.user); setNotesEditing(detail.user.adminNotes || ''); setShowDetailModal(true);} catch(e:any){ toast.error(e.message);} }}
                        className="p-1 text-slate-600 hover:text-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded transition"
                        title="View details"
                      >
                        <Info className="h-4 w-4" />
                      </button>
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-slate-200 dark:bg-slate-800 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Users</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">Manage user accounts and permissions</p>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') onSearch(); }}
              className="pl-9 pr-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={() => { setSearchTerm(''); onSearch(); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border transition ${
              showFilters 
                ? 'border-brand-300 bg-brand-50 text-brand-700 dark:border-brand-700 dark:bg-brand-900/20 dark:text-brand-300'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onSearch}
            className="inline-flex items-center gap-2 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm"
          >
            {fetching ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            Refresh
          </button>
          <button
            onClick={handleAddUser}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 transition"
          >
            <Plus className="h-4 w-4" />
            Add User
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="flex flex-wrap gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Role</label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as any)}
              className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
              <option value="user">User</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="text-sm text-slate-600 dark:text-slate-400">
        Showing {filteredUsers.length} of {users.length} users
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full object-cover ring-2 ring-white dark:ring-slate-800" />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-brand-100 dark:bg-brand-900 flex items-center justify-center">
                            <span className="text-sm font-medium text-brand-700 dark:text-brand-300">
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-900 dark:text-white">
                          {user.name}
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {user.email}
                        </div>
                        {user.phone && (
                          <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {user.phone}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(user.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                    {user.lastLogin ? formatDate(user.lastLogin) : 'Never'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      {user.status === 'pending' && (
                        <button
                          onClick={() => handleStatusChange(user.id, 'active')}
                          className="p-1 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded transition"
                          title="Approve user"
                        >
                          <UserCheck className="h-4 w-4" />
                        </button>
                      )}
                      {user.status === 'active' && (
                        <button
                          onClick={() => handleStatusChange(user.id, 'inactive')}
                          className="p-1 text-slate-600 hover:text-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded transition"
                          title="Deactivate user"
                        >
                          <UserX className="h-4 w-4" />
                        </button>
                      )}
                      {user.status !== 'blocked' && (
                        <button
                          onClick={() => { setBlockTarget(user); setShowBlockModal(true); }}
                          className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition"
                          title="Block user"
                        >
                          <Ban className="h-4 w-4" />
                        </button>
                      )}
                      {user.status === 'blocked' && (
                        <button
                          onClick={async () => { try { const token = auth.getToken(); if (!token) throw new Error('Not authenticated'); await unblockUser(token, user.id); setUsers(us => us.map(u => u.id === user.id ? { ...u, status: 'active', blockedAt: null } : u)); toast.success('User unblocked'); } catch (e:any){ toast.error(e.message); } }}
                          className="p-1 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded transition"
                          title="Unblock user"
                        >
                          <UserCheck className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={async () => { try { const token = auth.getToken(); if (!token) throw new Error('Not authenticated'); const detail = await getUserDetail(token, user.id); setDetailUser(detail.user); setNotesEditing(detail.user.adminNotes || ''); setShowDetailModal(true);} catch(e:any){ toast.error(e.message);} }}
                        className="p-1 text-slate-600 hover:text-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded transition"
                        title="View details"
                      >
                        <Info className="h-4 w-4" />
                      </button>
                      {user.status === 'inactive' && (
                        <button
                          onClick={() => handleStatusChange(user.id, 'active')}
                          className="p-1 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded transition"
                          title="Activate user"
                        >
                          <UserCheck className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleEditUser(user)}
                        className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition"
                        title="Edit user"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user)}
                        className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition"
                        title="Delete user"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="px-6 py-12 text-center">
            <div className="text-slate-400 dark:text-slate-500 mb-2">
              <Search className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No users found</h3>
              <p className="text-sm">Try adjusting your search or filter criteria.</p>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && userToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 max-w-md mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Delete User</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Are you sure you want to delete <strong>{userToDelete.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 max-w-lg w-full mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Add New User</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Name</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Password</label>
                  <input
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Status</label>
                <select
                  value={newUser.status}
                  onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                  <option value="blocked">Blocked</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                disabled={creating}
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    setCreating(true);
                    const token = auth.getToken();
                    if (!token) throw new Error('Not authenticated');
                    await createUser(token, newUser);
                    toast.success('User created');
                    setShowCreateModal(false);
                    setNewUser({ name: '', email: '', password: '', role: 'user', status: 'active' });
                    loadUsers();
                  } catch (err) {
                    console.error(err);
                    toast.error(err instanceof Error ? err.message : 'Create failed');
                  } finally {
                    setCreating(false);
                  }
                }}
                disabled={creating || !newUser.name || !newUser.email || !newUser.password}
                className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition disabled:opacity-50 flex items-center gap-2"
              >
                {creating && <Loader2 className="h-4 w-4 animate-spin" />}
                Create User
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Block User Modal */}
      {showBlockModal && blockTarget && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl max-w-md w-full mx-4 space-y-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Block User</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Provide an optional note explaining why <strong>{blockTarget.name}</strong> is being blocked.</p>
            <textarea value={blockNote} onChange={e=>setBlockNote(e.target.value)} rows={4} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm" placeholder="Reason / note (optional)" />
            <div className="flex justify-end gap-3">
              <button onClick={()=>{setShowBlockModal(false); setBlockNote('');}} className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg">Cancel</button>
              <button onClick={async ()=>{ try { const token=auth.getToken(); if(!token) throw new Error('Not authenticated'); await blockUser(token, blockTarget.id, blockNote); setUsers(us=>us.map(u=>u.id===blockTarget.id?{...u,status:'blocked',blockedAt:new Date().toISOString(),adminNotes:blockNote || u.adminNotes}:u)); toast.success('User blocked'); } catch(e:any){ toast.error(e.message);} finally { setShowBlockModal(false); setBlockNote(''); setBlockTarget(null);} }} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Block User</button>
            </div>
          </div>
        </div>
      )}
      {/* Detail Modal */}
      {showDetailModal && detailUser && (
        <div className="fixed inset-0 bg-black/50 flex items-start md:items-center justify-center overflow-y-auto z-50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 w-full max-w-2xl shadow-xl space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">User Detail {detailUser.status === 'blocked' && <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700">Blocked</span>}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Created {new Date(detailUser.createdAt).toLocaleString()}</p>
              </div>
              <button onClick={()=>setShowDetailModal(false)} className="text-slate-500 hover:text-slate-700"><X className="h-5 w-5"/></button>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3 space-y-4">
                <div className="flex flex-col items-center text-center">
                  {detailUser.avatar ? <img src={detailUser.avatar} className="h-24 w-24 rounded-full object-cover ring-2 ring-white dark:ring-slate-800"/> : <div className="h-24 w-24 rounded-full bg-brand-100 dark:bg-brand-900 flex items-center justify-center text-2xl font-semibold text-brand-700 dark:text-brand-300">{detailUser.name.charAt(0)}</div>}
                  <div className="mt-3">
                    <div className="font-medium text-slate-900 dark:text-white">{detailUser.name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{detailUser.email}</div>
                  </div>
                </div>
                <div className="text-xs space-y-1 text-slate-600 dark:text-slate-400">
                  <div><strong>Role:</strong> {detailUser.role}</div>
                  <div><strong>Status:</strong> {detailUser.status}</div>
                  {detailUser.lastLoginAt && <div><strong>Last Login:</strong> {new Date(detailUser.lastLoginAt).toLocaleString()}</div>}
                  {detailUser.blockedAt && <div><strong>Blocked At:</strong> {new Date(detailUser.blockedAt).toLocaleString()}</div>}
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Admin Notes</label>
                  <textarea value={notesEditing} onChange={e=>setNotesEditing(e.target.value)} rows={6} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm" placeholder="Add internal notes / reasons, audit info, etc." />
                  <div className="flex justify-end mt-2">
                    <button onClick={async ()=>{ try{ const token=auth.getToken(); if(!token) throw new Error('Not authenticated'); await updateUser(token, detailUser.id, { adminNotes: notesEditing }); setUsers(us=>us.map(u=>u.id===detailUser.id?{...u, adminNotes: notesEditing}:u)); toast.success('Notes saved'); } catch(e:any){ toast.error(e.message);} }} className="px-3 py-1.5 text-sm bg-brand-600 text-white rounded-lg hover:bg-brand-700">Save Notes</button>
                  </div>
                </div>
                <div className="flex gap-3 flex-wrap">
                  {detailUser.status !== 'blocked' ? (
                    <button onClick={()=>{ setBlockTarget(detailUser); setShowBlockModal(true); }} className="px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 inline-flex items-center gap-1"><Ban className="h-4 w-4"/> Block</button>
                  ) : (
                    <button onClick={async ()=>{ try{ const token=auth.getToken(); if(!token) throw new Error('Not authenticated'); await unblockUser(token, detailUser.id); setDetailUser({...detailUser,status:'active',blockedAt:null}); setUsers(us=>us.map(u=>u.id===detailUser.id?{...u,status:'active',blockedAt:null}:u)); toast.success('User unblocked'); } catch(e:any){ toast.error(e.message);} }} className="px-3 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 inline-flex items-center gap-1"><UserCheck className="h-4 w-4"/> Unblock</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
