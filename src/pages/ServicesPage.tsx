import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  PanelsTopLeft,
  Smartphone,
  Gamepad2,
  Cpu,
  Palette,
  Check,
  ArrowRight,
  Calculator,
} from 'lucide-react';
import { MagneticButton } from '../components/MagneticButton';

interface ServicesPageProps {
  onStartProject: (service?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onStartProject }) => {
  // Calculator state
  const [projectType, setProjectType] = useState<'web' | 'app' | 'mobile' | 'game'>('web');
  const [timeline, setTimeline] = useState<'standard' | 'expedited' | 'rush'>('standard');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['seo']);

  const basePrices = {
    web: 5000,
    app: 10000,
    mobile: 8500,
    game: 15000,
  };

  const timelineMultipliers = {
    standard: 1,
    expedited: 1.25,
    rush: 1.5,
  };

  const addonsList = [
    { id: 'seo', name: 'SEO & Core Web Vitals Optimization', price: 1200 },
    { id: 'ai', name: 'Custom AI / LLM Integration', price: 3500 },
    { id: 'design', name: 'Figma Design System & Brand Guide', price: 2500 },
    { id: 'support', name: '3-Month Priority Maintenance', price: 1800 },
  ];

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const calculateTotal = () => {
    const base = basePrices[projectType];
    const addonTotal = selectedAddons.reduce((acc, curr) => {
      const match = addonsList.find((a) => a.id === curr);
      return acc + (match ? match.price : 0);
    }, 0);
    const subtotal = base + addonTotal;
    return Math.round(subtotal * timelineMultipliers[timeline]);
  };

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Hero */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black font-headline tracking-tighter mb-8 leading-[0.92]"
            >
              Digital <br /> Solutions <br /> Built for Scale
            </motion.h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              From strategic discovery to high-performance development, we offer a comprehensive suite
              of services designed to accelerate your growth.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-[2rem] overflow-hidden border border-border shadow-2xl aspect-video lg:aspect-square bg-white/5"
          >
            <img
              src="/assets/services-concept.jpg"
              alt="Premium digital solutions concept"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://picsum.photos/seed/services-concept/1000/800';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
          </motion.div>
        </div>

        {/* Interactive Project Cost Estimator */}
        <div className="mb-28 bg-[#FDF6E3] border border-border rounded-[3rem] p-8 md:p-14 shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <Calculator className="text-primary w-8 h-8" />
            <h2 className="text-3xl md:text-4xl font-black font-headline tracking-tight">
              Interactive Scope & Cost Estimator
            </h2>
          </div>
          <p className="text-muted-foreground mb-10 max-w-2xl leading-relaxed">
            Configure your technical needs below to see realistic budget and timeline targets for
            enterprise-grade delivery.
          </p>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Options (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              {/* 1. Project Type */}
              <div>
                <h4 className="font-headline font-bold text-lg mb-3">1. Select Architecture</h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'web', name: 'Web Development', desc: 'Starting at $5,000' },
                    { id: 'app', name: 'SaaS Platform', desc: 'Starting at $10,000' },
                    { id: 'mobile', name: 'Mobile App', desc: 'Starting at $8,500' },
                    { id: 'game', name: 'Game / 3D WebGL', desc: 'Starting at $15,000' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setProjectType(t.id as any)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                        projectType === t.id
                          ? 'border-primary bg-primary/10 text-foreground font-bold shadow-sm'
                          : 'border-border bg-white hover:border-primary/50 text-foreground'
                      }`}
                    >
                      <span className="block font-bold text-sm">{t.name}</span>
                      <span className="text-xs text-muted-foreground">{t.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Timeline */}
              <div>
                <h4 className="font-headline font-bold text-lg mb-3">2. Delivery Velocity</h4>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'standard', name: 'Standard', desc: '6–10 weeks' },
                    { id: 'expedited', name: 'Fast-Track', desc: '4–6 weeks' },
                    { id: 'rush', name: 'Sprint / Rush', desc: '2–4 weeks' },
                  ].map((tl) => (
                    <button
                      key={tl.id}
                      onClick={() => setTimeline(tl.id as any)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                        timeline === tl.id
                          ? 'border-primary bg-primary/10 text-foreground font-bold shadow-sm'
                          : 'border-border bg-white hover:border-primary/50 text-foreground'
                      }`}
                    >
                      <span className="block font-bold text-sm">{tl.name}</span>
                      <span className="text-xs text-muted-foreground">{tl.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Add-ons */}
              <div>
                <h4 className="font-headline font-bold text-lg mb-3">3. Specialized Add-ons</h4>
                <div className="space-y-2">
                  {addonsList.map((addon) => {
                    const active = selectedAddons.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          active
                            ? 'border-primary bg-primary/5 font-medium'
                            : 'border-border bg-white hover:border-primary/40'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                              active ? 'bg-primary text-white' : 'border border-border'
                            }`}
                          >
                            {active && <Check size={14} />}
                          </div>
                          <span className="text-sm">{addon.name}</span>
                        </div>
                        <span className="text-xs font-bold text-primary">+${addon.price.toLocaleString()}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Total Summary (5 cols) */}
            <div className="lg:col-span-5 bg-secondary text-white p-8 rounded-3xl shadow-xl flex flex-col justify-between h-full">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2">
                  Estimated Investment
                </span>
                <div className="text-5xl font-black font-headline text-white mb-4">
                  ${calculateTotal().toLocaleString()}
                </div>
                <p className="text-sm text-white/70 mb-6 leading-relaxed">
                  Includes full source code ownership, production-ready CI/CD deployment, architectural
                  documentation, and high-touch engineering communication.
                </p>

                <div className="border-t border-white/10 pt-4 space-y-2 text-xs text-white/80 mb-8">
                  <div className="flex justify-between">
                    <span>Base Stack:</span>
                    <span className="font-bold uppercase">{projectType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pacing:</span>
                    <span className="font-bold uppercase">{timeline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Selected Add-ons:</span>
                    <span className="font-bold">{selectedAddons.length}</span>
                  </div>
                </div>
              </div>

              <MagneticButton
                onClick={() => onStartProject(`Estimate: ${projectType.toUpperCase()} ($${calculateTotal().toLocaleString()})`)}
                className="w-full justify-center"
              >
                Proceed With This Scope <ArrowRight size={18} />
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Detailed Services Catalog */}
        <div className="space-y-16">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">
              Core Disciplines
            </span>
            <h2 className="text-4xl md:text-5xl font-black font-headline">
              Engineering What&apos;s Next
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'High-Performance Web',
                icon: <Globe className="w-8 h-8 text-primary" />,
                desc: 'Next.js 14 and React applications engineered for lightning load times, high SEO scores, and fluid interactivity.',
              },
              {
                title: 'Scalable SaaS Platforms',
                icon: <PanelsTopLeft className="w-8 h-8 text-primary" />,
                desc: 'Multi-tenant cloud architectures, resilient database schemas, and intuitive enterprise dashboard interfaces.',
              },
              {
                title: 'Native Mobile Apps',
                icon: <Smartphone className="w-8 h-8 text-primary" />,
                desc: 'Cross-platform iOS and Android apps with 60fps animations, offline sync, and native device API integrations.',
              },
              {
                title: 'Game & 3D WebGL',
                icon: <Gamepad2 className="w-8 h-8 text-primary" />,
                desc: 'Three.js, Unity WebGL, and custom WebGPU experiences that captivate users and push browser rendering limits.',
              },
              {
                title: 'AI Workflows & Agents',
                icon: <Cpu className="w-8 h-8 text-primary" />,
                desc: 'Integrating autonomous LLM agents, vector embeddings, and real-time inference directly into business processes.',
              },
              {
                title: 'Strategic UI/UX Design',
                icon: <Palette className="w-8 h-8 text-primary" />,
                desc: 'Design systems, interactive prototypes, and conversion-optimized aesthetics that make brands unforgettable.',
              },
            ].map((s, idx) => (
              <div
                key={idx}
                className="bg-white border border-border p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="mb-6">{s.icon}</div>
                <h3 className="text-2xl font-black font-headline mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
