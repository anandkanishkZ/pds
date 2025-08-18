import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Search, 
  Filter, 
  Eye, 
  Trash2, 
  Clock, 
  User, 
  AlertCircle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Calendar,
  Phone,
  Building2,
  MessageSquare,
  Flag,
  Globe,
  Layers,
  ShieldAlert,
  MonitorSmartphone,
  X,
  ExternalLink
} from 'lucide-react';
import { listInquiries, updateInquiry, deleteInquiry, getInquiryStats, auth, type Inquiry, type InquiryStats } from '../../lib/api';
import { toast } from 'react-toastify';

// Skeleton Components
const SkeletonCard: React.FC = () => (
  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 animate-pulse">
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-slate-200 dark:bg-slate-700 w-9 h-9"></div>
      <div>
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-12 mb-2"></div>
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-8"></div>
      </div>
    </div>
  </div>
);

const SkeletonTableRow: React.FC = () => (
  <tr className="animate-pulse">
    <td className="px-6 py-4 whitespace-nowrap">
      <div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-32 mb-1"></div>
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-24"></div>
      </div>
    </td>
    <td className="px-6 py-4">
      <div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-40 mb-1"></div>
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-56"></div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full w-20"></div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full w-16"></div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-28"></div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 bg-slate-200 dark:bg-slate-700 rounded"></div>
        <div className="h-6 w-6 bg-slate-200 dark:bg-slate-700 rounded"></div>
      </div>
    </td>
  </tr>
);

const LoadingSkeleton: React.FC = () => (
  <div className="space-y-6">
    {/* Header skeleton */}
    <div className="flex items-center justify-between">
      <div>
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-32 mb-2 animate-pulse"></div>
        <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-64 animate-pulse"></div>
      </div>
      <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded w-24 animate-pulse"></div>
    </div>

    {/* Statistics Cards skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>

    {/* Search and filters skeleton */}
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse"></div>
      </div>
      <div className="flex gap-4">
        <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded-lg w-32 animate-pulse"></div>
        <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded-lg w-32 animate-pulse"></div>
        <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded-lg w-24 animate-pulse"></div>
      </div>
    </div>

    {/* Table skeleton */}
    <div className="bg-white dark:bg-slate-800 shadow-sm rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
          <thead className="bg-slate-50 dark:bg-slate-900/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Subject & Message</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Created</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonTableRow key={i} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// Shared helper utilities (placed before modal so they're in scope)
const getStatusIcon = (status: string) => {
  switch (status) {
    case 'new': return <AlertCircle className="h-4 w-4 text-blue-500" />;
    case 'in_progress': return <Clock className="h-4 w-4 text-yellow-500" />;
    case 'resolved': return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'closed': return <XCircle className="h-4 w-4 text-gray-500" />;
    default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'new': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    case 'in_progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    case 'closed': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
    case 'medium': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    case 'low': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Enhanced Modal Component using Portal
interface InquiryDetailModalProps {
  inquiry: Inquiry;
  onClose: () => void;
  onStatusChange: (inquiry: Inquiry, status: string) => void;
  onDelete: (inquiry: Inquiry) => void;
  updating: string | null;
}

const InquiryDetailModal: React.FC<InquiryDetailModalProps> = ({ 
  inquiry, 
  onClose, 
  onStatusChange, 
  onDelete, 
  updating 
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  // Portal content
  const modalContent = (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-[100]" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
        <motion.div 
          className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" 
          onClick={onClose}
          initial={{opacity:0}} 
          animate={{opacity:1}} 
          exit={{opacity:0}}
        />
        <motion.div 
          className="relative w-full max-w-5xl mx-auto h-[90vh] mt-8 flex items-stretch px-4" 
          initial={{opacity:0, y:30, scale:.96}} 
          animate={{opacity:1, y:0, scale:1}} 
          exit={{opacity:0, y:20, scale:.95}} 
          transition={{type:'spring', stiffness:220, damping:24}}
        >
          <div className="flex-1 flex flex-col rounded-2xl bg-white dark:bg-slate-900 shadow-xl ring-1 ring-slate-900/10 dark:ring-slate-50/10 overflow-hidden border border-slate-200 dark:border-slate-700">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-brand-600/95 dark:bg-brand-700/90 text-white">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5" />
                <div className="leading-tight">
                  <h2 className="text-sm font-semibold tracking-wide uppercase">Inquiry</h2>
                  <p className="text-xs text-white/80">{inquiry.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-md border border-white/30 text-[11px] font-medium">
                  {getStatusIcon(inquiry.status)} {inquiry.status.replace('_',' ')}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-md border border-white/30 text-[11px] font-medium">
                  <Flag className="h-3 w-3" /> {inquiry.priority}
                </span>
                <button onClick={onClose} className="p-2 rounded-md hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/50">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Left main */}
                <div className="lg:col-span-2 space-y-6">
                  <section className="rounded-xl border border-slate-200 dark:border-slate-700 p-5 bg-slate-50/60 dark:bg-slate-800/40">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2"><User className="h-4 w-4" /> Contact</h3>
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1">
                        <p className="font-medium text-slate-900 dark:text-slate-100">{inquiry.name}</p>
                        <a href={`mailto:${inquiry.email}`} className="text-brand-600 dark:text-brand-400 hover:underline break-all inline-flex items-center gap-1"><Mail className="h-4 w-4" /> {inquiry.email}</a>
                        {inquiry.phone && <a href={`tel:${inquiry.phone}`} className="text-slate-600 dark:text-slate-300 hover:text-brand-600 inline-flex items-center gap-1"><Phone className="h-4 w-4" /> {inquiry.phone}</a>}
                        {inquiry.company && <div className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-md bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300"><Building2 className="h-3 w-3" /> {inquiry.company}</div>}
                      </div>
                      <div className="space-y-2">
                        {inquiry.ipAddress && <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300"><Globe className="h-4 w-4" /> <code className="font-mono text-xs">{inquiry.ipAddress}</code></div>}
                        {inquiry.userAgent && <div className="text-[10px] leading-snug text-slate-500 dark:text-slate-400 max-h-20 overflow-y-auto pr-1 border-l border-slate-200 dark:border-slate-700 pl-2">{inquiry.userAgent}</div>}
                        <div className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1"><Calendar className="h-3 w-3" /> {formatDate(inquiry.createdAt)}</div>
                      </div>
                    </div>
                  </section>
                  <section className="rounded-xl border border-slate-200 dark:border-slate-700 p-5 bg-white dark:bg-slate-800">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 flex items-center gap-2"><MessageSquare className="h-4 w-4" /> Message</h3>
                      {inquiry.subject && <span className="text-[11px] px-2 py-0.5 rounded border border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 inline-flex items-center gap-1"><Layers className="h-3 w-3" /> {inquiry.subject}</span>}
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">{inquiry.message}</p>
                  </section>
                </div>
                {/* Right sidebar */}
                <div className="space-y-6">
                  <section className="rounded-xl border border-slate-200 dark:border-slate-700 p-5 bg-white dark:bg-slate-800 space-y-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Status & Priority</h3>
                    <div className="flex flex-col gap-3 text-xs">
                      <div className="flex items-center justify-between"><span className="text-slate-500">Status</span><span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md border text-[11px] ${getStatusColor(inquiry.status)}`}>{getStatusIcon(inquiry.status)} {inquiry.status.replace('_',' ')}</span></div>
                      <div className="flex items-center justify-between"><span className="text-slate-500">Priority</span><span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md border text-[11px] ${getPriorityColor(inquiry.priority)}`}><Flag className="h-3 w-3" /> {inquiry.priority}</span></div>
                    </div>
                  </section>
                  <section className="rounded-xl border border-slate-200 dark:border-slate-700 p-5 bg-white dark:bg-slate-800 space-y-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 flex items-center gap-2"><ShieldAlert className="h-4 w-4" /> Signals</h3>
                    {renderFlags(inquiry)}
                  </section>
                  <section className="rounded-xl border border-slate-200 dark:border-slate-700 p-5 bg-slate-50/70 dark:bg-slate-800/40 space-y-3">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Actions</h3>
                    <div className="flex flex-col gap-2">
                      {inquiry.status !== 'in_progress' && inquiry.status !== 'resolved' && (
                        <button onClick={() => onStatusChange(inquiry, 'in_progress')} disabled={updating === inquiry.id} className="h-9 rounded-md bg-amber-500/90 hover:bg-amber-500 text-white text-xs font-medium disabled:opacity-50 transition-colors">Mark In Progress</button>
                      )}
                      {inquiry.status !== 'resolved' && (
                        <button onClick={() => onStatusChange(inquiry, 'resolved')} disabled={updating === inquiry.id} className="h-9 rounded-md bg-green-600/90 hover:bg-green-600 text-white text-xs font-medium disabled:opacity-50 transition-colors">Resolve</button>
                      )}
                      {inquiry.status !== 'closed' && (
                        <button onClick={() => onStatusChange(inquiry, 'closed')} disabled={updating === inquiry.id} className="h-9 rounded-md bg-slate-600/90 hover:bg-slate-600 text-white text-xs font-medium disabled:opacity-50 transition-colors">Close</button>
                      )}
                      <button onClick={() => onDelete(inquiry)} className="h-9 rounded-md bg-red-600/90 hover:bg-red-600 text-white text-xs font-medium transition-colors">Delete</button>
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> Logged immediately</p>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  // Render to portal at document.body level to escape layout constraints
  return createPortal(modalContent, document.body);
};

const Inquiries = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [stats, setStats] = useState<InquiryStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  // Filters and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [assignedFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchInquiries = async () => {
    const token = auth.getToken();
    console.log('Token from auth.getToken():', token);
    if (!token) {
      setError('No authentication token found. Please log in again.');
      return;
    }
    
    try {
      setLoading(true);
      const [inquiriesResult, statsResult] = await Promise.all([
        listInquiries(token, {
          page: currentPage,
          pageSize,
          search: searchTerm,
          status: statusFilter,
          priority: priorityFilter,
          assignedTo: assignedFilter,
          sortBy: 'created_at',
          sortOrder: 'desc'
        }),
        getInquiryStats(token)
      ]);

      setInquiries(inquiriesResult.data);
      setTotalPages(inquiriesResult.pagination.pages);
      setTotalCount(inquiriesResult.pagination.total);
      setStats(statsResult);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch inquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [currentPage, searchTerm, statusFilter, priorityFilter, assignedFilter]);

  const handleStatusChange = async (inquiry: Inquiry, newStatus: string) => {
    const token = auth.getToken();
    if (!token) return;
    
    try {
      setUpdating(inquiry.id);
      const result = await updateInquiry(token, inquiry.id, { status: newStatus });
      
      // Update the inquiry in the list
      setInquiries(prev => prev.map(inq => 
        inq.id === inquiry.id ? result.inquiry : inq
      ));
      
  // Refresh stats
      const newStats = await getInquiryStats(token);
      setStats(newStats);
  toast.success(`Status updated to ${newStatus.replace('_',' ')}`);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update inquiry');
  toast.error('Failed to update status');
    } finally {
      setUpdating(null);
    }
  };

  const handleDelete = async (inquiry: Inquiry) => {
    const token = auth.getToken();
    if (!token || !confirm(`Are you sure you want to delete this inquiry from ${inquiry.name}?`)) return;
    
    try {
      setDeleting(inquiry.id);
      await deleteInquiry(token, inquiry.id);
      
      // Remove from list
      setInquiries(prev => prev.filter(inq => inq.id !== inquiry.id));
      
      // Refresh stats
      const newStats = await getInquiryStats(token);
      setStats(newStats);
  toast.success('Inquiry deleted');
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete inquiry');
  toast.error('Delete failed');
    } finally {
      setDeleting(null);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchInquiries();
  };

  // Show skeleton loading on initial load
  if (loading && inquiries.length === 0) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Inquiries</h1>
          <p className="text-slate-600 dark:text-slate-400">Manage customer contact form submissions</p>
        </div>
        <button
          onClick={fetchInquiries}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium shadow-sm disabled:opacity-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      {/* Statistics Cards */}
      {loading && !stats ? (
        // Show skeleton stats while loading
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : stats && (
        // Show actual stats
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Unresolved</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stats.unresolved}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
                <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">In Progress</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stats.byStatus.in_progress}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Resolved</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stats.byStatus.resolved}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search inquiries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            >
              <option value="">All Statuses</option>
              <option value="new">New</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            >
              <option value="">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              <Filter className="h-4 w-4" />
              Filter
            </button>
          </div>
        </form>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      {/* Inquiries Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {loading && inquiries.length === 0 ? (
                // Show skeleton rows while loading
                Array.from({ length: 5 }).map((_, i) => (
                  <SkeletonTableRow key={`skeleton-${i}`} />
                ))
              ) : (
                // Show actual data
                inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-slate-900 dark:text-slate-100">{inquiry.name}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">{inquiry.email}</div>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                        {inquiry.company && (
                          <div className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 inline-flex items-center gap-1">
                            <Building2 className="h-3 w-3" />{inquiry.company}
                          </div>
                        )}
                        {inquiry.ipAddress && (
                          <div className="text-[10px] px-1.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 inline-flex items-center gap-1" title="Origin IP">
                            <Globe className="h-3 w-3" />{inquiry.ipAddress}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-900 dark:text-slate-100 max-w-xs truncate">
                      {inquiry.subject || 'No subject'}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 max-w-xs truncate">
                      {inquiry.message}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative">
                      <select
                        value={inquiry.status}
                        onChange={(e) => handleStatusChange(inquiry, e.target.value)}
                        disabled={updating === inquiry.id}
                        className={`text-xs px-2 py-1 rounded-full border-0 cursor-pointer focus:ring-2 focus:ring-brand-500 ${getStatusColor(inquiry.status)}`}
                      >
                        <option value="new">New</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                      </select>
                      {updating === inquiry.id && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(inquiry.priority)}`}>
                      <Flag className="h-3 w-3" />
                      {inquiry.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(inquiry.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedInquiry(inquiry);
                          setShowDetail(true);
                        }}
                        className="text-brand-600 hover:text-brand-500 p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(inquiry)}
                        disabled={deleting === inquiry.id}
                        className="text-red-600 hover:text-red-500 p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 disabled:opacity-50"
                        title="Delete"
                      >
                        {deleting === inquiry.id ? (
                          <div className="w-4 h-4 border border-current border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
              )}
            </tbody>
          </table>
        </div>

        {inquiries.length === 0 && !loading && (
          <div className="text-center py-12">
            <Mail className="mx-auto h-12 w-12 text-slate-400" />
            <h3 className="mt-2 text-sm font-medium text-slate-900 dark:text-slate-100">No inquiries</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {searchTerm || statusFilter || priorityFilter ? 'No inquiries match your filters.' : 'No inquiries have been submitted yet.'}
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, totalCount)} of {totalCount} inquiries
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Detail Modal - Using Portal for proper positioning */}
      {showDetail && selectedInquiry && (
        <InquiryDetailModal 
          inquiry={selectedInquiry}
          onClose={() => setShowDetail(false)}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
          updating={updating}
        />
      )}
    </div>
  );
};

// Helpers for modal enhancements
function truncateUserAgent(ua: string, max = 140) {
  if (!ua) return '';
  return ua.length > max ? ua.slice(0, max - 1) + '…' : ua;
}

function renderFlags(inquiry: Inquiry) {
  const meta: any = inquiry.metadata || {};
  // Support stringified JSON as a fallback
  let parsed = meta;
  if (typeof meta === 'string') {
    try { parsed = JSON.parse(meta); } catch { parsed = {}; }
  }
  const flags: string[] = parsed.flags || [];
  if (!flags.length) {
    return <div className="text-xs text-slate-500 dark:text-slate-400">No risk signals detected.</div>;
  }
  const colorMap: Record<string,string> = {
    high_frequency: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    duplicate_content: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
  };
  return (
    <div className="flex flex-wrap gap-2">
      {flags.map(f => (
        <span key={f} className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium ${colorMap[f] || 'bg-slate-100 text-slate-600 dark:bg-slate-700/40 dark:text-slate-300'}`}>
          <ShieldAlert className="h-3 w-3" />{f.replace(/_/g,' ')}
        </span>
      ))}
    </div>
  );
}

export default Inquiries;
