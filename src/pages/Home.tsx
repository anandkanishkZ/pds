import { Link } from 'react-router-dom';
import { Shield, Zap, Leaf, Award, CheckCircle, ChevronRight, Truck, Factory, Ship, Tractor, Building2, Car } from 'lucide-react';
import HeroSlider from '../components/HeroSlider';
// Local category images
const imgGTO = '/images/category/gto.jpg';
const imgGreases = '/images/category/greases.jpg';
const imgIndustrial = '/images/category/industrial.jpg';
const imgDEO = '/images/category/deo.jpg';
const imgMCO = '/images/category/mco.jpg';
const imgPCMO = '/images/category/pcmo.jpg';
import BackToTop from '../components/BackToTop';

const Home = () => {
  // (Replaced former productCategories section with Industries We Serve)

  const benefits = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Engine Protection',
      description: 'Advanced formulation provides superior engine protection against wear and tear'
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Fuel Efficiency',
      description: 'Optimized viscosity reduces friction and improves fuel economy'
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: 'Low Emissions',
      description: 'Environmentally conscious formulas reduce harmful emissions'
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Quality Certified',
      description: 'Meets international standards and industry certifications'
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section with Slider */}
      <HeroSlider />

      {/* Company Introduction */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Leading the Industry in Quality Lubricants
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                Power Drive Solution has been at the forefront of automotive lubrication technology for over two decades. 
                Our commitment to innovation and quality has made us a trusted partner for automotive professionals worldwide.
              </p>
              <div className="space-y-4">
                {[
                  'ISO 9001:2015 Certified Manufacturing',
                  'Advanced R&D Laboratory',
                  '20+ Years of Industry Experience',
                  'Global Distribution Network'
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-brand-600" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/about"
                className="inline-flex items-center mt-8 text-brand-600 font-semibold hover:text-brand-700 transition-colors duration-200"
              >
                Learn More About Us
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Manufacturing facility"
                className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Banner */}
      <section className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
      {/* Gears & Transmission Oils */}
          <div className="relative h-80 group overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${imgGTO})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center p-6">
              <h3 className="text-xl lg:text-2xl font-bold mb-2">GEARS & TRANSMISSION OILS [GTO]</h3>
              <Link
                to="/products/gear-oil"
                className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2 rounded transition-colors duration-300 font-semibold"
              >
                Gears & Transmission Products
              </Link>
            </div>
          </div>

      {/* Greases */}
          <div className="relative h-80 group overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${imgGreases})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center p-6">
              <h3 className="text-xl lg:text-2xl font-bold mb-2">GREASES</h3>
              <Link
                to="/products/greases"
                className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2 rounded transition-colors duration-300 font-semibold"
              >
                Greases Products
              </Link>
            </div>
          </div>

      {/* Industrial Grades */}
          <div className="relative h-80 group overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${imgIndustrial})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center p-6">
              <h3 className="text-xl lg:text-2xl font-bold mb-2">INDUSTRIAL GRADES [IG]</h3>
              <Link
                to="/products/industrial-grades"
                className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2 rounded transition-colors duration-300 font-semibold"
              >
                Industrial Grades Products
              </Link>
            </div>
          </div>

      {/* Diesel Engine Oils */}
          <div className="relative h-80 group overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${imgDEO})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center p-6">
              <h3 className="text-xl lg:text-2xl font-bold mb-2">DIESEL ENGINE OILS [DEO]</h3>
              <Link
                to="/products/diesel-engine-oil"
                className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2 rounded transition-colors duration-300 font-semibold"
              >
                Diesel Engine Oil Products
              </Link>
            </div>
          </div>

      {/* Motorcycle Oils */}
          <div className="relative h-80 group overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${imgMCO})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center p-6">
              <h3 className="text-xl lg:text-2xl font-bold mb-2">MOTORCYCLE OILS [MCO]</h3>
              <Link
                to="/products/motorcycle-oil"
                className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2 rounded transition-colors duration-300 font-semibold"
              >
                Motorcycle Oil Products
              </Link>
            </div>
          </div>

      {/* Passenger Car Motor Oils */}
          <div className="relative h-80 group overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${imgPCMO})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center p-6">
              <h3 className="text-xl lg:text-2xl font-bold mb-2">PASSENGER CAR MOTOR OILS [PCMO]</h3>
              <Link
                to="/products/petrol-engine-oil"
                className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2 rounded transition-colors duration-300 font-semibold"
              >
                Passenger Car Oil Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Power Drive Solution?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our advanced formulations deliver superior performance across all automotive applications
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              >
                <div className="text-brand-600 mb-4 group-hover:scale-110 transition-transform duration-200">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve (replaces former Product Range section) */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_35%,rgba(6,71,127,0.08),transparent_65%)] dark:bg-[radial-gradient(circle_at_70%_65%,rgba(255,211,71,0.07),transparent_65%)]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-5">
              Industries We Serve
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Tailored lubrication solutions engineered for demanding operating environments across transportation, industrial and specialty segments.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Transportation / Fleet */}
            <div className="group relative p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#06477f]/10 dark:bg-[#06477f]/30 flex items-center justify-center text-[#06477f] dark:text-[#ffd347]">
                  <Truck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">Fleet & Transportation</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Extended drain, emission system compatible oils reducing total operating cost.</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Extended Drain', 'DPF Safe', 'Fuel Economy'].map(t => (
                  <span key={t} className="px-3 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-[11px] font-medium tracking-wide text-gray-600 dark:text-gray-300">{t}</span>
                ))}
              </div>
            </div>
            {/* Construction & Heavy Equipment */}
            <div className="group relative p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#06477f]/10 dark:bg-[#06477f]/30 flex items-center justify-center text-[#06477f] dark:text-[#ffd347]">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">Construction & Heavy Duty</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">High load & thermal stability formulations for severe service cycles.</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Shear Stable', 'Anti-Wear', 'Clean Engines'].map(t => (
                  <span key={t} className="px-3 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-[11px] font-medium tracking-wide text-gray-600 dark:text-gray-300">{t}</span>
                ))}
              </div>
            </div>
            {/* Agriculture */}
            <div className="group relative p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#06477f]/10 dark:bg-[#06477f]/30 flex items-center justify-center text-[#06477f] dark:text-[#ffd347]">
                  <Tractor className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">Agriculture & Off-Road</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Multi-purpose protection for variable load, dusty & high-hour operations.</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Dust Shield', 'High Uptime', 'Oxidation Control'].map(t => (
                  <span key={t} className="px-3 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-[11px] font-medium tracking-wide text-gray-600 dark:text-gray-300">{t}</span>
                ))}
              </div>
            </div>
            {/* Manufacturing / Industrial */}
            <div className="group relative p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#06477f]/10 dark:bg-[#06477f]/30 flex items-center justify-center text-[#06477f] dark:text-[#ffd347]">
                  <Factory className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">Manufacturing & Industrial</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Reliability-focused lubrication for continuous duty & critical assets.</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Extended Life', 'Deposit Control', 'Energy Efficient'].map(t => (
                  <span key={t} className="px-3 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-[11px] font-medium tracking-wide text-gray-600 dark:text-gray-300">{t}</span>
                ))}
              </div>
            </div>
            {/* Marine & Power */}
            <div className="group relative p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#06477f]/10 dark:bg-[#06477f]/30 flex items-center justify-center text-[#06477f] dark:text-[#ffd347]">
                  <Ship className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">Marine & Power Generation</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Formulated for corrosion resistance & sustained thermal stability.</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Corrosion Guard', 'Thermal Stable', 'Load Resilience'].map(t => (
                  <span key={t} className="px-3 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-[11px] font-medium tracking-wide text-gray-600 dark:text-gray-300">{t}</span>
                ))}
              </div>
            </div>
            {/* Passenger & Performance */}
            <div className="group relative p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#06477f]/10 dark:bg-[#06477f]/30 flex items-center justify-center text-[#06477f] dark:text-[#ffd347]">
                  <Car className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">Passenger & Performance</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Low-friction chemistry supporting fuel economy & engine cleanliness.</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Low Friction', 'Clean Engines', 'Emission Ready'].map(t => (
                  <span key={t} className="px-3 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-[11px] font-medium tracking-wide text-gray-600 dark:text-gray-300">{t}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-16 flex justify-center">
            <Link to="/contact" className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#06477f] text-white font-semibold shadow hover:shadow-lg hover:bg-[#053d6e] transition">
              Discuss Your Application
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition" />
            </Link>
          </div>
        </div>
      </section>

      {/**
       * CTA Section (Disabled)
       * -------------------------------------------------------
       * This call-to-action block has been commented out per request.
       * Restore by removing this wrapping comment.
       */}
      {false && (
        <section className="py-20 bg-brand-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Experience Superior Performance?
            </h2>
            <p className="text-xl text-brand-100 mb-8 max-w-2xl mx-auto">
              Get in touch with our experts to find the perfect lubrication solution for your needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-brand-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 hover:scale-105 shadow-lg"
              >
                Get Quote
              </Link>
              <Link
                to="/products"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-brand-600 transition-all duration-200 hover:scale-105"
              >
                View Products
              </Link>
            </div>
          </div>
        </section>
      )}
      
      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
};

export default Home;