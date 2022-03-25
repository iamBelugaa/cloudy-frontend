import React from 'react';
import FeaturesSection from '../components/sections/FeaturesSection';
import HeroSection from '../components/sections/HeroSection';
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
