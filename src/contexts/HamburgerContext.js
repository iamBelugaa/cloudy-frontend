import React, { useState, useEffect, createContext, useContext } from 'react';

const Hamburger = createContext();

export const useHamburger = () => useContext(Hamburger);

const HamburgContext = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hideTooltip = (e) => {
      if (
        e.type === 'click' &&
        e.target.id !== 'hamburger' &&
        e.target.className !== 'more'
      )
        setIsOpen(false);
      if (e.type === 'keydown' && e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('click', hideTooltip);
    document.addEventListener('keydown', hideTooltip);

    return () => {
      document.removeEventListener('click', hideTooltip);
      document.removeEventListener('keydown', hideTooltip);
    };
  }, []);

  return (
    <Hamburger.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </Hamburger.Provider>
  );
};

export default HamburgContext;
