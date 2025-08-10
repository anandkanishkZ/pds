import { useState } from 'react';
import { Shield, Award, Beaker, Zap, Users } from 'lucide-react';
import BackToTop from '../components/BackToTop';

interface LeadershipProfile {
  name: string;
  title: string;
  short: string;
  full: string;
}

const About = () => {
  const getInitials = (name: string) =>
    name
      .replace(/Mr\.?\s+/gi, '')
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(p => p[0])
      .join('')
      .toUpperCase();
  const coreValues = [
    {
      icon: <Shield className="h-7 w-7" />,
      title: 'Reliability',
      description: 'Long-term partnerships built on consistency, trust and dependable delivery.'
    },
    {
      icon: <Award className="h-7 w-7" />,
      title: 'Quality',
      description: 'Every product we trade is vetted against rigorous performance standards.'
    },
    {
      icon: <Beaker className="h-7 w-7" />,
      title: 'Innovation',
      description: 'Forward-looking mindset embracing ideas and technologies that add real value.'
    },
    {
      icon: <Zap className="h-7 w-7" />,
      title: 'Efficiency',
      description: 'Streamlined, timely and cost-effective operations across the supply chain.'
    },
    {
      icon: <Users className="h-7 w-7" />,
      title: 'Supportive Partnership',
      description: 'Working hand‑in‑hand to empower customer growth and progress.'
    }
  ];

  const leadership: LeadershipProfile[] = [
    {
      name: 'Mr. Nim Prasad Adhikari',
      title: 'Chairperson',
      short: 'Strategic oversight with 20+ years in Nepal’s cooperative & financial sectors, guiding resilience and sustainable growth at PDS.',
      full: 'Mr. Nim Prasad Adhikari serves as the Chairperson of PDS, offering strategic oversight and senior leadership. With over 20 years of experience in the cooperative and financial sectors, he brings deep understanding of Nepal’s financial landscape, including market dynamics, risk assessment, and sustainable business growth. Recognized for expertise in working capital optimization, financial planning, and cash flow management, he ensures the financial health and operational stability of PDS. As Chairperson, he is both strategist and guardian—providing vision, organizational protection, and team motivation as PDS scales.'
    },
    {
      name: 'Mr. Pradeep Bhattarai',
      title: 'Leadership Partner',
      short: 'Over 20 years in Nepal’s automotive sector—brand builder, distribution architect and strategic pillar of PDS.',
      full: 'With over 20 years of hands-on experience in Nepal’s automotive industry, Mr. Pradeep Bhattarai brings deep insight and leadership to PDS. Beginning as country head for a leading OEM in the two‑wheeler after‑sales market, he helped introduce and establish the brand nationwide. After successfully running his own distribution business for automotive and energy products, he now serves as a strategic pillar of PDS. His leadership spans sales, marketing, entrepreneurship, network development, negotiations and client relationship management—fueling growth and market expansion.'
    },
    {
      name: 'Mr. Puran Bahadur Khatri',
      title: 'Managing Director',
      short: 'Operational driver with two decades of sales, marketing & lubricant expertise—aligning strategy to flawless execution.',
      full: 'Mr. Puran Bahadur Khatri serves as Managing Director and key driving force behind daily operations and strategic leadership. With 20+ years across sales, marketing and lubricants, including consultant roles domestically and internationally, he is respected for building distribution networks, dealer relationship management, and embedding global best practices. A national and international award‑winning sales professional, he has led training and promotional initiatives across India, Dubai, Bangladesh and beyond. His people‑focused leadership and execution rigor position PDS for sustained, innovative growth.'
    },
    {
      name: 'Mr. Deepak Bhattarai',
      title: 'Director',
      short: 'Blends aftermarket sales expertise with a decade of humanitarian logistics & procurement leadership.',
      full: 'Mr. Deepak Bhattarai combines 8+ years of aftermarket combustion engine segment sales with 10 years in the humanitarian and development sector. His background spans logistics, supply chain, complex procurement, contract and supplier management, spend analysis, ERP implementation, compliance and cooperative leadership. As a Board Director, his stakeholder engagement strengths, people management and innovative mindset help guide PDS’s strategic direction with operational foresight.'
    }
  ];

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const toggle = (name: string) => setExpanded(prev => ({ ...prev, [name]: !prev[name] }));

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-brand-900 to-black text-white">
        <div className="absolute inset-0 opacity-[0.18] bg-[radial-gradient(circle_at_30%_40%,#ffd347,transparent_60%)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="font-poppins text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Powering Mobility & Industrial Progress
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 leading-relaxed">
            At <span className="text-brand-400 font-semibold">Power Drive Solution (PDS)</span>, we exist to support your drive—literally and figuratively. We trade and supply essential products that keep vehicles moving, industries operating and ambitions advancing.
          </p>
        </div>
      </section>

      {/* Intro Narrative */}
      <section className="py-20 bg-white dark:bg-gray-950 transition-colors">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          <p>
            Mobility sits at the heart of everything we do. Just as high‑quality engine oil ensures smooth movement and lasting performance, PDS is committed to being a reliable, efficient and innovative partner in every customer journey.
          </p>
          <p>
            We specialize in trading and supplying products that drive both machines and industries—delivering not just goods, but value, trust and performance. Our aim is to empower customers with solutions that meet the highest standards of quality, reliability and efficiency every time.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/60 backdrop-blur-sm transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-14 items-start">
          <div className="space-y-6">
            <h2 className="font-poppins text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Our Vision</h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              To be the most trusted partner in powering mobility and industrial progress—delivering smart, reliable and efficient solutions for every drive and direction.
            </p>
          </div>
          <div className="space-y-6">
            <h2 className="font-poppins text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              We provide high‑quality trading and supply chain solutions for the automotive and industrial sectors, driven by reliability, innovation and a strong commitment to customer success.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white dark:bg-gray-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <h2 className="font-poppins text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Core Values</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Principles that shape every decision, relationship and result at PDS.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {coreValues.map(v => (
              <div key={v.title} className="group relative rounded-xl border border-gray-100 dark:border-gray-700/60 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 p-6 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-brand-600 group-hover:scale-110 transition-transform">{v.icon}</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg leading-tight">
                    {v.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {v.description}
                </p>
                <div className="absolute inset-0 rounded-xl ring-1 ring-transparent group-hover:ring-brand-500/30 pointer-events-none transition" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,#06477f33,transparent_70%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <h2 className="font-poppins text-3xl md:text-4xl font-bold mb-5">Leadership Team</h2>
            <p className="text-gray-300 text-lg leading-relaxed">Experienced, multi‑disciplinary leadership combining finance, automotive, lubricants, distribution, logistics and development sector expertise.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {leadership.map(person => {
              const isOpen = expanded[person.name];
              return (
                <div
                  key={person.name}
                  className="relative group rounded-2xl bg-gradient-to-br from-gray-800 to-gray-850/90 border border-gray-700/60 p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-start gap-5 mb-5">
                      <div className="relative shrink-0">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-brand-600 to-brand-500 flex items-center justify-center font-poppins text-xl font-semibold text-white shadow-inner ring-1 ring-white/10">
                          {getInitials(person.name)}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-poppins text-2xl font-semibold tracking-tight leading-snug">
                          {person.name}
                        </h3>
                        <p className="text-brand-300 font-medium uppercase text-xs tracking-wider mt-1">{person.title}</p>
                      </div>
                    </div>
                    <p className="text-sm md:text-[15px] text-gray-300 leading-relaxed">
                      {isOpen ? person.full : person.short}
                    </p>
                    <button
                      onClick={() => toggle(person.name)}
                      className="mt-5 self-start text-xs font-medium tracking-wide rounded-full px-4 py-2 bg-brand-600 hover:bg-brand-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/60 transition"
                    >
                      {isOpen ? 'Show Less' : 'Read More'}
                    </button>
                  </div>
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-brand-500/40 transition pointer-events-none" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Experience Snapshot */}
      <section className="py-16 bg-white dark:bg-gray-950 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 sm:grid-cols-3">
          {[
            { k: '20+ Years', v: 'Leadership Experience' },
            { k: 'Multi‑Sector', v: 'Automotive • Finance • Logistics' },
            { k: 'Growth Focus', v: 'Performance, Innovation, Partnership' }
          ].map(item => (
            <div key={item.k} className="relative rounded-xl border border-gray-100 dark:border-gray-700/60 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 p-6 shadow-sm hover:shadow-md transition">
              <h4 className="font-poppins text-xl font-semibold text-gray-900 dark:text-white mb-1">{item.k}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-medium tracking-wide">{item.v}</p>
              <div className="absolute inset-0 rounded-xl ring-1 ring-transparent hover:ring-brand-500/30 pointer-events-none transition" />
            </div>
          ))}
        </div>
      </section>

      <BackToTop />
    </div>
  );
};

export default About;