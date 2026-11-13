import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

interface CtaSectionProps {
  onStartProject: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onStartProject }) => {
  return (
    <section className="py-24 px-6 bg-secondary text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-5xl md:text-7xl font-black font-headline tracking-tighter mb-8 leading-[0.92]">
            Ready to Build Something <br className="hidden sm:inline" /> Exceptional?
          </h2>

          <p className="text-xl text-white/60 mb-12 max-w-lg leading-relaxed font-body">
            We help visionary companies design and develop premium digital products.
            Whether you&apos;re a startup or an enterprise, we bring your ideas to life.
          </p>

          <div className="flex gap-6">
            <MagneticButton
              onClick={onStartProject}
              variant="primary"
              className="shadow-2xl shadow-primary/30"
            >
              Start Project <ArrowRight size={20} />
            </MagneticButton>
          </div>
        </motion.div>

        {/* Right Column Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative group"
        >
          {/* Background glow blur */}
          <div className="absolute inset-0 bg-primary blur-[120px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" />

          {/* Visual Container */}
          <div className="relative rounded-[2rem] overflow-hidden border border-white/10 aspect-video shadow-2xl bg-white/5 backdrop-blur-sm">
            <img
              src="/assets/cta-visual.jpg"
              alt="Digital Product"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://picsum.photos/seed/cta-visual/1200/800';
              }}
            />
            {/* Subtle inner gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
