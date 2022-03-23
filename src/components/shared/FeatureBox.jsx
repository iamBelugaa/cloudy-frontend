import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../styles/ColorStyles';
import { Caption } from '../styles/TextStyles';

const FeatureBox = ({ feature }) => {
  return (
    <Wrapper>
      <IconWrapper>
        <Icon src={feature.icon} alt="Feature Icon" />
      </IconWrapper>
      <Description>{feature.description}</Description>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 375px;
  height: 112px;
  display: grid;
  grid-template-columns: 52px auto;
  align-items: center;
  background: rgba(88, 105, 255, 0.1);
  padding: 18px;
  gap: 17px;
  border-radius: 20px;
  backdrop-filter: blur(30px);

  @media (max-width: 400px) {
    width: 330px;
    height: 120px;
    padding: 16px;
    align-self: center;
    gap: 5px;
    margin-left: 10px;
  }
`;

const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(200.44deg, #4316db 13.57%, #9076e7 98.38%);
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1130px) {
    width: 40px;
    height: 40px;
  }

  @media (max-width: 400px) {
    width: 30px;
    height: 30px;
  }
`;

const Icon = styled.img`
  width: 30px;
  height: 30px;
  color: ${COLORS.primary1};
  fill: ${COLORS.primary1};

  @media (max-width: 1130px) {
    width: 20px;
    height: 20px;
  }
`;

const Description = styled(Caption)``;

export default FeatureBox;
