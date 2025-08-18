import { Link } from 'react-router-dom';
import { ArrowRight, Award, Beaker, Shield, Loader2 } from 'lucide-react';
import BackToTop from '../components/BackToTop';
import { useEffect, useState } from 'react';
import { fetchPublicCategories, type ProductCategory } from '../lib/api';

// Fallback icon mapping (simple heuristic)
function categoryIcon(name: string){
  if(/diesel/i.test(name)) return <Shield className="h-12 w-12"/>;
  if(/motor|bike/i.test(name)) return <Beaker className="h-12 w-12"/>;
  return <Beaker className="h-12 w-12"/>;
}

const Products = () => {
  const [categories,setCategories]=useState<ProductCategory[]>([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState<string|null>(null);
  useEffect(()=>{ (async()=>{ try { const cats = await fetchPublicCategories(); setCategories(cats); } catch(e:any){ setError(e.message||'Failed'); } finally { setLoading(false);} })(); },[]);

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
            {loading && <div className="col-span-full flex items-center justify-center py-20 text-slate-500"><Loader2 className="h-6 w-6 animate-spin"/></div>}
            {error && <div className="col-span-full text-center py-20 text-rose-600">{error}</div>}
            {!loading && !error && categories.map((category) => (
              <div
                key={category.id}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-transparent dark:border-gray-700"
              >
                <div className="relative h-48 overflow-hidden">
                  {category.heroImageUrl ? (
                    <img src={category.heroImageUrl} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 text-slate-400">
                      {categoryIcon(category.name)}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/70 backdrop-blur-sm rounded-full p-3">
                    <div className="text-brand-600 dark:text-brand-400">{categoryIcon(category.name)}</div>
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{category.name}</h3>
                  {category.shortDescription && (<p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">{category.shortDescription}</p>)}
                  {/* Removed Popular Grades & Key Features per request */}
                  <Link
                    to={category.status==='coming_soon' ? `/contact?category=${category.slug}` : `/products/category/${category.slug}`}
                    className="inline-flex items-center text-brand-600 dark:text-brand-400 font-semibold hover:text-brand-700 dark:hover:text-brand-300 transition-colors duration-200 group"
                  >
                    {category.status==='coming_soon' ? 'Enquire' : 'View Details'}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform duration-200" />
                  </Link>
                  {category.status==='coming_soon' && (
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