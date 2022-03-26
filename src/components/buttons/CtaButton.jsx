import React from 'react';
import styled from 'styled-components';
import { MediumText } from '../styles/TextStyles';

const CtaButton = ({ title, type = 'button', onClick }) => {
  return (
    <Wrapper type={type} onClick={onClick}>
      <Title>{title}</Title>
    </Wrapper>
  );
};

const Wrapper = styled.button`
  cursor: pointer;
  width: 320px;
  height: 44px;
  border: none;
  outline: none;
  background: linear-gradient(91.4deg, #2fb8ff 0%, #9eecd9 100%);
  border-radius: 30px;
  transition: all 0.6s cubic-bezier(0.075, 0.82, 0.165, 1);
  margin-top: 10px;

  :hover,
  :focus {
    box-shadow: rgb(47 184 255 / 30%) 0px 10px 40px,
      rgb(47 184 255) 0px 0px 0px 1px inset;
  }

  @media (max-width: 520px) {
    max-width: 285px;
    justify-content: center;
  }
`;

const Title = styled(MediumText)``;

export default CtaButton;
