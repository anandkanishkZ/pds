import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import DieselProductDetail from './pages/DieselProductDetail';
import Contact from './pages/Contact';
import DieselEngineOil from './pages/DieselEngineOil';
import NotFound from './pages/NotFound';

import { useEffect } from 'react';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    // Use smooth scroll for small transitions, instant for large distance
    if (typeof window !== 'undefined') {
      const distance = Math.abs(window.scrollY);
      window.scrollTo({ top: 0, behavior: distance > 1200 ? 'auto' : 'smooth' });
    }
  }, [pathname]);
  return null;
};

function App() {
  return (
  <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Navbar />
    <ScrollToTop />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/diesel-engine-oil" element={<DieselEngineOil />} />
            <Route path="/products/diesel-engine-oil/:dieselId" element={<DieselProductDetail />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/contact" element={<Contact />} />
            {/* 404 Error Page - Must be last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;