import React, { useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { 
  Plus, 
  X,
  RefreshCw,
  Image as ImageIcon,
  Calendar
} from 'lucide-react';
import { 
  createGalleryItem, 
  listMedia,
  auth,
  type MediaLibraryItem,
  API_BASE 
} from '../../../lib/api';
import { toast } from 'react-toastify';

interface CreateGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormData {
  title: string;
  description: string;
  category: 'facility' | 'products' | 'events' | 'achievements';
  imageUrl: string;
  date: string;
  location: string;
  featured: boolean;
  status: 'active' | 'archived';
}

const CreateGalleryModal: React.FC<CreateGalleryModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const token = auth.getToken();
  
  // Form state
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: 'events',
    imageUrl: '',
    date: new Date().toISOString().split('T')[0],
    location: '',
    featured: false,
    status: 'active'
  });
  
  // Media library state
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [mediaItems, setMediaItems] = useState<MediaLibraryItem[]>([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [mediaSearch, setMediaSearch] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Load media library
  const loadMediaLibrary = useCallback(async () => {
    if (!token) return;
    
    try {
      setMediaLoading(true);
      const response = await listMedia(token, { pageSize: 100 });
      
      // Normalize URLs
      const base = API_BASE.replace(/\/$/, '');
      const items = response.data.map(item => ({
        ...item,
        url: item.url.startsWith('http') ? item.url : base + (item.url.startsWith('/') ? item.url : '/' + item.url)
      }));
      
      setMediaItems(items);
    } catch (error) {
      console.error('Failed to load media library:', error);
      toast.error('Failed to load media library');
    } finally {
      setMediaLoading(false);
    }
  }, [token]);

  // Reset form
  const resetForm = useCallback(() => {
    setFormData({
      title: '',
      description: '',
      category: 'events',
      imageUrl: '',
      date: new Date().toISOString().split('T')[0],
      location: '',
      featured: false,
      status: 'active'
    });
  }, []);

  // Handle create
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !formData.title || !formData.imageUrl) return;

    try {
      setSubmitting(true);
      await createGalleryItem(token, formData);
      toast.success('Gallery item created successfully');
      resetForm();
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(error.message || 'Failed to create gallery item');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle input change - stable callback to prevent re-renders
  const handleInputChange = useCallback((field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  // Select media
  const selectMedia = (item: MediaLibraryItem) => {
    setFormData(prev => ({ ...prev, imageUrl: item.url }));
    setShowMediaLibrary(false);
  };

  // Filter media items
  const filteredMediaItems = mediaItems.filter(item =>
    !mediaSearch || 
    (item.altText && item.altText.toLowerCase().includes(mediaSearch.toLowerCase())) ||
    item.filename.toLowerCase().includes(mediaSearch.toLowerCase())
  );

  if (!isOpen) return null;

  const modalContent = (
    <motion.div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="w-full max-w-4xl max-h-[95vh] overflow-hidden rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 20, scale: 0.95 }} 
        animate={{ opacity: 1, y: 0, scale: 1 }} 
        exit={{ opacity: 0, y: 20, scale: 0.95 }} 
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="flex flex-col h-full rounded-2xl bg-white dark:bg-slate-900 shadow-xl ring-1 ring-slate-900/10 dark:ring-slate-50/10 overflow-hidden border border-slate-200 dark:border-slate-700">
          {/* Header - Fixed */}
          <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 bg-gradient-to-r from-brand-600 to-brand-700 text-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <Plus className="h-5 w-5" />
              </div>
              <div className="leading-tight">
                <h2 className="text-sm font-semibold tracking-wide uppercase">Create Gallery Item</h2>
                <p className="text-xs text-white/90">Add a new item to showcase in your gallery</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-xs font-medium backdrop-blur-sm">
                <ImageIcon className="h-3 w-3" /> New Item
              </span>
              <button 
                onClick={onClose} 
                className="p-2 rounded-lg hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Body - Scrollable */}
          <form onSubmit={handleCreate} className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  <section className="rounded-xl border border-slate-200 dark:border-slate-700 p-5 bg-slate-50/60 dark:bg-slate-800/40">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2">
                      <ImageIcon className="h-4 w-4" /> Basic Information
                    </h3>
                    <div className="space-y-4">
                      {/* Title Input */}
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                          Title *
                        </label>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) => handleInputChange('title', e.target.value)}
                          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter gallery item title..."
                          required
                        />
                      </div>

                      {/* Description Input */}
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                          Description
                        </label>
                        <textarea
                          value={formData.description}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          rows={4}
                          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-200 resize-none"
                          placeholder="Describe this gallery item..."
                        />
                      </div>

                      {/* Category Select */}
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                          Category *
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) => handleInputChange('category', e.target.value)}
                          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-200"
                          required
                        >
                          <option value="facility">🏢 Facilities</option>
                          <option value="products">📦 Products</option>
                          <option value="events">🎉 Events</option>
                          <option value="achievements">🏆 Achievements</option>
                        </select>
                      </div>
                    </div>
                  </section>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <section className="rounded-xl border border-slate-200 dark:border-slate-700 p-5 bg-white dark:bg-slate-800">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2">
                      <Calendar className="h-4 w-4" /> Details & Settings
                    </h3>
                    <div className="space-y-4">
                      {/* Image URL */}
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                          Image *
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="url"
                            value={formData.imageUrl}
                            onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                            className="flex-1 px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-200"
                            placeholder="https://example.com/image.jpg"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => {
                              loadMediaLibrary();
                              setShowMediaLibrary(true);
                            }}
                            className="px-4 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl transition-colors duration-200 flex items-center gap-2"
                          >
                            <ImageIcon className="w-4 h-4" />
                            Browse
                          </button>
                        </div>
                        {formData.imageUrl && (
                          <div className="mt-2">
                            <img
                              src={formData.imageUrl}
                              alt="Preview"
                              className="w-full h-32 object-cover rounded-lg border border-slate-200 dark:border-slate-600"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                      </div>

                      {/* Date Input */}
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                          Date
                        </label>
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) => handleInputChange('date', e.target.value)}
                          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>

                      {/* Location Input */}
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                          Location
                        </label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter location..."
                        />
                      </div>

                      {/* Featured Toggle */}
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.featured}
                          onChange={(e) => handleInputChange('featured', e.target.checked)}
                          className="sr-only"
                        />
                        <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          formData.featured ? 'bg-brand-600' : 'bg-gray-200 dark:bg-gray-700'
                        }`}>
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            formData.featured ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                            Featured Item
                          </span>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Show this item prominently
                          </p>
                        </div>
                      </label>

                      {/* Status Select */}
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                          Status
                        </label>
                        <select
                          value={formData.status}
                          onChange={(e) => handleInputChange('status', e.target.value)}
                          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="active">✅ Active</option>
                          <option value="archived">📁 Archived</option>
                        </select>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>

            {/* Footer - Fixed at bottom */}
            <div className="flex-shrink-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 px-6 py-4">
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || !formData.title || !formData.imageUrl}
                  className="bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 disabled:from-slate-400 disabled:to-slate-500 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-3 transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-none"
                >
                  {submitting ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Create Gallery Item
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </motion.div>

      {/* Media Library Modal */}
      {showMediaLibrary && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 p-0 w-full max-w-5xl max-h-[95vh] overflow-hidden flex flex-col"
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-8 py-6 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    📁 Media Library
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Choose an image from your media library
                  </p>
                </div>
                <button
                  onClick={() => setShowMediaLibrary(false)}
                  className="p-3 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors duration-200 group"
                >
                  <X className="w-5 h-5 text-slate-500 group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-200" />
                </button>
              </div>

              {/* Search Bar */}
              <div className="mt-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search media files..."
                    value={mediaSearch}
                    onChange={(e) => setMediaSearch(e.target.value)}
                    className="w-full pl-4 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-8">
              {mediaLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="aspect-square bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {filteredMediaItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => selectMedia(item)}
                      className="group relative aspect-square bg-slate-100 dark:bg-slate-700 rounded-xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-brand-400 transition-all duration-200 shadow-sm hover:shadow-lg"
                    >
                      <img
                        src={item.url}
                        alt={item.altText || 'Media'}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full p-3">
                          <ImageIcon className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                        </div>
                      </div>
                      {item.altText && (
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <p className="text-white text-xs font-medium truncate">
                            {item.altText}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Empty State */}
              {filteredMediaItems.length === 0 && !mediaLoading && (
                <div className="text-center py-16">
                  <ImageIcon className="w-16 h-16 text-slate-400 mx-auto mb-6" />
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    {mediaSearch ? 'No matching media found' : 'No media available'}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                    {mediaSearch 
                      ? 'Try adjusting your search terms or browse all files.' 
                      : 'Upload some media files to your library to get started.'}
                  </p>
                  {mediaSearch && (
                    <button
                      onClick={() => setMediaSearch('')}
                      className="mt-4 text-brand-600 hover:text-brand-700 font-medium"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );

  return createPortal(modalContent, document.body);
};

export default CreateGalleryModal;
