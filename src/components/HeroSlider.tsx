import { useState, useEffect } from 'react';
// Imported local slider images (moved from direct string usage)
const slide1 = '/images/slider/slide1c.jpg';
const slide2 = '/images/slider/slide2.jpg';
const slide3 = '/images/slider/slide3.jpg';
const slide4 = '/images/slider/slide4a.jpg';
const slide5 = '/images/slider/slide5.jpg';
const slide6 = '/images/slider/sldie6.jpg';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Using imported image assets
  const slides: Slide[] = [
    { id: 1, image: slide1, title: 'Powering Every Engine', subtitle: 'Every Ride', description: 'Premium automobile oils and lubricants engineered for performance, protection, and efficiency' },
    { id: 2, image: slide2, title: 'Advanced Lubrication', subtitle: 'Technology', description: 'Cutting-edge formulations that deliver superior engine protection and fuel efficiency' },
    { id: 3, image: slide3, title: 'Industrial Grade', subtitle: 'Solutions', description: 'Heavy-duty lubricants designed for the most demanding industrial applications' },
    { id: 4, image: slide4, title: 'Quality Assured', subtitle: 'Performance', description: 'Rigorous testing and quality control ensure optimal performance in every drop' },
    { id: 5, image: slide5, title: 'Engineered Protection', subtitle: 'Reliability', description: 'Formulations focused on extended engine life under demanding conditions' },
    { id: 6, image: slide6, title: 'Performance Tested', subtitle: 'Proven', description: 'Field validated performance across diverse fleets & operating environments' }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative w-full mobile-full-height min-h-[600px] overflow-hidden bg-gray-900">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide
              ? 'opacity-100 scale-100'
              : index === (currentSlide - 1 + slides.length) % slides.length
              ? 'opacity-0 scale-110 -translate-x-full'
              : index === (currentSlide + 1) % slides.length
              ? 'opacity-0 scale-110 translate-x-full'
              : 'opacity-0 scale-110'
          }`}
        >
          {/* Desktop Image */}
          <div
            className="absolute inset-0 hidden md:block bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center'
            }}
          />
          
          {/* Mobile Image - Optimized approach */}
          <div className="absolute inset-0 md:hidden">
            <img
              src={slide.image}
              alt={slide.title}
              className="hero-slider-mobile-img"
              loading={index === currentSlide ? 'eager' : 'lazy'}
            />
          </div>
          
          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40 md:bg-gradient-to-r md:from-black/40 md:via-transparent md:to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        {/* Content removed - clean image slider */}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 group"
      >
        <ChevronLeft className="h-4 w-4 md:h-6 md:w-6 group-hover:-translate-x-1 transition-transform duration-300" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 group"
      >
        <ChevronRight className="h-4 w-4 md:h-6 md:w-6 group-hover:translate-x-1 transition-transform duration-300" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2 md:space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-brand-500 scale-125 shadow-lg shadow-brand-500/50'
                : 'bg-white/50 hover:bg-white/70 hover:scale-110'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20">
        <div
          className="h-full bg-brand-500 transition-all duration-300"
          style={{
            width: isAutoPlaying ? `${((currentSlide + 1) / slides.length) * 100}%` : '0%'
          }}
        />
      </div>

      {/* Slide Counter */}
      <div className="absolute top-4 md:top-8 right-4 md:right-8 z-20 bg-white/10 backdrop-blur-sm text-white px-2 py-1 md:px-4 md:py-2 rounded-full">
        <span className="text-xs md:text-sm font-medium">
          {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
};

export default HeroSlider;
