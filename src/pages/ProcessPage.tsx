import React from 'react';
import { motion } from 'framer-motion';
import { Search, Compass, Palette, Code2, Rocket, ArrowRight } from 'lucide-react';
import { MagneticButton } from '../components/MagneticButton';

interface ProcessPageProps {
  onStartProject: () => void;
}

const steps = [
  {
    number: '01',
    title: 'Discovery',
    desc: 'We dive deep into your business, goals, and user needs to define the project foundation.',
    icon: <Search className="w-8 h-8" />,
    color: 'bg-primary text-white',
    badge: 'Research & Scoping',
    deliverables: ['Stakeholder Interviews', 'User Personas & Journeys', 'Technical Feasibility Audit'],
  },
  {
    number: '02',
    title: 'Strategy',
    desc: 'Developing a technical roadmap and product architecture optimized for growth and scale.',
    icon: <Compass className="w-8 h-8" />,
    color: 'bg-accent text-secondary',
    badge: 'Architecture & Planning',
    deliverables: ['Cloud Infrastructure Blueprint', 'Database Schema Modeling', 'Milestone & Risk Roadmap'],
  },
  {
    number: '03',
    title: 'Design',
    desc: 'Crafting a world-class UI/UX that balances beauty with functional excellence.',
    icon: <Palette className="w-8 h-8" />,
    color: 'bg-secondary text-white',
    badge: 'Interactive Prototyping',
    deliverables: ['Design Systems & Component Tokens', 'High-Fidelity Figma Prototypes', 'Micro-Interactions & Motion'],
  },
  {
    number: '04',
    title: 'Development',
    desc: 'Our engineers build your product using high-performance, future-proof technologies.',
    icon: <Code2 className="w-8 h-8" />,
    color: 'bg-primary text-white',
    badge: 'Precision Engineering',
    deliverables: ['Clean, Type-Safe React/Next.js Code', 'Unit & End-to-End Test Coverage', 'Sub-100ms API Response Tuning'],
  },
  {
    number: '05',
    title: 'Launch',
    desc: 'Deployment, optimization, and scaling. We ensure your product hits the ground running.',
    icon: <Rocket className="w-8 h-8" />,
    color: 'bg-accent text-secondary',
    badge: 'Go-Live & Scaling',
    deliverables: ['Global CDN / Edge Deployment', 'Analytics & Monitoring Setup', 'Post-Launch Hypercare & Handover'],
  },
];

export const ProcessPage: React.FC<ProcessPageProps> = ({ onStartProject }) => {
  return (
    <div className="pt-32 pb-24 bg-background overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-24">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block"
          >
            The Prospira Way
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black font-headline tracking-tighter mb-8 leading-[0.92]"
          >
            How We Build <br /> Excellence
          </motion.h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A disciplined, milestone-driven development process that removes ambiguity and delivers
            world-class digital products predictably.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line through center on desktop */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-border hidden lg:block" />

          <div className="space-y-24 relative z-10">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6 }}
                  className={`flex flex-col lg:flex-row items-center gap-12 ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Text card (flex-1) */}
                  <div
                    className={`flex-1 w-full text-center ${
                      isEven ? 'lg:text-right' : 'lg:text-left'
                    }`}
                  >
                    <div className="inline-flex items-center justify-center p-6 rounded-3xl bg-primary text-white mb-6 lg:hidden shadow-xl">
                      {step.icon}
                    </div>
                    <span className="text-xs uppercase font-bold tracking-widest text-primary block mb-2">
                      Phase {step.number} — {step.badge}
                    </span>
                    <h2 className="text-4xl font-black font-headline mb-4">{step.title}</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-md mx-auto lg:mx-0 mb-6">
                      {step.desc}
                    </p>

                    <div
                      className={`flex flex-wrap gap-2 justify-center ${
                        isEven ? 'lg:justify-end' : 'lg:justify-start'
                      }`}
                    >
                      {step.deliverables.map((item) => (
                        <span
                          key={item}
                          className="text-xs font-semibold px-3 py-1 bg-white border border-border rounded-full text-foreground/80 shadow-xs"
                        >
                          ✓ {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Center Node Icon (Hidden on mobile, centered on desktop) */}
                  <div className="hidden lg:flex w-24 h-24 rounded-full bg-background border-4 border-white shadow-2xl items-center justify-center shrink-0 z-20 transition-transform duration-500 hover:scale-110">
                    <div
                      className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center shadow-inner`}
                    >
                      {step.icon}
                    </div>
                  </div>

                  {/* Visual / Details card placeholder on the other side */}
                  <div className="flex-1 w-full">
                    <div className="p-8 bg-[#FDF6E3] border border-border rounded-3xl shadow-sm hover:shadow-lg transition-all">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-headline font-bold text-sm uppercase tracking-wider text-muted-foreground">
                          Execution Focus
                        </span>
                        <span className="font-headline font-black text-2xl text-primary">
                          {step.number}
                        </span>
                      </div>
                      <div className="space-y-3">
                        <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all duration-1000"
                            style={{ width: `${(idx + 1) * 20}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground italic">
                          Milestone completion criteria rigorously checked against technical benchmarks before progression.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Process CTA */}
        <div className="mt-32 text-center bg-secondary text-white p-14 rounded-[3rem] shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-black font-headline mb-6">
            Ready to experience a seamless build?
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-10 text-lg leading-relaxed">
            Schedule an intro call with our principal architect to discuss timelines, specifications, and scope.
          </p>
          <MagneticButton onClick={onStartProject} variant="primary">
            Start Your Project <ArrowRight size={20} />
          </MagneticButton>
        </div>
      </div>
    </div>
  );
};

export default ProcessPage;
