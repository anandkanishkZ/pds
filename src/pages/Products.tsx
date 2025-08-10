import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Car, Settings, Droplets, Award, Beaker, Shield, Bike, Factory } from 'lucide-react';
import BackToTop from '../components/BackToTop';
// Local category images reused from Home page
const imgDEO = '/images/category/deo.jpg';
const imgPCMO = '/images/category/pcmo.jpg';
const imgGTO = '/images/category/gto.jpg';
const imgGreases = '/images/category/greases.jpg';
const imgIndustrial = '/images/category/industrial.jpg';
const imgMCO = '/images/category/mco.jpg';

const Products = () => {
  const productCategories = [
    {
      id: 'diesel-engine-oil',
      title: 'Diesel Engine Oils [DEO]',
      description: 'Heavy-duty diesel formulations engineered for extended drain, protection & emission system compatibility.',
      icon: <Truck className="h-12 w-12" />,
      image: imgDEO,
      link: '/products/diesel-engine-oil'
    },
    {
      id: 'motorcycle-oils',
      title: 'Motorcycle Oils [MCO]',
      description: 'Optimized clutch performance & high-rev protection for modern 2T & 4T motorcycle engines.',
      icon: <Bike className="h-12 w-12" />,
      image: imgMCO,
      comingSoon: true
    },
    {
      id: 'passenger-car-motor-oils',
      title: 'Passenger Car Motor Oils [PCMO]',
      description: 'Low-friction, fuel-efficient oils supporting cleanliness, cold start fluidity and emission targets.',
      icon: <Car className="h-12 w-12" />,
      image: imgPCMO,
      comingSoon: true
    },
    {
      id: 'gears-transmission-oils',
      title: 'Gears & Transmission Oils [GTO]',
      description: 'Extreme pressure & shear stable protection for manual gearboxes, axles & transmissions.',
      icon: <Settings className="h-12 w-12" />,
      image: imgGTO,
      comingSoon: true
    },
    {
      id: 'greases',
      title: 'Greases',
      description: 'Multi-purpose and specialty greases delivering wear, water washout & corrosion resistance.',
      icon: <Droplets className="h-12 w-12" />,
      image: imgGreases,
      comingSoon: true
    },
    {
      id: 'industrial-grades',
      title: 'Industrial Grades [IG]',
      description: 'Comprehensive portfolio for compressors, turbines, hydraulics & critical rotating assets.',
      icon: <Factory className="h-12 w-12" />,
      image: imgIndustrial,
      comingSoon: true
    },
    {
      id: 'specialities',
      title: 'Specialities',
      description: 'Application-specific and advanced formulation oils for niche or extreme duty conditions.',
      icon: <Beaker className="h-12 w-12" />,
      image: imgPCMO,
      comingSoon: true
    }
  ];

  return (
    <div className="pt-16 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 dark:opacity-40"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=1920)'
          }}
        ></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="text-brand-600 dark:text-brand-400">Products</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive lubrication solutions engineered for superior performance
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productCategories.map((category, index) => (
              <div
                key={index}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-transparent dark:border-gray-700"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/70 backdrop-blur-sm rounded-full p-3">
                    <div className="text-brand-600 dark:text-brand-400">
                      {category.icon}
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                    {category.description}
                  </p>
                  {/* Removed Popular Grades & Key Features per request */}
                  <Link
                    to={category.link || (category.comingSoon ? `/contact?category=${category.id}` : `/products/${category.id}`)}
                    className="inline-flex items-center text-brand-600 dark:text-brand-400 font-semibold hover:text-brand-700 dark:hover:text-brand-300 transition-colors duration-200 group"
                  >
                    {category.comingSoon ? 'Enquire' : 'View Details'}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform duration-200" />
                  </Link>
                  {category.comingSoon && (
                    <div className="mt-3 inline-block text-[11px] tracking-wide uppercase font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded dark:bg-orange-500/10 dark:text-orange-300">
                      Coming Soon
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Quality You Can Trust
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Every product undergoes rigorous testing and quality control to ensure optimal performance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-brand-50 dark:bg-brand-600/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-100 dark:group-hover:bg-brand-600/30 transition-colors duration-200">
                <Award className="h-10 w-10 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Certified Quality
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                All products meet international quality standards and certifications
              </p>
            </div>
            
            <div className="text-center group">
              <div className="bg-brand-50 dark:bg-brand-600/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-100 dark:group-hover:bg-brand-600/30 transition-colors duration-200">
                <Beaker className="h-10 w-10 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Advanced Testing
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Comprehensive laboratory testing ensures product reliability and performance
              </p>
            </div>
            
            <div className="text-center group">
              <div className="bg-brand-50 dark:bg-brand-600/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-100 dark:group-hover:bg-brand-600/30 transition-colors duration-200">
                <Shield className="h-10 w-10 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Performance Guarantee
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Backed by our commitment to excellence and customer satisfaction
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
};

export default Products;