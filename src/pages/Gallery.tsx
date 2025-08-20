import { useState, useEffect } from 'react';
import { X, ZoomIn, Calendar, MapPin, Eye, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { listGalleryItems } from '../lib/api';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  date: string;
  location: string;
  featured: boolean;
}

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsAnimated(true);
    loadGalleryItems();
  }, []);

  const loadGalleryItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await listGalleryItems({ pageSize: 100 });
      
      // Map API response to our interface
      const items: GalleryItem[] = response.data.map(item => ({
        id: item.id,
        title: item.title,
        category: item.category,
        imageUrl: item.imageUrl,
        description: item.description || '',
        date: item.date,
        location: item.location || '',
        featured: item.featured
      }));
      
      setGalleryItems(items);
    } catch (err) {
      console.error('Failed to load gallery items:', err);
      setError('Failed to load gallery items');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', 'facility', 'products', 'events', 'achievements'];
  
  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  const featuredItems = galleryItems.filter(item => item.featured);

  const openModal = (item: GalleryItem) => {
    setSelectedImage(item);
    setCurrentIndex(galleryItems.indexOf(item));
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % galleryItems.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(galleryItems[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(galleryItems[prevIndex]);
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'facility': return 'Facilities';
      case 'products': return 'Products';
      case 'events': return 'Events';
      case 'achievements': return 'Achievements';
      default: return 'All Categories';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
        <div className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Gallery</h1>
              <p className="text-lg text-gray-200">Loading our gallery...</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-[4/3] bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
        <div className="pt-32 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Gallery</h1>
            <p className="text-lg text-gray-200 mb-8">{error}</p>
            <button
              onClick={loadGalleryItems}
              className="bg-[#fec216] hover:bg-[#fdb913] text-[#06477f] px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Hero Section */}
      <section className="relative pt-32 md:pt-36 pb-16 overflow-hidden bg-[#06477f]">
        <div className="container mx-auto px-4 relative z-10">
          <div className={`text-center transition-all duration-1000 ${isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Our Gallery
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8 leading-relaxed">
              Explore our world-class facilities, premium products, and memorable moments. 
              Witness the excellence that drives Power Drive Solution forward.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-white/70">
              <Eye className="h-4 w-4" />
              <span>{galleryItems.length} Images</span>
              <span className="mx-2">•</span>
              <Calendar className="h-4 w-4" />
              <span>Updated Daily</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Gallery Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 transition-all duration-1000 delay-300 ${isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Featured Highlights
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Our most impactful moments and achievements
            </p>
          </div>

          <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-500 ${isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
            {featuredItems.map((item, index) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                onClick={() => openModal(item)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-square">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-bold text-lg mb-1 line-clamp-2">{item.title}</h3>
                    <div className="flex items-center text-sm opacity-90">
                      <MapPin className="h-3 w-3 mr-1" />
                      {item.location}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <ZoomIn className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Gallery Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 transition-all duration-1000 delay-700 ${isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Complete Gallery
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Browse through our comprehensive image collection
            </p>
          </div>

          {/* Category Filter */}
          <div className={`flex flex-wrap justify-center gap-2 mb-12 transition-all duration-1000 delay-900 ${isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeFilter === category
                    ? 'bg-[#06477f] text-white shadow-lg transform scale-105'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-[#06477f] hover:text-white shadow-md hover:scale-105'
                }`}
              >
                <Filter className="h-4 w-4" />
                {getCategoryLabel(category)}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className={`grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-1000 delay-1100 ${isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-white dark:bg-gray-800"
                onClick={() => openModal(item)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`${'text-xs font-medium px-2 py-1 rounded-full'} ${
                      item.category === 'facility' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      item.category === 'products' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                    }`}>
                      {getCategoryLabel(item.category)}
                    </span>
                    {item.featured && (
                      <span className="text-xs font-bold text-[#fec216] bg-[#fec216]/10 px-2 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-800 dark:text-white mb-2 line-clamp-2 group-hover:text-[#06477f] dark:group-hover:text-[#fec216] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(item.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {item.location}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#06477f] dark:group-hover:border-[#fec216] transition-colors duration-300 rounded-xl"></div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <Eye className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                No gallery items found
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                {activeFilter === 'all' 
                  ? 'No gallery items have been added yet. Check back later for updates.'
                  : `No ${getCategoryLabel(activeFilter).toLowerCase()} items found. Try selecting a different category.`
                }
              </p>
              {activeFilter !== 'all' && (
                <button
                  onClick={() => setActiveFilter('all')}
                  className="bg-[#06477f] hover:bg-[#053961] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  View All Categories
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/20 transition-colors duration-300"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-colors duration-300"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-colors duration-300"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Image */}
            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.title}
              className="w-full h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white rounded-b-lg" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
              <p className="text-gray-300 mb-4">{selectedImage.description}</p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(selectedImage.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {selectedImage.location}
                  </div>
                </div>
                <span className="text-gray-400">
                  {currentIndex + 1} / {galleryItems.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Elements */}
      <div className="fixed top-20 left-10 w-20 h-20 bg-[#fec216]/10 rounded-full blur-xl animate-bounce opacity-60" style={{ animationDelay: '2s' }}></div>
      <div className="fixed bottom-20 right-10 w-32 h-32 bg-[#06477f]/10 rounded-full blur-2xl animate-bounce opacity-60" style={{ animationDelay: '3s' }}></div>
    </div>
  );
};

export default Gallery;
