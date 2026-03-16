/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Menu, 
  X, 
  ChevronRight, 
  Star, 
  MapPin, 
  Phone, 
  Clock, 
  Instagram, 
  Facebook, 
  Twitter,
  Award,
  ArrowRight,
  Quote,
  Share2
} from 'lucide-react';

// --- Types ---
interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: 'Appetizers' | 'Main Course' | 'Desserts' | 'Drinks';
}

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  image: string;
}

// --- Mock Data ---
const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    name: "Truffle Burrata",
    description: "Creamy burrata, shaved black truffle, heirloom tomatoes, basil oil.",
    price: "$24",
    image: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&q=80&w=800",
    category: "Appetizers"
  },
  {
    id: 2,
    name: "Wagyu Beef Carpaccio",
    description: "Thinly sliced A5 Wagyu, capers, parmesan crisps, truffle aioli.",
    price: "$32",
    image: "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?auto=format&fit=crop&q=80&w=800",
    category: "Appetizers"
  },
  {
    id: 3,
    name: "Pan-Seared Scallops",
    description: "Hokkaido scallops, cauliflower purée, pancetta, lemon butter.",
    price: "$28",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=800",
    category: "Appetizers"
  },
  {
    id: 4,
    name: "Lobster Thermidor",
    description: "Whole Atlantic lobster, cognac cream sauce, gruyère crust.",
    price: "$68",
    image: "https://images.unsplash.com/photo-1533682805518-48d1f5b8cd3a?auto=format&fit=crop&q=80&w=800",
    category: "Main Course"
  },
  {
    id: 5,
    name: "Dry-Aged Ribeye",
    description: "45-day dry-aged, roasted bone marrow, red wine reduction.",
    price: "$75",
    image: "https://images.unsplash.com/photo-1546241072-48010ad28c2c?auto=format&fit=crop&q=80&w=800",
    category: "Main Course"
  },
  {
    id: 6,
    name: "Wild Mushroom Risotto",
    description: "Arborio rice, porcini, chanterelles, 24-month aged parmesan.",
    price: "$42",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=800",
    category: "Main Course"
  },
  {
    id: 7,
    name: "Gold Leaf Chocolate Dome",
    description: "Valrhona chocolate, hazelnut praline, 24k edible gold leaf.",
    price: "$22",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=800",
    category: "Desserts"
  },
  {
    id: 8,
    name: "Saffron Crème Brûlée",
    description: "Infused with Persian saffron, fresh berries, honeycomb.",
    price: "$18",
    image: "https://images.unsplash.com/photo-1470333738127-014800c2f36c?auto=format&fit=crop&q=80&w=800",
    category: "Desserts"
  },
  {
    id: 9,
    name: "Vintage Old Fashioned",
    description: "Small-batch bourbon, house-made bitters, orange zest.",
    price: "$19",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800",
    category: "Drinks"
  }
];

const REVIEWS: Review[] = [
  {
    id: 1,
    name: "Alexander Wright",
    rating: 5,
    comment: "An absolute masterpiece of culinary art. The Wagyu was life-changing.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 2,
    name: "Sophia Laurent",
    rating: 5,
    comment: "The ambiance is unmatched. Perfect for our anniversary celebration.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 3,
    name: "Marcus Chen",
    rating: 5,
    comment: "Exceptional service and the wine pairing was divine. A must-visit.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
  }
];

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1550966842-2849a2202764?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?auto=format&fit=crop&q=80&w=800"
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reservation', href: '#reservation' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-luxury-black/95 backdrop-blur-xl py-4 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.7)] border-b border-white/10' : 'bg-transparent py-6 border-b border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-display font-bold tracking-widest text-gold"
        >
          L'ÉCLAT
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-sm uppercase tracking-widest hover:text-gold transition-colors duration-300"
            >
              {link.name}
            </motion.a>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 border border-gold text-gold text-xs uppercase tracking-widest hover:bg-gold hover:text-black transition-all duration-300"
          >
            Book Now
          </motion.button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gold">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-luxury-black border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg uppercase tracking-widest hover:text-gold"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section id="home" className="relative h-screen overflow-hidden flex items-center justify-center">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1920" 
          alt="Luxury Restaurant" 
          className="w-full h-full object-cover scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-luxury-black"></div>
      </motion.div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="text-gold uppercase tracking-[0.5em] text-sm mb-4 block">Welcome to Excellence</span>
          <h1 className="text-6xl md:text-8xl font-display mb-6 leading-tight">
            L'Éclat <br />
            <span className="italic font-serif font-light">Gastronomique</span>
          </h1>
          <p className="text-stone-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light tracking-wide">
            Experience the pinnacle of fine dining where culinary art meets timeless elegance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.a
              href="#menu"
              whileHover={{ scale: 1.05, backgroundColor: '#D4AF37', color: '#000' }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 border border-gold text-gold uppercase tracking-widest text-sm transition-all duration-300 w-full sm:w-auto text-center"
            >
              View Menu
            </motion.a>
            <motion.a
              href="#reservation"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 gold-gradient text-black font-bold uppercase tracking-widest text-sm transition-all duration-300 w-full sm:w-auto text-center rounded-sm shadow-lg shadow-gold/20"
            >
              Book A Table
            </motion.a>
          </div>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold/50"
      >
        <div className="w-px h-16 bg-gradient-to-b from-gold to-transparent"></div>
      </motion.div>
    </section>
  );
};

const AnimatedDivider = () => {
  return (
    <div className="w-full flex justify-center py-12">
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "80%", opacity: 1 }}
        viewport={{ once: false }}
        transition={{ 
          duration: 2, 
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
      />
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 px-6 bg-luxury-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative z-10">
            <img 
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800" 
              alt="Chef" 
              className="rounded-2xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 border-2 border-gold/20 -z-0 hidden lg:block"></div>
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="absolute -top-6 -left-6 bg-gold p-6 rounded-full text-black z-20"
          >
            <Award size={32} />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold uppercase tracking-widest text-sm mb-4 block">Our Story</span>
          <h2 className="text-4xl md:text-5xl mb-8">A Legacy of <br /><span className="text-gold italic">Culinary Perfection</span></h2>
          <p className="text-stone-400 leading-relaxed mb-6 text-lg">
            Founded in 1992, L'Éclat Gastronomique has been at the forefront of the culinary scene, blending traditional techniques with modern innovation. Our philosophy is simple: source the finest ingredients and let them speak for themselves.
          </p>
          <p className="text-stone-400 leading-relaxed mb-10">
            Under the direction of Executive Chef Julian Vasseur, our kitchen team creates symphonies of flavor that delight the senses and create lasting memories.
          </p>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-gold text-3xl font-display mb-2">15+</h4>
              <p className="text-xs uppercase tracking-widest text-stone-500">Michelin Stars</p>
            </div>
            <div>
              <h4 className="text-gold text-3xl font-display mb-2">30</h4>
              <p className="text-xs uppercase tracking-widest text-stone-500">Years of Excellence</p>
            </div>
          </div>
        </motion.div>
      </div>
      <AnimatedDivider />
    </section>
  );
};

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState<'Appetizers' | 'Main Course' | 'Desserts' | 'Drinks'>('Main Course');
  const categories: ('Appetizers' | 'Main Course' | 'Desserts' | 'Drinks')[] = ['Appetizers', 'Main Course', 'Desserts', 'Drinks'];

  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-24 px-6 bg-stone-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gold uppercase tracking-widest text-sm mb-4 block"
          >
            Exquisite Selection
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl mb-8"
          >
            The Menu
          </motion.h2>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-sm uppercase tracking-[0.2em] pb-2 transition-all duration-300 border-b-2 ${activeCategory === cat ? 'border-gold text-gold' : 'border-transparent text-stone-500 hover:text-stone-300'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence mode="wait">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -12 }}
                transition={{ duration: 0.4 }}
                className="group glass-morphism rounded-2xl overflow-hidden hover:border-gold/40 transition-all duration-500 hover:shadow-[0_20px_50px_-20px_rgba(212,175,55,0.3)]"
              >
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-115"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <div className="bg-luxury-black/80 backdrop-blur-md px-4 py-1 rounded-full border border-white/10">
                      <span className="text-gold font-display">{item.price}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (navigator.share) {
                          navigator.share({
                            title: item.name,
                            text: `Check out this exquisite dish at L'Éclat Gastronomique: ${item.name} - ${item.description}`,
                            url: window.location.href,
                          }).catch(console.error);
                        } else {
                          alert(`Sharing: ${item.name}`);
                        }
                      }}
                      className="w-10 h-10 rounded-full bg-luxury-black/80 backdrop-blur-md flex items-center justify-center text-gold border border-white/10 hover:border-gold/50 transition-all opacity-0 group-hover:opacity-100"
                      title="Share this dish"
                    >
                      <Share2 size={16} />
                    </motion.button>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl mb-3 group-hover:text-gold transition-colors">{item.name}</h3>
                  <p className="text-stone-400 text-sm leading-relaxed font-light">
                    {item.description}
                  </p>
                  <motion.button 
                    whileHover={{ x: 5 }}
                    className="mt-6 flex items-center text-xs uppercase tracking-widest text-gold font-semibold"
                  >
                    View Details <ChevronRight size={14} className="ml-1" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const FeaturedDishes = () => {
  return (
    <section className="py-24 px-6 bg-luxury-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-gold uppercase tracking-widest text-sm mb-4 block">Chef's Recommendations</span>
            <h2 className="text-5xl">Signature <span className="italic text-gold">Creations</span></h2>
          </div>
          <button className="flex items-center text-gold uppercase tracking-widest text-sm group">
            Explore Full Menu <ArrowRight size={18} className="ml-2 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative group cursor-pointer h-[600px] rounded-3xl overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1546241072-48010ad28c2c?auto=format&fit=crop&q=80&w=1200" 
              alt="Signature Dish" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
            <div className="absolute bottom-10 left-10 right-10">
              <span className="text-gold text-xs uppercase tracking-[0.3em] mb-2 block">Best Seller</span>
              <h3 className="text-4xl mb-4">The Grand Ribeye</h3>
              <p className="text-stone-300 text-sm max-w-md mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                A masterpiece of flavor, aged for 45 days and served with our secret red wine reduction.
              </p>
              <div className="flex items-center text-gold">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <span className="ml-2 text-xs text-white/60">(120+ Reviews)</span>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative group cursor-pointer h-[275px] rounded-3xl overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1533682805518-48d1f5b8cd3a?auto=format&fit=crop&q=80&w=800" 
                alt="Signature Dish" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-8 left-8">
                <h3 className="text-2xl mb-2">Atlantic Lobster</h3>
                <p className="text-gold font-display">$68</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="relative group cursor-pointer h-[275px] rounded-3xl overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=800" 
                alt="Signature Dish" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-8 left-8">
                <h3 className="text-2xl mb-2">Gold Chocolate Dome</h3>
                <p className="text-gold font-display">$22</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <AnimatedDivider />
    </section>
  );
};

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-24 px-6 bg-stone-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-gold uppercase tracking-widest text-sm mb-4 block">Visual Journey</span>
          <h2 className="text-5xl mb-4">Our Gallery</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY_IMAGES.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.8, 
                delay: (index % 3) * 0.1,
                ease: [0.21, 0.47, 0.32, 0.98] 
              }}
              onClick={() => setSelectedImage(img)}
              className="aspect-square cursor-pointer overflow-hidden rounded-xl relative group"
            >
              <img 
                src={img} 
                alt={`Gallery ${index}`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gold/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black">
                  <ChevronRight size={24} />
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (navigator.share) {
                    navigator.share({
                      title: "L'Éclat Gastronomique Gallery",
                      text: "Check out this beautiful atmosphere at L'Éclat Gastronomique.",
                      url: window.location.href,
                    }).catch(console.error);
                  } else {
                    alert("Sharing this gallery image!");
                  }
                }}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity border border-white/20 hover:border-gold/50"
                title="Share image"
              >
                <Share2 size={16} />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6"
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selectedImage}
              className="max-w-full max-h-full rounded-2xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <button className="absolute top-10 right-10 text-white hover:text-gold transition-colors">
              <X size={40} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Reservation = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: '2'
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In addition to the alert as requested
    alert('Reservation Request Sent! We will contact you shortly.');
    setShowConfirmation(true);
  };

  return (
    <section id="reservation" className="py-24 px-6 bg-luxury-black relative">
      <div className="absolute inset-0 opacity-10 parallax-bg" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1550966842-2849a2202764?auto=format&fit=crop&q=80&w=1920")' }}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gold uppercase tracking-widest text-sm mb-4 block">Book A Table</span>
            <h2 className="text-5xl md:text-6xl mb-8">Reserve Your <br /><span className="italic text-gold">Experience</span></h2>
            <p className="text-stone-400 text-lg mb-10 leading-relaxed">
              Secure your spot at L'Éclat Gastronomique. For parties larger than 8, please contact us directly via phone.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-stone-500">Call Us</p>
                  <p className="text-xl">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-stone-500">Opening Hours</p>
                  <p className="text-xl">Mon - Sun: 5:00 PM - 11:00 PM</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-morphism p-10 md:p-14 rounded-3xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-stone-400">Full Name</label>
                  <motion.input 
                    whileFocus={{ scale: 1.02 }}
                    type="text" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-stone-400">Phone Number</label>
                  <motion.input 
                    whileFocus={{ scale: 1.02 }}
                    type="tel" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-stone-400">Date</label>
                  <div className="relative">
                    <motion.input 
                      whileFocus={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      type="date" 
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-stone-400">Time</label>
                  <motion.input 
                    whileFocus={{ scale: 1.02 }}
                    type="time" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-stone-400">Number of Guests</label>
                <select 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-colors appearance-none"
                  value={formData.guests}
                  onChange={(e) => setFormData({...formData, guests: e.target.value})}
                >
                  {[1,2,3,4,5,6,7,8].map(n => (
                    <option key={n} value={n} className="bg-stone-900">{n} Guests</option>
                  ))}
                </select>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 gold-gradient text-black font-bold uppercase tracking-widest rounded-lg mt-4 shadow-lg shadow-gold/20"
              >
                Confirm Reservation
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-morphism p-12 rounded-3xl max-w-lg w-full text-center relative border border-gold/30"
            >
              <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center text-gold mx-auto mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                >
                  <Star size={40} fill="currentColor" />
                </motion.div>
              </div>
              <h3 className="text-4xl mb-4 font-display">Reservation <span className="italic text-gold">Confirmed</span></h3>
              <p className="text-stone-400 mb-10 leading-relaxed">
                Thank you, <span className="text-white font-medium">{formData.name}</span>. Your request for <span className="text-white font-medium">{formData.guests} guests</span> on <span className="text-white font-medium">{formData.date}</span> at <span className="text-white font-medium">{formData.time}</span> has been received. We will contact you shortly to finalize your experience.
              </p>
              <button 
                onClick={() => setShowConfirmation(false)}
                className="w-full py-4 border border-gold text-gold uppercase tracking-[0.2em] text-sm hover:bg-gold hover:text-black transition-all duration-300 rounded-lg"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 px-6 bg-stone-950">
      <div className="max-w-4xl mx-auto text-center">
        <Quote className="text-gold/20 mx-auto mb-8" size={64} />
        
        <div className="relative h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <div className="flex justify-center mb-6">
                {[...Array(REVIEWS[currentIndex].rating)].map((_, i) => (
                  <Star key={i} size={20} fill="#D4AF37" className="text-gold" />
                ))}
              </div>
              <p className="text-2xl md:text-3xl font-serif italic mb-10 leading-relaxed text-stone-200">
                "{REVIEWS[currentIndex].comment}"
              </p>
              <div className="flex items-center justify-center gap-4">
                <img 
                  src={REVIEWS[currentIndex].image} 
                  alt={REVIEWS[currentIndex].name} 
                  className="w-16 h-16 rounded-full border-2 border-gold"
                  referrerPolicy="no-referrer"
                />
                <div className="text-left">
                  <h4 className="font-bold tracking-widest uppercase text-sm">{REVIEWS[currentIndex].name}</h4>
                  <p className="text-stone-500 text-xs uppercase tracking-widest">Verified Guest</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-3 mt-12">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === i ? 'w-8 bg-gold' : 'bg-stone-700'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-luxury-black pt-24 pb-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <h3 className="text-3xl font-display font-bold tracking-widest text-gold">L'ÉCLAT</h3>
            <p className="text-stone-500 leading-relaxed">
              Elevating the dining experience through passion, precision, and the pursuit of perfection.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-stone-400 hover:text-gold transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-stone-400 hover:text-gold transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-stone-400 hover:text-gold transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-[0.3em] text-gold mb-8">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#home" className="text-stone-500 hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="text-stone-500 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#menu" className="text-stone-500 hover:text-white transition-colors">Our Menu</a></li>
              <li><a href="#reservation" className="text-stone-500 hover:text-white transition-colors">Reservations</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-[0.3em] text-gold mb-8">Contact Info</h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <MapPin size={20} className="text-gold shrink-0" />
                <span className="text-stone-500">123 Gastronomy Blvd, <br />Paris, France 75001</span>
              </li>
              <li className="flex gap-4">
                <Phone size={20} className="text-gold shrink-0" />
                <span className="text-stone-500">+1 (555) 123-4567</span>
              </li>
              <li className="flex gap-4">
                <Clock size={20} className="text-gold shrink-0" />
                <span className="text-stone-500">Mon - Sun: 5pm - 11pm</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-[0.3em] text-gold mb-8">Newsletter</h4>
            <p className="text-stone-500 mb-6">Join our mailing list for exclusive events and menu updates.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-white/5 border border-white/10 rounded-l-lg px-4 py-3 w-full focus:outline-none focus:border-gold transition-colors"
              />
              <button className="bg-gold text-black px-4 rounded-r-lg hover:bg-gold-light transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 text-center">
          <p className="text-stone-600 text-sm">
            © {new Date().getFullYear()} L'Éclat Gastronomique. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="relative">
      <Navbar />
      <Hero />
      <About />
      <FeaturedDishes />
      <MenuSection />
      <Gallery />
      <Reservation />
      <Testimonials />
      <Footer />
    </div>
  );
}
