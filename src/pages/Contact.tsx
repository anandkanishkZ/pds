import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import BackToTop from '../components/BackToTop';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<null | { type: 'success' | 'error'; msg: string }>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', msg: 'Please complete required fields before submitting.' });
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setStatus({ type: 'success', msg: 'Message sent successfully. We will respond shortly.' });
      setFormData({ name: '', email: '', company: '', phone: '', subject: '', message: '' });
    }, 1000);
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'Registered Office',
      details: ['Power Drive Solution Pvt. Ltd.', 'Jwagal 11, Lalitpur', 'Nepal']
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: 'Landline',
      details: ['01-5404222']
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Email',
      details: ['info@powerdrivesolution.com.np']
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Business Hours',
      details: ['Sun - Fri: 9:30 AM - 6:00 PM', 'Saturday: Closed']
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-900 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/236730/pexels-photo-236730.jpeg?auto=compress&cs=tinysrgb&w=1920)'
          }}
        ></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Contact <span className="text-brand-500">Us</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Get in touch with our experts for personalized lubrication solutions
          </p>
        </div>
      </section>

      {/* Contact Information */}
  <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="group p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center"
              >
                <div className="text-brand-600 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-200">
                  {info.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {info.title}
                </h3>
                <div className="space-y-2">
                  {info.details.map((detail, idx) => {
                    const lower = detail.toLowerCase();
                    const isEmail = lower.includes('@');
                    const isPhone = /\d{2,}-?\d+/.test(detail) && info.title.toLowerCase().includes('landline');
                    return (
                      <p key={idx} className="text-gray-600 dark:text-gray-300 text-sm">
                        {isEmail ? (
                          <a href={`mailto:${detail}`} className="hover:text-brand-600 dark:hover:text-brand-400 transition">{detail}</a>
                        ) : isPhone ? (
                          <a href={`tel:${detail.replace(/[^\d+]/g,'')}`} className="hover:text-brand-600 dark:hover:text-brand-400 transition">{detail}</a>
                        ) : detail}
                      </p>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
  <section className="py-16 bg-white dark:bg-gray-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl shadow-lg dark:shadow-2xl border border-gray-200 dark:border-gray-700">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-400 focus:border-transparent hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-400 focus:border-transparent hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="company"
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-400 focus:border-transparent hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-400 focus:border-transparent hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200"
                  />
                </div>
                
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-400 focus:border-transparent hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200"
                >
                  <option value="" className="text-gray-500 dark:text-gray-400">Select Subject</option>
                  <option value="product-inquiry" className="text-gray-900 dark:text-gray-100">Product Inquiry</option>
                  <option value="technical-support" className="text-gray-900 dark:text-gray-100">Technical Support</option>
                  <option value="bulk-orders" className="text-gray-900 dark:text-gray-100">Bulk Orders</option>
                  <option value="partnership" className="text-gray-900 dark:text-gray-100">Partnership Opportunities</option>
                  <option value="general" className="text-gray-900 dark:text-gray-100">General Information</option>
                </select>
                
                <textarea
                  name="message"
                  placeholder="Your Message *"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-400 focus:border-transparent hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 resize-vertical"
                ></textarea>
                {status && (
                  <div className={`text-sm font-medium px-4 py-3 rounded-lg border transition-colors ${
                    status.type === 'success' 
                      ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700 text-green-700 dark:text-green-300' 
                      : 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700 text-red-700 dark:text-red-300'
                  }`}>{status.msg}</div>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-brand-600 hover:bg-brand-700 dark:bg-brand-700 dark:hover:bg-brand-600 disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl dark:shadow-brand-900/50 font-semibold flex items-center justify-center"
                >
                  <Send className={`h-5 w-5 mr-2 ${submitting ? 'animate-pulse' : ''}`} />
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Map & Location Info */}
            <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl shadow-lg dark:shadow-2xl border border-gray-200 dark:border-gray-700">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Visit Us</h2>
              <div className="relative rounded-2xl overflow-hidden shadow-lg mb-8 ring-1 ring-gray-200 dark:ring-gray-700">
                <div className="aspect-[16/9] w-full">
                  <iframe
                    title="Power Drive Solution Location"
                    className="w-full h-full grayscale-[20%] contrast-110 brightness-95"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=Jwagal+11+Lalitpur+Nepal"
                  />
                </div>
                <div className="absolute top-2 left-2 bg-white/90 dark:bg-gray-900/80 backdrop-blur px-3 py-1.5 rounded-md text-xs font-medium text-gray-700 dark:text-gray-200 shadow">Office Location</div>
              </div>
              <div className="flex flex-wrap gap-3 mb-10">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Jwagal+11+Lalitpur+Nepal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-600 text-white text-sm font-medium hover:bg-brand-500 transition shadow"
                >
                  <MapPin className="h-4 w-4" /> Get Directions
                </a>
                <a
                  href="tel:015404222"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-900 dark:bg-gray-800 text-white text-sm font-medium hover:bg-gray-700 dark:hover:bg-gray-700 transition shadow"
                >
                  <Phone className="h-4 w-4" /> Call Office
                </a>
                <a
                  href="mailto:info@powerdrivesolution.com.np"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-gray-900 text-sm font-medium hover:bg-gray-50 border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 transition shadow"
                >
                  <Mail className="h-4 w-4" /> Email Us
                </a>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Why Visit Us?</h3>
                <ul className="space-y-3">
                  {[
                    'Tour our state-of-the-art manufacturing facility',
                    'Meet with our technical experts',
                    'See our quality control processes firsthand',
                    'Discuss custom lubrication solutions',
                    'Experience our product testing laboratory'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-brand-600 rounded-full"></div>
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
  <section className="relative py-16 text-white bg-gradient-to-r from-brand-500 via-brand-600 to-brand-700 dark:from-brand-600 dark:via-brand-700 dark:to-brand-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay" style={{backgroundImage:'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4), transparent 60%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.3), transparent 55%)'}}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 tracking-tight drop-shadow-sm">24/7 Emergency Support</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Need immediate technical assistance? Our emergency support team is here to help.
          </p>
          <a
            href="tel:+1-555-EMERGENCY"
            className="inline-flex items-center gap-2 bg-white text-brand-700 px-8 py-3 rounded-xl font-semibold shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <Phone className="h-5 w-5 mr-2" /> Call Emergency Support
          </a>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Power Drive Solution Pvt. Ltd.',
            address: { '@type': 'PostalAddress', streetAddress: 'Jwagal 11', addressLocality: 'Lalitpur', addressCountry: 'NP' },
            telephone: '+977-1-5404222',
            email: 'info@powerdrivesolution.com.np',
            url: typeof window !== 'undefined' ? window.location.origin + '/contact' : 'https://powerdrivesolution.com.np/contact',
            image: typeof window !== 'undefined' ? window.location.origin + '/images/logo.png' : 'https://powerdrivesolution.com.np/images/logo.png'
          })
        }}
      />
      
      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
};

export default Contact;