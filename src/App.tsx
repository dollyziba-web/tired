import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { ProjectEnquiryModal } from './components/ProjectEnquiryModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ProcessPage } from './pages/ProcessPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const p = window.location.pathname;
    return ['/', '/services', '/portfolio', '/process', '/about', '/contact'].includes(p)
      ? p
      : '/';
  });

  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string>('Web Development');

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname;
      setCurrentPath(['/', '/services', '/portfolio', '/process', '/about', '/contact'].includes(p) ? p : '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEnquiry = (serviceName?: string) => {
    if (serviceName) setPreselectedService(serviceName);
    setIsEnquiryOpen(true);
  };

  const renderPage = () => {
    switch (currentPath) {
      case '/services':
        return <ServicesPage onStartProject={(svc) => handleOpenEnquiry(svc)} />;
      case '/portfolio':
        return <PortfolioPage onStartProject={() => handleOpenEnquiry()} />;
      case '/process':
        return <ProcessPage onStartProject={() => handleOpenEnquiry()} />;
      case '/about':
        return <AboutPage onStartProject={() => handleOpenEnquiry()} />;
      case '/contact':
        return <ContactPage />;
      case '/':
      default:
        return (
          <HomePage
            onStartProject={() => handleOpenEnquiry()}
            onExploreWork={() => navigateTo('/portfolio')}
            onViewAllServices={() => navigateTo('/services')}
            onSelectService={(svc) => handleOpenEnquiry(svc)}
          />
        );
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground font-body">
      {/* Visual noise overlay matching reference */}
      <div className="grain-overlay" />

      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Right Edge Scroll Progress */}
      <ScrollProgress />

      {/* Global Navigation Bar */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigateTo}
        onOpenEnquiry={() => handleOpenEnquiry()}
      />

      {/* Main Page Content with Page Transition */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPath}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Project Enquiry Interactive Modal */}
      <ProjectEnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        preselectedService={preselectedService}
      />
    </div>
  );
}

export default App;
