import React from 'react';
import { MediaQueries, NavLinks } from '../../constants';
import styled from 'styled-components';
import MenuButton from '../buttons/MenuButton';
import LogoIcon from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import HamburgerIocn from '../../assets/icons/hamburger.svg';
import MenuTooltip from './MenuTooltip';
import { useHamburger } from '../../contexts/HamburgerContext';

const NavBar = () => {
  const { isOpen, setIsOpen } = useHamburger();

  return (
    <Wrapper>
      <ContentWrapper>
        <Link to="/">
          <Logo src={LogoIcon} />
        </Link>
        <MenuLinks count={NavLinks.length}>
          {NavLinks.map((item, index) => (
            <MenuButton item={item} key={index} />
          ))}
        </MenuLinks>
        <HamburgerMenu
          src={HamburgerIocn}
          alt="Hamburger Iocn"
          onClick={() => setIsOpen(!isOpen)}
          id="hamburger"
        />
        <MenuTooltip isOpen={isOpen} />
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;

const ContentWrapper = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 44px auto;
  justify-content: space-between;

  @media (max-width: 800px) {
    gap: 100px;
  }
`;

const Logo = styled.img`
  max-width: 44px;
`;

const MenuLinks = styled.div`
  display: grid;
  grid-template-columns: repeat(${(p) => p.count}, auto);
  gap: 20px;
  align-items: center;

  @media ${MediaQueries.tablet} {
    gap: 12px;
  }

  @media (max-width: 800px) {
    display: none;
  }
`;

const HamburgerMenu = styled.img`
  display: none;
  cursor: pointer;

  @media (max-width: 800px) {
    display: block;
  }
`;

export default NavBar;
