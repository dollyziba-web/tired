import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface PortfolioPageProps {
  onStartProject: () => void;
}

const categories = ['All', 'Web', 'Game Dev', 'SaaS', 'Systems'];

const projects = [
  {
    id: 1,
    title: 'LanternGolem Migration',
    category: 'Game Dev',
    image: '/assets/golem.jpg',
    onlineFallback: 'https://picsum.photos/seed/golem/800/1000',
    tags: ['Minecraft Mods', 'System Migration', 'Optimization'],
    desc: 'Migrating complex game systems to stable foundations while preserving original mechanics.',
  },
  {
    id: 2,
    title: 'Wang Fei Voice System',
    category: 'Systems',
    image: '/assets/voice.jpg',
    onlineFallback: 'https://picsum.photos/seed/voice/800/600',
    tags: ['Voice AI', 'Backend Migration', 'Real-time'],
    desc: 'Seamless voice integration for game environments, moving from V1 to V2 infrastructure.',
  },
  {
    id: 3,
    title: 'EcoSphere Dashboard',
    category: 'SaaS',
    image: '/assets/port1.jpg',
    onlineFallback: 'https://picsum.photos/seed/port1/800/1000',
    tags: ['React', 'D3.js', 'Firebase'],
    desc: 'Real-time environmental monitoring platform for global enterprises.',
  },
  {
    id: 4,
    title: 'Nebula OS',
    category: 'Web',
    image: '/assets/port3.jpg',
    onlineFallback: 'https://picsum.photos/seed/port3/800/600',
    tags: ['Next.js', 'Three.js'],
    desc: 'Immersive 3D operating system for browser-based collaboration.',
  },
  {
    id: 5,
    title: 'Pixel Quest',
    category: 'Game Dev',
    image: '/assets/port4.jpg',
    onlineFallback: 'https://picsum.photos/seed/port4/800/1000',
    tags: ['Unity', 'WebGL'],
    desc: 'Massively multiplayer online adventure game built for the open web.',
  },
  {
    id: 6,
    title: 'Atlas CRM',
    category: 'SaaS',
    image: '/assets/port6.jpg',
    onlineFallback: 'https://picsum.photos/seed/port6/800/800',
    tags: ['Node.js', 'PostgreSQL'],
    desc: 'Transforming customer relationships through predictive analytics.',
  },
];

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onStartProject }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header and Filter Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black font-headline tracking-tighter mb-8 leading-[0.92]"
            >
              Selected <br /> Works
            </motion.h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Discover how we&apos;ve helped startups and game developers build world-class digital
              experiences and stable system architectures.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all cursor-pointer border-2 ${
                  selectedCategory === cat
                    ? 'bg-primary border-primary text-white shadow-md'
                    : 'bg-white border-border text-foreground hover:border-primary/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                className="group relative bg-white border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col"
              >
                {/* Image Container */}
                <div className="aspect-[4/3] w-full overflow-hidden relative bg-black/5">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = item.onlineFallback;
                    }}
                  />
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col">
                  <span className="text-xs uppercase font-bold tracking-widest text-primary mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-2xl font-black font-headline mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                    {item.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-border/60">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-background border border-border text-foreground/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA Footer */}
        <div className="mt-24 p-12 bg-secondary text-white rounded-[3rem] text-center flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-black font-headline mb-4">
            Have a project in mind?
          </h2>
          <p className="text-white/70 max-w-lg mb-8 leading-relaxed">
            Let&apos;s build an unforgettable experience that stands the test of scale and time.
          </p>
          <button
            onClick={onStartProject}
            className="px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 text-lg cursor-pointer"
          >
            Start Your Project →
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
