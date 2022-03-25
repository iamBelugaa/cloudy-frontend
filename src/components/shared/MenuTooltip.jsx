import React from 'react';
import { NavLinks } from '../../constants';
import MenuButton from '../buttons/MenuButton';
import styled from 'styled-components';

const MenuTooltip = ({ isOpen }) => {
  return (
    <Tooltip count={NavLinks.length} isOpen={isOpen}>
      {NavLinks.map((item, index) => (
        <MenuButton item={item} key={index} />
      ))}
    </Tooltip>
  );
};

const Tooltip = styled.div`
  display: none;
  z-index: 10;

  @media (max-width: 800px) {
    position: absolute;
    right: 40px;
    top: 80px;
    padding: 20px;
    display: grid;
    gap: 10px;
    background: rgba(15, 14, 71, 0.3);
    box-shadow: 0px 50px 100px rgba(0, 0, 0, 0.25),
      inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(40px);
    border-radius: 20px;
    visibility: ${(p) => (p.isOpen ? 'visible' : 'hidden')};
    transform: ${(p) =>
      p.isOpen
        ? `skewY(0deg) rotate(0deg) translateY(0)`
        : `skewY(-5deg) rotate(5deg) translateY(-30px)`};
    opacity: ${(p) => (p.isOpen ? '1' : '0')};
    transition: all 0.75s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
`;

export default MenuTooltip;
