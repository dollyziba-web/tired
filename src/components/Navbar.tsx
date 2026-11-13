import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '../utils';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenEnquiry: () => void;
}

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Work', href: '/portfolio' },
  { name: 'Process', href: '/process' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate, onOpenEnquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // When not on home, or when scrolled, use glass header with dark text
  const isLightModeHeader = isScrolled || currentPath !== '/';

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(href);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4',
        isLightModeHeader ? 'glass py-3 shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '/')}
          className="font-headline font-black text-2xl tracking-tighter flex items-center interactive group"
        >
          <span
            className={cn(
              'transition-colors tracking-tight',
              isLightModeHeader ? 'text-foreground' : 'text-white'
            )}
          >
            PROSPIRA
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = currentPath === link.href;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={cn(
                  'font-medium text-sm transition-colors hover:text-primary relative py-1 interactive',
                  isLightModeHeader
                    ? isActive
                      ? 'text-primary font-bold'
                      : 'text-foreground/80'
                    : isActive
                    ? 'text-white font-bold'
                    : 'text-white/80'
                )}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}

          {/* Start Project Button */}
          <button
            onClick={() => onOpenEnquiry()}
            className={cn(
              'px-6 py-2.5 rounded-full font-bold text-sm transition-all interactive cursor-pointer shadow-sm hover:scale-105 active:scale-95',
              isLightModeHeader
                ? 'bg-primary text-white hover:bg-primary/90 shadow-primary/20'
                : 'bg-white text-secondary hover:bg-accent hover:text-foreground'
            )}
          >
            Start Project
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className={cn(
            'md:hidden p-2 interactive focus:outline-none',
            isLightModeHeader ? 'text-foreground' : 'text-white'
          )}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-border p-6 flex flex-col gap-4 md:hidden shadow-2xl z-50"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={cn(
                  'text-lg font-headline font-bold border-b border-border/50 pb-3 transition-colors flex justify-between items-center',
                  currentPath === link.href ? 'text-primary' : 'text-foreground'
                )}
              >
                <span>{link.name}</span>
                {currentPath === link.href && (
                  <span className="w-2 h-2 rounded-full bg-primary" />
                )}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnquiry();
              }}
              className="mt-2 w-full py-3.5 bg-primary text-white rounded-full font-bold text-center hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              Start Project
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
