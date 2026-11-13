import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 5000);
  };

  const handleLink = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#233038] text-white py-20 px-6 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Main 4-column footer */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Column 1: Brand */}
          <div className="col-span-1 lg:col-span-1">
            <a
              href="/"
              onClick={(e) => handleLink(e, '/')}
              className="font-headline font-black text-3xl tracking-tighter mb-6 block interactive hover:text-primary transition-colors"
            >
              PROSPIRA
            </a>
            <p className="text-white/60 mb-8 max-w-xs leading-relaxed font-body text-sm md:text-base">
              A premium digital agency specializing in high-performance websites, applications, and
              future-forward digital products.
            </p>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="font-headline font-bold text-lg mb-6">Services</h4>
            <ul className="space-y-4">
              {[
                'Web Development',
                'Mobile Applications',
                'UI/UX Design',
                'SaaS Platforms',
                'Game Development',
                'AI Solutions',
              ].map((service) => (
                <li key={service}>
                  <a
                    href="/services"
                    onClick={(e) => handleLink(e, '/services')}
                    className="text-white/60 hover:text-primary transition-colors text-sm md:text-base interactive"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Agency */}
          <div>
            <h4 className="font-headline font-bold text-lg mb-6">Agency</h4>
            <ul className="space-y-4">
              {[
                { name: 'Our Work', path: '/portfolio' },
                { name: 'About Us', path: '/about' },
                { name: 'Our Process', path: '/process' },
                { name: 'Careers', path: '/contact' },
                { name: 'Contact', path: '/contact' },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.path}
                    onClick={(e) => handleLink(e, item.path)}
                    className="text-white/60 hover:text-primary transition-colors text-sm md:text-base interactive"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="font-headline font-bold text-lg mb-6">Newsletter</h4>
            <p className="text-white/60 mb-4 text-sm md:text-base leading-relaxed">
              Stay updated with our latest insights and projects.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-primary/20 border border-primary/40 rounded-xl text-primary text-sm font-semibold">
                <CheckCircle2 size={18} />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Email Address"
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 flex-grow focus:outline-none focus:border-primary transition-colors text-white text-sm placeholder:text-white/40"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="bg-primary text-white p-2.5 rounded-lg hover:bg-primary/90 transition-colors cursor-pointer flex items-center justify-center shrink-0 interactive shadow-sm"
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
                {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright and legal */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-sm">
          <p>© 2026 Team Prospira. All rights reserved.</p>
          <div className="flex gap-8">
            <button
              onClick={() => alert('Privacy Policy: Prospira respects your privacy and complies with modern data protection standards.')}
              className="hover:text-white transition-colors cursor-pointer interactive"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => alert('Terms of Service: By using our services, you agree to our standard agency service terms.')}
              className="hover:text-white transition-colors cursor-pointer interactive"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
