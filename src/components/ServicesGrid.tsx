import React from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  PanelsTopLeft,
  Smartphone,
  Gamepad2,
  Cpu,
  Palette,
  ArrowUpRight,
} from 'lucide-react';

interface ServicesGridProps {
  onViewAllServices: () => void;
  onSelectService?: (serviceName: string) => void;
}

const services = [
  {
    id: '01',
    title: 'Web Development',
    icon: <Globe className="w-8 h-8" />,
    desc: 'Modern, high-performance websites built with React, Next.js, and cutting-edge tech stacks.',
    tags: ['React', 'Next.js', 'Headless CMS'],
  },
  {
    id: '02',
    title: 'Web Applications',
    icon: <PanelsTopLeft className="w-8 h-8" />,
    desc: 'Complex SaaS platforms and enterprise applications designed for scale and security.',
    tags: ['SaaS', 'Full Stack', 'Dashboard'],
  },
  {
    id: '03',
    title: 'Mobile Apps',
    icon: <Smartphone className="w-8 h-8" />,
    desc: 'Native-quality mobile experiences for iOS and Android using Flutter and React Native.',
    tags: ['Flutter', 'React Native', 'iOS/Android'],
  },
  {
    id: '04',
    title: 'Game Development',
    icon: <Gamepad2 className="w-8 h-8" />,
    desc: 'Immersive 2D and 3D digital experiences and games for web and mobile platforms.',
    tags: ['Unity', 'Three.js', '2D/3D'],
  },
  {
    id: '05',
    title: 'AI Automation',
    icon: <Cpu className="w-8 h-8" />,
    desc: 'Integrating intelligent AI agents and automation workflows to streamline your business.',
    tags: ['OpenAI', 'LLMs', 'Automation'],
  },
  {
    id: '06',
    title: 'UI/UX Design',
    icon: <Palette className="w-8 h-8" />,
    desc: 'Strategic design that blends aesthetic beauty with world-class user experience.',
    tags: ['Figma', 'Research', 'Prototyping'],
  },
];

export const ServicesGrid: React.FC<ServicesGridProps> = ({
  onViewAllServices,
  onSelectService,
}) => {
  return (
    <section id="services" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block"
            >
              Our Expertise
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-black font-headline tracking-tighter"
            >
              Building The Infrastructure <br className="hidden sm:inline" /> Of The Future
            </motion.h2>
          </div>

          <button
            onClick={onViewAllServices}
            className="group flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm interactive cursor-pointer py-2 hover:opacity-80 transition-opacity"
          >
            <span>View All Services</span>
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>

        {/* Services Grid (3x2) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border overflow-hidden rounded-3xl border border-border shadow-md">
          {services.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 * index, duration: 0.5 }}
              onClick={() => onSelectService?.(item.title)}
              className="group relative bg-background p-10 flex flex-col min-h-[400px] transition-colors duration-300 hover:bg-secondary interactive overflow-hidden cursor-pointer"
            >
              {/* Icon */}
              <div className="text-secondary group-hover:text-primary transition-colors duration-300 mb-8">
                {item.icon}
              </div>

              {/* Number ID */}
              <span className="text-muted-foreground group-hover:text-white/50 text-sm font-black mb-2 transition-colors duration-300">
                {item.id}
              </span>

              {/* Title */}
              <h3 className="text-3xl font-black font-headline mb-4 group-hover:text-white transition-colors duration-300">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground group-hover:text-white/70 mb-8 transition-colors duration-300 leading-relaxed text-sm md:text-base">
                {item.desc}
              </p>

              {/* Technology Tags */}
              <div className="mt-auto flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full border border-border group-hover:border-white/20 group-hover:text-white/70 transition-colors duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Glowing hover accent in bottom right */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
