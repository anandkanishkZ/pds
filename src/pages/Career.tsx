import { useState, useEffect, useRef } from 'react';
import { MapPin, Clock, Users, Briefcase, ChevronRight, Send, Star, Award, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

interface JobListing {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
  benefits: string[];
  isHot: boolean;
}

type FormData = {
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  experience: string;
  message: string;
  resumeFile: File | null;
};

const Career = () => {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [isAnimated, setIsAnimated] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    department: 'all',
    position: '',
    experience: '',
    message: '',
    resumeFile: null,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  const jobListings: JobListing[] = [
    {
      id: '1',
      title: 'Senior Chemical Engineer',
      department: 'Research & Development',
      location: 'Kathmandu, Nepal',
      type: 'Full-time',
      experience: '5-7 years',
      description:
        'Lead the development of next-generation automotive lubricants and industrial oils. Drive innovation in sustainable lubrication solutions.',
      requirements: [
        'M.Tech/B.Tech in Chemical Engineering',
        '5+ years in petroleum/lubricant industry',
        'Experience with lubricant formulation',
        'Knowledge of ASTM/API standards',
        'Strong analytical skills',
      ],
      benefits: [
        'Competitive salary package',
        'Health insurance for family',
        'Performance bonuses',
        'Professional development',
        'Flexible working hours',
      ],
      isHot: true,
    },
    {
      id: '2',
      title: 'Business Development Manager',
      department: 'Sales & Marketing',
      location: 'Kathmandu, Nepal',
      type: 'Full-time',
      experience: '3-5 years',
      description:
        'Expand our market presence across the region. Build strategic partnerships and drive revenue growth.',
      requirements: [
        'MBA in Marketing/Sales',
        '3+ years in automotive industry',
        'Proven track record in B2B sales',
        'Strong communication skills',
        'Willingness to travel',
      ],
      benefits: [
        'Attractive incentive structure',
        'Company vehicle',
        'Travel allowances',
        'Health benefits',
        'Career growth opportunities',
      ],
      isHot: false,
    },
    {
      id: '3',
      title: 'Quality Control Analyst',
      department: 'Quality Assurance',
      location: 'Kathmandu, Nepal',
      type: 'Full-time',
      experience: '2-4 years',
      description:
        'Ensure product quality through rigorous testing and analysis. Maintain compliance with international standards.',
      requirements: [
        'B.Sc in Chemistry/Chemical Engineering',
        '2+ years in laboratory testing',
        'Knowledge of petroleum testing methods',
        'Attention to detail',
        'ISO certification knowledge',
      ],
      benefits: [
        'Comprehensive training program',
        'Medical insurance',
        'Annual performance bonus',
        'Learning & development budget',
        'Work-life balance',
      ],
      isHot: false,
    },
    {
      id: '4',
      title: 'Digital Marketing Specialist',
      department: 'Marketing',
      location: 'Kathmandu, Nepal',
      type: 'Full-time',
      experience: '2-3 years',
      description:
        'Drive our digital transformation with innovative marketing strategies. Manage online presence and customer engagement.',
      requirements: [
        "Bachelor's degree in Marketing/Communications",
        '2+ years in digital marketing',
        'SEO/SEM expertise',
        'Social media management',
        'Analytics and reporting skills',
      ],
      benefits: [
        'Remote work flexibility',
        'Latest tech equipment',
        'Professional certifications',
        'Health & wellness programs',
        'Stock options',
      ],
      isHot: true,
    },
  ];

  const departments = ['all', 'Research & Development', 'Sales & Marketing', 'Quality Assurance', 'Marketing'];
  const filteredJobs = activeFilter === 'all' ? jobListings : jobListings.filter((job) => job.department === activeFilter);

  const stats = [
    { icon: Users, value: '200+', label: 'Team Members' },
    { icon: Award, value: '15+', label: 'Years of Excellence' },
    { icon: Target, value: '98%', label: 'Employee Satisfaction' },
    { icon: Briefcase, value: '25+', label: 'Open Positions' },
  ];

  const showOpenPositions = false; // toggle to true when positions are available

  const validate = (data: FormData) => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!data.name.trim()) e.name = 'Full name is required';
    const emailOk = /^\S+@\S+\.\S+$/.test(data.email);
    if (!emailOk) e.email = 'Enter a valid email address';
    const phoneOk = /^[0-9+()\-\s]{7,15}$/.test(data.phone);
    if (!phoneOk) e.phone = 'Enter a valid phone number';
    if (!data.position.trim()) e.position = 'Please specify a position';
    if (!data.experience.trim()) e.experience = 'Experience is required';
    if (data.resumeFile && data.resumeFile.size > 5 * 1024 * 1024) e.resumeFile = 'Max file size is 5MB';
    return e;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFormData((prev) => ({ ...prev, resumeFile: file }));
    setErrors((prev) => ({ ...prev, resumeFile: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate(formData);
    setErrors(v);
    if (Object.keys(v).length > 0) return;
    setSubmitStatus('submitting');
    setTimeout(() => {
      setSubmitStatus('success');
      setFormData((prev) => ({
        ...prev,
        name: '',
        email: '',
        phone: '',
        experience: '',
        message: '',
        resumeFile: null,
      }));
    }, 800);
  };

  const scrollToForm = (positionPrefill?: string) => {
    if (positionPrefill) {
      setFormData((prev) => ({ ...prev, position: positionPrefill }));
    }
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const FormCard = ({ variant }: { variant: 'sidebar' | 'center' }) => (
    <div
      ref={formRef}
      className={`${
        variant === 'sidebar'
          ? 'bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8'
          : 'bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-10'
      } transition-all duration-1000 delay-150 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      <div className={`${variant === 'center' ? 'text-center mb-6' : 'mb-6'}`}>
        <span className="inline-block text-xs font-semibold uppercase tracking-wider bg-[#06477f]/10 text-[#06477f] dark:bg-[#fec216]/10 dark:text-[#fec216] px-3 py-1 rounded-full mb-3">
          Apply Now
        </span>
        <h3 className={`${variant === 'center' ? 'text-3xl' : 'text-2xl'} font-bold text-gray-800 dark:text-white`}>
          Submit Your Resume
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">We’ll get back to you shortly.</p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className={`grid grid-cols-1 ${variant === 'center' ? 'md:grid-cols-2 gap-6' : 'gap-4'}`}>
          <div className={variant === 'center' ? 'md:col-span-1' : undefined}>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name<span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#06477f] dark:focus:ring-[#fec216] ${
                errors.name ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
              }`}
              placeholder="John Doe"
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-sm text-red-500">
                {errors.name}
              </p>
            )}
          </div>

          <div className={variant === 'center' ? 'md:col-span-1' : undefined}>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#06477f] dark:focus:ring-[#fec216] ${
                errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
              }`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-500">
                {errors.email}
              </p>
            )}
          </div>

          <div className={variant === 'center' ? 'md:col-span-1' : undefined}>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone<span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#06477f] dark:focus:ring-[#fec216] ${
                errors.phone ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
              }`}
              placeholder="+977 9800000000"
            />
            {errors.phone && (
              <p id="phone-error" className="mt-1 text-sm text-red-500">
                {errors.phone}
              </p>
            )}
          </div>

          <div className={variant === 'center' ? 'md:col-span-1' : undefined}>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Department
            </label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#06477f] dark:focus:ring-[#fec216] border-gray-200 dark:border-gray-700"
            >
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d === 'all' ? 'Any' : d}
                </option>
              ))}
            </select>
          </div>

          <div className={variant === 'center' ? 'md:col-span-1' : undefined}>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Position<span className="text-red-500">*</span>
            </label>
            <input
              id="position"
              name="position"
              type="text"
              value={formData.position}
              onChange={handleChange}
              aria-invalid={!!errors.position}
              aria-describedby={errors.position ? 'position-error' : undefined}
              className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#06477f] dark:focus:ring-[#fec216] ${
                errors.position ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
              }`}
              placeholder="e.g., Senior Chemical Engineer"
            />
            {errors.position && (
              <p id="position-error" className="mt-1 text-sm text-red-500">
                {errors.position}
              </p>
            )}
          </div>

          <div className={variant === 'center' ? 'md:col-span-1' : undefined}>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Experience<span className="text-red-500">*</span>
            </label>
            <input
              id="experience"
              name="experience"
              type="text"
              value={formData.experience}
              onChange={handleChange}
              aria-invalid={!!errors.experience}
              aria-describedby={errors.experience ? 'experience-error' : undefined}
              className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#06477f] dark:focus:ring-[#fec216] ${
                errors.experience ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
              }`}
              placeholder="e.g., 3-5 years"
            />
            {errors.experience && (
              <p id="experience-error" className="mt-1 text-sm text-red-500">
                {errors.experience}
              </p>
            )}
          </div>

          <div className={variant === 'center' ? 'md:col-span-2' : undefined}>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Cover Letter / Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#06477f] dark:focus:ring-[#fec216] border-gray-200 dark:border-gray-700"
              placeholder="Share a brief note about your experience and motivation."
            />
          </div>

          <div className={variant === 'center' ? 'md:col-span-2' : undefined}>
            <label htmlFor="resumeFile" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Upload Resume (PDF/DOC, max 5MB)
            </label>
            <input
              id="resumeFile"
              name="resumeFile"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              aria-invalid={!!errors.resumeFile}
              aria-describedby={errors.resumeFile ? 'resume-error' : undefined}
              className="block w-full text-sm text-gray-700 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#06477f] file:text-white hover:file:bg-[#053a67] dark:file:bg-[#fec216] dark:file:text-[#06477f] dark:hover:file:bg-[#ffd347]"
            />
            {errors.resumeFile && (
              <p id="resume-error" className="mt-1 text-sm text-red-500">
                {errors.resumeFile}
              </p>
            )}
          </div>
        </div>

        <div className={`${variant === 'center' ? 'mt-8 flex justify-center' : 'mt-6'}`}>
          <button
            type="submit"
            disabled={submitStatus === 'submitting'}
            className={`${
              variant === 'center' ? 'min-w-40' : 'w-full'
            } bg-[#06477f] text-white font-semibold py-3 px-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-60`}
          >
            {submitStatus === 'submitting' ? 'Submitting…' : 'Submit Application'}
          </button>
        </div>

        {submitStatus === 'success' && (
          <p className={`${variant === 'center' ? 'mt-6 text-center' : 'mt-3'} text-green-600 dark:text-green-400 font-medium`}>
            Thank you! Your application has been received.
          </p>
        )}
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Hero Section */}
      <section className="relative pt-32 md:pt-36 pb-16 overflow-hidden bg-[#06477f]">
        <div className="container mx-auto px-4 relative z-10">
          <div
            className={`text-center transition-all duration-1000 ${
              isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
            }`}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Join Our Dynamic Team</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8 leading-relaxed">
              Be part of a company that's driving innovation in automotive lubricants. Build your career while powering the
              future of mobility.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 delay-300 ${
              isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
            }`}
          >
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="text-[#06477f] dark:text-[#fec216] mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-8 w-8 mx-auto" />
                    </div>
                    <div className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{stat.value}</div>
                    <div className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Listings + Form or Centered Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {showOpenPositions ? (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left: Listings */}
              <div className="lg:col-span-2">
                <div
                  className={`text-center lg:text-left mb-12 transition-all duration-1000 delay-500 ${
                    isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
                  }`}
                >
                  <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Open Positions</h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300">Find your perfect role and grow with us</p>
                </div>

                {/* Department Filter */}
                <div
                  className={`flex flex-wrap justify-center lg:justify-start gap-2 mb-12 transition-all duration-1000 delay-700 ${
                    isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
                  }`}
                >
                  {departments.map((dept) => (
                    <button
                      key={dept}
                      onClick={() => setActiveFilter(dept)}
                      className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                        activeFilter === dept
                          ? 'bg-[#06477f] text-white shadow-lg transform scale-105'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-[#06477f] hover:text-white shadow-md hover:scale-105'
                      }`}
                    >
                      {dept === 'all' ? 'All Departments' : dept}
                    </button>
                  ))}
                </div>

                {/* Job Cards */}
                <div
                  className={`grid md:grid-cols-2 gap-8 transition-all duration-1000 delay-900 ${
                    isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
                  }`}
                >
                  {filteredJobs.map((job, index) => (
                    <div
                      key={job.id}
                      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700 group"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-[#06477f] dark:group-hover:text-[#fec216] transition-colors duration-300">
                            {job.title}
                          </h3>
                          <p className="text-[#06477f] dark:text-[#fec216] font-semibold text-sm mb-2">{job.department}</p>
                        </div>
                        {job.isHot && (
                          <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">HOT</div>
                        )}
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                          <MapPin className="h-4 w-4 mr-2" />
                          {job.location}
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                          <Clock className="h-4 w-4 mr-2" />
                          {job.type}
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                          <Briefcase className="h-4 w-4 mr-2" />
                          {job.experience}
                        </div>
                      </div>

                      <p className="text-gray-700 dark:text-gray-300 text-sm mb-6 line-clamp-3">{job.description}</p>

                      <button
                        onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                        className="w-full bg-[#06477f] text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center group"
                      >
                        <span>View Details</span>
                        <ChevronRight
                          className={`h-5 w-5 ml-2 transition-transform duration-300 ${
                            selectedJob === job.id ? 'rotate-90' : 'group-hover:translate-x-1'
                          }`}
                        />
                      </button>

                      {selectedJob === job.id && (
                        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 animate-in slide-in-from-top duration-300">
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-bold text-gray-800 dark:text-white mb-2">Requirements:</h4>
                              <ul className="space-y-1">
                                {job.requirements.map((req, i) => (
                                  <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                                    <Star className="h-3 w-3 text-[#fec216] mr-2 mt-1 flex-shrink-0" />
                                    {req}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-800 dark:text-white mb-2">Benefits:</h4>
                              <ul className="space-y-1">
                                {job.benefits.map((benefit, i) => (
                                  <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                                    <Star className="h-3 w-3 text-[#fec216] mr-2 mt-1 flex-shrink-0" />
                                    {benefit}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <button
                              type="button"
                              onClick={() => scrollToForm(job.title)}
                              className="w-full bg-[#fec216] text-[#06477f] font-semibold py-3 px-6 rounded-xl hover:bg-[#ffd347] transition-all duration-300 hover:scale-105 flex items-center justify-center group mt-4"
                            >
                              <Send className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                              Apply Now
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Sticky Form */}
              <aside className="self-start lg:sticky lg:top-28">
                <FormCard variant="sidebar" />
              </aside>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              <FormCard variant="center" />
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div
            className={`text-center bg-[#06477f] rounded-3xl p-12 text-white transition-all duration-1000 delay-1100 ${
              isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
            }`}
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Drive Your Career Forward?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join Power Drive Solution and be part of a team that's shaping the future of automotive excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-[#fec216] text-[#06477f] px-8 py-4 rounded-xl font-bold hover:bg-[#ffd347] transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Contact HR Team
              </Link>
              <button
                type="button"
                onClick={() => scrollToForm()}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-[#06477f] transition-all duration-300 hover:scale-105"
              >
                Submit Resume
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Elements */}
      <div
        className="fixed top-20 left-10 w-20 h-20 bg-[#fec216]/10 rounded-full blur-xl animate-bounce opacity-60"
        style={{ animationDelay: '2s' }}
      ></div>
      <div
        className="fixed bottom-20 right-10 w-32 h-32 bg-[#06477f]/10 rounded-full blur-2xl animate-bounce opacity-60"
        style={{ animationDelay: '3s' }}
      ></div>
    </div>
  );
};

export default Career;
 
