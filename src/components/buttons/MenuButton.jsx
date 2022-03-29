import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { COLORS } from '../styles/ColorStyles';
import { SmallText } from '../styles/TextStyles';
import { MediaQueries } from '../../constants';

const MenuButton = ({ item, onClick }) => {
  return (
    <Link to={item.href} onClick={onClick}>
      <MenuLink>
        {item.icon && <img src={item.icon} alt={`${item.name} icon`} />}
        <MenuName>{item.name}</MenuName>
      </MenuLink>
    </Link>
  );
};

const MenuLink = styled.div`
  display: grid;
  grid-template-columns: 24px auto;
  gap: 5px;
  align-items: center;
  color: ${COLORS.text3};
  padding: 10px 18px;
  border-radius: 10px;
  transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

  img {
    max-width: 24px;
    height: 23px;
    margin-bottom: 2.5px;

    @media ${MediaQueries.tabletSmall} {
      max-width: 20px;
      height: 19px;
    }
  }

  :hover {
    color: ${COLORS.text3};
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1),
      inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    transform: translateY(-4px);
  }
  :active {
    transform: translateY(0px);
  }

  @media ${MediaQueries.tablet} {
    grid-template-columns: 20px auto;
    padding: 8px 15px;
    gap: 8px;
  }
`;

const MenuName = styled(SmallText)`
  font-size: 14px;
  font-weight: 500;

  @media ${MediaQueries.tablet} {
    font-size: 12px;
  }

  @media ${MediaQueries.tabletSmall} {
    font-size: 11px;
  }
`;

export default MenuButton;
