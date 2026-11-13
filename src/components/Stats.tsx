import React, { useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';

interface StatItemProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

const StatCounter: React.FC<StatItemProps> = ({ value, label, suffix = '', prefix = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: 1.8,
        ease: 'easeOut',
      });
      return controls.stop;
    }
  }, [isInView, value, count]);

  return (
    <div ref={ref} className="text-center group">
      <div className="text-5xl md:text-7xl font-black font-headline text-primary mb-2 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
        {prefix && <span>{prefix}</span>}
        <motion.span>{rounded}</motion.span>
        <span>{suffix}</span>
      </div>
      <p className="text-foreground/80 font-bold uppercase tracking-widest text-[11px] md:text-xs">
        {label}
      </p>
    </div>
  );
};

export const Stats: React.FC = () => {
  return (
    <section id="stats" className="py-20 bg-background relative z-10 -mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#FDF6E3] border border-border rounded-[3rem] p-12 shadow-2xl"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <StatCounter value={6} label="PROJECTS DELIVERED" suffix="+" />
            <StatCounter value={0} label="YEARS EXPERIENCE" suffix="+" />
            <StatCounter value={0} label="TECHNOLOGIES" suffix="+" />
            <StatCounter value={2} label="CLIENT FOCUSED" suffix="%" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
