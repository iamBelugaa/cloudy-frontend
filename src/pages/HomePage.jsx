import React from 'react';
import FeaturesSection from '../components/Sections/FeaturesSection';
import HeroSection from '../components/Sections/HeroSection';
import HamburgContext from '../contexts/HamburgerContext';

const HomePage = () => {
  return (
    <HamburgContext>
      <HeroSection />
      <FeaturesSection />
    </HamburgContext>
  );
};

export default HomePage;
