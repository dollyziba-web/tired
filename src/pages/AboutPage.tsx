import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Layers, Flame, ArrowRight } from 'lucide-react';
import { MagneticButton } from '../components/MagneticButton';

interface AboutPageProps {
  onStartProject: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onStartProject }) => {
  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Philosophy Hero */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
              Our Philosophy
            </span>
            <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tighter mb-8 leading-[0.92]">
              More Than <br /> Migration, <br /> Evolution
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-6 font-medium">
              We specialize in preserving the identity of digital products while rebuilding them on
              cleaner, more stable foundations.
            </p>
            <p className="text-lg text-muted-foreground/80 leading-relaxed font-body">
              Whether it's migrating Minecraft ecosystems like LanternGolem or moving enterprise voice
              systems like Wang Fei from V1 to V2, our mission is to ensure that technical upgrades
              feel seamless to the user and effortless for the developer.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-[2rem] overflow-hidden border border-border shadow-2xl aspect-square bg-white/5"
          >
            <img
              src="/assets/innovation.jpg"
              alt="Digital Innovation and System Evolution"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://picsum.photos/seed/innovation/800/800';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
          </motion.div>
        </div>

        {/* Pillars / Values */}
        <div className="mb-32">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">
              Guiding Principles
            </span>
            <h2 className="text-4xl md:text-5xl font-black font-headline">
              Why Ambitious Teams Choose Prospira
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <ShieldCheck className="w-10 h-10 text-primary" />,
                title: '100% Transparency',
                desc: 'No black box development. You get live staging URLs, direct Slack/Discord access to senior engineers, and complete repository visibility.',
              },
              {
                icon: <Layers className="w-10 h-10 text-primary" />,
                title: 'Modern Stack First',
                desc: 'We construct architectures on battle-tested frameworks—React, Next.js, TypeScript, Tailwind, and edge computing—that keep you ahead for years.',
              },
              {
                icon: <Flame className="w-10 h-10 text-primary" />,
                title: 'Zero Tech Debt Tolerance',
                desc: "We don't take shortcuts. Every component, database query, and animation is written with obsessive craftsmanship and long-term scalability.",
              },
            ].map((pillar, idx) => (
              <div
                key={idx}
                className="bg-[#FDF6E3] border border-border p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all"
              >
                <div className="mb-6">{pillar.icon}</div>
                <h3 className="text-2xl font-black font-headline mb-4">{pillar.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-[2.5rem] overflow-hidden border border-border shadow-2xl aspect-video">
              <img
                src="/assets/team.jpg"
                alt="Prospira Collaborative Workspace"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://picsum.photos/seed/team/1200/600';
                }}
              />
              <div className="absolute inset-0 bg-secondary/20 pointer-events-none" />
            </div>

            <div>
              <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">
                The Collective
              </span>
              <h2 className="text-4xl md:text-5xl font-black font-headline mb-6">
                Engineers, Designers & Digital Strategists
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base mb-6">
                Prospira is composed of senior software engineers, 3D interactive developers, and
                product designers who have launched digital experiences used by millions globally.
              </p>
              <p className="text-muted-foreground leading-relaxed text-base mb-8">
                We work as an integrated high-bandwidth partner alongside your team, taking total
                technical ownership so you can focus on brand, customer acquisition, and growth.
              </p>

              <MagneticButton onClick={onStartProject} variant="primary">
                Collaborate With Us <ArrowRight size={18} />
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
