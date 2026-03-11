import React, { useState, useEffect, createContext, useContext } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Star, 
  CheckCircle2, 
  ChevronRight, 
  Menu, 
  X, 
  MessageCircle,
  Calendar,
  Shield,
  Award,
  Users,
  Instagram,
  Facebook,
  Twitter,
  ArrowRight,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { translations } from './translations';

// --- Language Context ---

type Language = 'en' | 'te';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.services, href: '#services' },
    { name: t.nav.reviews, href: '#reviews' },
    { name: t.nav.contact, href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
            <Shield className="text-white w-6 h-6" />
          </div>
          <span className={`font-display font-bold text-xl tracking-tight text-slate-900`}>
            Advanced<span className="text-blue-600">Dental</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              {link.name}
            </a>
          ))}
          
          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-full border border-slate-200">
            <button 
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${language === 'en' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage('te')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${language === 'te' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              తెలుగు
            </button>
          </div>

          <a 
            href="#appointment" 
            className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            {t.nav.book}
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200">
            <button 
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded-full text-[10px] font-bold transition-all ${language === 'en' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage('te')}
              className={`px-2 py-1 rounded-full text-[10px] font-bold transition-all ${language === 'te' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
            >
              తె
            </button>
          </div>
          <button className="text-slate-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-slate-700 hover:text-blue-600"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#appointment" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl text-center font-semibold"
            >
              {t.nav.book}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { t } = useLanguage();
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-50">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50 rounded-l-[100px] -z-10 hidden lg:block"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold mb-6">
            <Award size={16} />
            <span>{t.hero.badge}</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-display font-bold text-slate-900 leading-[1.1] mb-6">
            {t.hero.title} <br />
            <span className="text-blue-600">{t.hero.subtitle}</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-lg leading-relaxed">
            {t.hero.desc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#appointment" className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-2 group">
              {t.hero.book}
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </a>
            <a href="#services" className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              {t.hero.services}
            </a>
          </div>
          
          <div className="mt-12 flex items-center gap-8">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <img 
                  key={i}
                  src={`https://picsum.photos/seed/user${i}/100/100`} 
                  alt="User" 
                  className="w-12 h-12 rounded-full border-4 border-white object-cover"
                  referrerPolicy="no-referrer"
                />
              ))}
              <div className="w-12 h-12 rounded-full border-4 border-white bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                +2k
              </div>
            </div>
            <div>
              <div className="flex text-yellow-400 mb-1">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-sm text-slate-500 font-medium">{t.hero.trusted}</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1000" 
              alt="Modern Dental Clinic" 
              className="w-full h-[600px] object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Floating Stats Card */}
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-2xl z-20 flex items-center gap-4 border border-slate-100">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">99%</p>
              <p className="text-sm text-slate-500 font-medium">{t.hero.success}</p>
            </div>
          </div>
          {/* Floating Doctor Card */}
          <div className="absolute top-12 -right-6 bg-white p-4 rounded-2xl shadow-2xl z-20 flex items-center gap-3 border border-slate-100 max-w-[200px]">
             <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <Users size={20} />
             </div>
             <p className="text-xs font-semibold text-slate-700 leading-tight">Expert Doctors & Specialized Care</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const AboutDoctor = () => {
  const { t } = useLanguage();
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71f153678f?auto=format&fit=crop&q=80&w=800" 
                alt="Dr. Sharma" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-blue-600 text-white p-10 rounded-[40px] shadow-2xl hidden md:block">
              <p className="text-4xl font-bold mb-1">10+</p>
              <p className="text-sm font-medium opacity-80">{t.about.exp}</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4">{t.about.badge}</p>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-6">{t.about.name}</h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              {t.about.desc}
            </p>
            
            <div className="space-y-6 mb-10">
              {t.about.specialties.map((item: any, i: number) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-all flex items-center gap-2">
              {t.about.learnMore}
              <ChevronRight size={20} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const { t } = useLanguage();
  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4">{t.services.badge}</p>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-6">{t.services.title}</h2>
          <p className="text-slate-600 text-lg">
            {t.services.desc}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.services.items.map((service: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[32px] shadow-sm hover:shadow-xl transition-all border border-slate-100 group"
            >
              <div className="text-4xl mb-6 bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                <span className="group-hover:hidden">{service.icon}</span>
                <Shield className="hidden group-hover:block text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-500 mb-6 leading-relaxed">{service.desc}</p>
              <a href="#appointment" className="text-blue-600 font-bold flex items-center gap-1 hover:gap-2 transition-all">
                {t.services.learnMore} <ChevronRight size={18} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const { t } = useLanguage();
  const photos = [
    { url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800', title: t.gallery.photos[0].title },
    { url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800', title: t.gallery.photos[1].title },
    { url: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800', title: t.gallery.photos[2].title }
  ];

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4">{t.gallery.badge}</p>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-6">{t.gallery.title}</h2>
          <p className="text-slate-600 text-lg">
            {t.gallery.desc}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {photos.map((photo, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative group rounded-[32px] overflow-hidden shadow-xl aspect-square"
            >
              <img 
                src={photo.url} 
                alt={photo.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                <p className="text-white font-bold text-xl">{photo.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Reviews = () => {
  const { t } = useLanguage();
  return (
    <section id="reviews" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <p className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4">{t.reviews.badge}</p>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-6">{t.reviews.title}</h2>
            <p className="text-slate-600 text-lg">
              {t.reviews.desc}
            </p>
          </div>
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-center gap-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-slate-900">4.9</p>
              <div className="flex text-yellow-400 justify-center">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-xs text-slate-500 mt-1 font-bold">{t.reviews.rating}</p>
            </div>
            <div className="h-12 w-px bg-slate-200"></div>
            <div>
              <p className="text-sm font-bold text-slate-900">500+ Reviews</p>
              <p className="text-xs text-slate-500">{t.reviews.verified}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.reviews.items.map((review: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-slate-50 p-8 rounded-[32px] border border-slate-100"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{review.name}</h4>
                  <p className="text-xs text-slate-400">{review.date}</p>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-4">
                {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-slate-600 italic leading-relaxed">"{review.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Appointment = () => {
  const { t } = useLanguage();
  return (
    <section id="appointment" className="py-24 bg-blue-600 relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-white">
            <h2 className="text-4xl lg:text-6xl font-display font-bold mb-8 leading-tight">
              {t.appointment.title}
            </h2>
            <p className="text-blue-100 text-xl mb-12 leading-relaxed">
              {t.appointment.desc}
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                  <Phone className="text-white" />
                </div>
                <div>
                  <p className="text-blue-200 text-sm font-medium">{t.appointment.call}</p>
                  <p className="text-2xl font-bold">+91 90592 29024</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                  <Clock className="text-white" />
                </div>
                <div>
                  <p className="text-blue-200 text-sm font-medium">{t.appointment.hours}</p>
                  <p className="text-2xl font-bold">{t.appointment.hoursDetail}</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-[40px] shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-8">{t.appointment.formTitle}</h3>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{t.appointment.name}</label>
                  <input type="text" placeholder="John Doe" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{t.appointment.phone}</label>
                  <input type="tel" placeholder="+91 90592 29024" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">{t.appointment.service}</label>
                <select className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all appearance-none">
                  {t.services.items.map((s: any) => (
                    <option key={s.title}>{s.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">{t.appointment.date}</label>
                <input type="date" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all" />
              </div>
              <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 mt-4">
                {t.appointment.confirm}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const { t } = useLanguage();
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4">{t.contact.badge}</p>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-8">{t.contact.title}</h2>
            
            <div className="space-y-10">
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg mb-1">{t.contact.location}</h4>
                  <p className="text-slate-500">{t.contact.address}</p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg mb-1">{t.contact.phone}</h4>
                  <p className="text-slate-500">+91 90592 29024</p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg mb-1">{t.contact.email}</h4>
                  <p className="text-slate-500">info@advanceddental.com</p>
                  <p className="text-slate-500">appointments@advanceddental.com</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-8 bg-slate-900 rounded-[32px] text-white">
              <h4 className="font-bold text-xl mb-6 flex items-center gap-2">
                <Clock size={20} className="text-blue-400" />
                {t.contact.hours}
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="opacity-70">{t.contact.monFri}</span>
                  <span className="font-bold">09:00 AM - 08:00 PM</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="opacity-70">{t.contact.sat}</span>
                  <span className="font-bold">10:00 AM - 06:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">{t.contact.sun}</span>
                  <span className="text-blue-400 font-bold uppercase">{t.contact.closed}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="h-full min-h-[500px] rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.2233913120413!2d77.03307137550508!3d28.45547267576185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19d582e38859%3A0x2cf5fa7275761b3!2sGurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1709800000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-slate-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <a href="#home" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Shield className="text-white w-6 h-6" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-slate-900">
                Advanced<span className="text-blue-600">Dental</span>
              </span>
            </a>
            <p className="text-slate-500 leading-relaxed mb-8">
              {t.footer.desc}
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">{t.footer.links}</h4>
            <ul className="space-y-4">
              {[t.nav.home, t.nav.about, t.nav.services, t.nav.reviews, t.nav.contact].map(link => (
                <li key={link}>
                  <a href="#" className="text-slate-500 hover:text-blue-600 transition-all flex items-center gap-2">
                    <ChevronRight size={14} /> {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">{t.footer.services}</h4>
            <ul className="space-y-4">
              {t.services.items.slice(0, 5).map((service: any) => (
                <li key={service.title}>
                  <a href="#" className="text-slate-500 hover:text-blue-600 transition-all flex items-center gap-2">
                    <ChevronRight size={14} /> {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">{t.footer.newsletter}</h4>
            <p className="text-slate-500 text-sm mb-6">{t.footer.newsletterDesc}</p>
            <div className="relative">
              <input type="email" placeholder="Email Address" className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600" />
              <button className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-4 rounded-xl hover:bg-blue-700 transition-all">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-sm">{t.footer.rights}</p>
          <div className="flex gap-8">
            <a href="#" className="text-slate-400 text-sm hover:text-slate-600">Privacy Policy</a>
            <a href="#" className="text-slate-400 text-sm hover:text-slate-600">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FloatingButtons = () => {
  return (
    <>
      <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-4">
        <motion.a 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href="https://wa.me/919059229024" 
          target="_blank"
          className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-200 group"
        >
          <MessageCircle size={32} />
          <span className="absolute right-full mr-4 bg-white text-slate-900 px-3 py-1 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity shadow-xl border border-slate-100 pointer-events-none">
            WhatsApp
          </span>
        </motion.a>
        <motion.a 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href="tel:+919059229024" 
          className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-blue-200 group"
        >
          <Phone size={28} />
          <span className="absolute right-full mr-4 bg-white text-slate-900 px-3 py-1 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity shadow-xl border border-slate-100 pointer-events-none">
            Call Now
          </span>
        </motion.a>
      </div>
    </>
  );
};

// --- Main App ---

export default function App() {
  const [language, setLanguage] = useState<Language>('en');

  const value = {
    language,
    setLanguage,
    t: translations[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      <div className="relative">
        <Navbar />
        <Hero />
        <AboutDoctor />
        <Services />
        <Gallery />
        <Reviews />
        <Appointment />
        <Contact />
        <Footer />
        <FloatingButtons />
      </div>
    </LanguageContext.Provider>
  );
}
