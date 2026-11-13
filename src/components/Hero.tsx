import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

interface HeroProps {
  onStartProject: () => void;
  onExploreWork: () => void;
  onScrollDown: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartProject,
  onExploreWork,
  onScrollDown,
}) => {
  const itemVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#233038] to-[#075056] py-28 px-6">
      {/* Background radial gradient glow blobs */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full pt-12">
        {/* Left Column Content */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12 },
            },
          }}
          initial="hidden"
          animate="visible"
          className="text-left"
        >
          {/* Pill Badge */}
          <motion.div
            variants={itemVariant}
            className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-white text-xs font-bold mb-6 tracking-widest uppercase shadow-sm backdrop-blur-sm"
          >
            Team Prospira Modern Agency
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariant}
            className="text-5xl md:text-7xl font-black text-white font-headline leading-[0.92] tracking-tighter mb-8 bg-gradient-to-b from-white via-white to-[#F4D47C] bg-clip-text text-transparent"
          >
            We Build Digital <br /> Products That <br /> Grow Businesses
          </motion.h1>

          {/* Supporting Paragraph */}
          <motion.p
            variants={itemVariant}
            className="text-xl text-white/70 max-w-xl mb-12 font-body leading-relaxed"
          >
            Custom websites, scalable applications, mobile experiences, and immersive digital
            products built for ambitious businesses ready to lead their industries.
          </motion.p>

          {/* Action Buttons */}
          <motion.div variants={itemVariant} className="flex flex-wrap gap-4 items-center">
            <MagneticButton onClick={onStartProject} variant="primary">
              Start Your Project <ArrowRight size={18} />
            </MagneticButton>

            <button
              onClick={onExploreWork}
              className="px-8 py-4 rounded-full font-headline font-bold text-lg text-white border-2 border-white/20 hover:border-white/50 hover:bg-white/10 transition-all cursor-pointer backdrop-blur-sm"
            >
              Explore Our Work
            </button>
          </motion.div>
        </motion.div>

        {/* Right Column: 3D Mockup Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="relative perspective-1000 hidden lg:block"
        >
          <motion.div
            animate={{
              y: [0, -18, 0],
              rotateX: [0, 4, 0],
              rotateY: [0, -4, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative z-10"
          >
            <div className="relative w-full aspect-square bg-gradient-to-tr from-white/10 to-white/5 rounded-3xl border border-white/10 p-8 backdrop-blur-sm overflow-hidden group shadow-2xl">
              {/* Internal glow */}
              <div className="absolute inset-0 bg-primary/20 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700" />

              <div className="relative z-10 h-full w-full flex items-center justify-center">
                <img
                  src="/assets/hero-main.jpeg"
                  alt="Prospira Premium Product Showcase"
                  className="rounded-xl shadow-2xl rotate-3 max-h-[92%] object-contain transition-transform duration-700 group-hover:rotate-1 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to online url if local not yet served
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://www.image2url.com/r2/default/images/1781838217167-7b459953-6484-4588-a66d-d0ce4bcfd872.jpeg';
                  }}
                />

                {/* Floating decorative badge */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-0 right-0 p-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md shadow-lg"
                >
                  <div className="w-12 h-1 bg-primary rounded-full mb-2" />
                  <div className="w-8 h-1 bg-accent rounded-full" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll down indicator arrow */}
      <motion.button
        onClick={onScrollDown}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors cursor-pointer p-2 z-20"
        aria-label="Scroll down to statistics"
      >
        <ChevronDown size={32} />
      </motion.button>
    </section>
  );
};

export default Hero;
