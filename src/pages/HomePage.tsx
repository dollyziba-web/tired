import React from 'react';
import { Hero } from '../components/Hero';
import { Stats } from '../components/Stats';
import { ClientMarquee } from '../components/ClientMarquee';
import { ServicesGrid } from '../components/ServicesGrid';
import { CtaSection } from '../components/CtaSection';

interface HomePageProps {
  onStartProject: () => void;
  onExploreWork: () => void;
  onViewAllServices: () => void;
  onSelectService: (serviceName: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onStartProject,
  onExploreWork,
  onViewAllServices,
  onSelectService,
}) => {
  const scrollToStats = () => {
    const el = document.getElementById('stats');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <Hero
        onStartProject={onStartProject}
        onExploreWork={onExploreWork}
        onScrollDown={scrollToStats}
      />
      <Stats />
      <ClientMarquee />
      <ServicesGrid
        onViewAllServices={onViewAllServices}
        onSelectService={onSelectService}
      />
      <CtaSection onStartProject={onStartProject} />
    </div>
  );
};

export default HomePage;
