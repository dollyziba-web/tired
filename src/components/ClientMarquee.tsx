import React from 'react';

const logos = [
  'GOOGLE',
  'META',
  'VERCEL',
  'STRIPE',
  'LINEAR',
  'AWS',
  'MICROSOFT',
  'ADOBE',
];

export const ClientMarquee: React.FC = () => {
  return (
    <section className="py-12 bg-background overflow-hidden border-y border-border">
      <div className="flex whitespace-nowrap animate-marquee w-fit">
        <div className="flex gap-20 items-center justify-around min-w-full px-10 pr-20">
          {logos.map((logo, index) => (
            <span
              key={`logo-1-${index}`}
              className="text-3xl font-black font-headline text-muted-foreground/30 hover:text-primary transition-colors cursor-default select-none tracking-wider shrink-0"
            >
              {logo}
            </span>
          ))}
        </div>
        <div className="flex gap-20 items-center justify-around min-w-full px-10 pr-20" aria-hidden="true">
          {logos.map((logo, index) => (
            <span
              key={`logo-2-${index}`}
              className="text-3xl font-black font-headline text-muted-foreground/30 hover:text-primary transition-colors cursor-default select-none tracking-wider shrink-0"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientMarquee;
