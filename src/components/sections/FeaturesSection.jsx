import React from 'react';
import styled from 'styled-components';
import { BodyIntro, H1 } from '../styles/TextStyles';
import SeparatorImg from '../../assets/paths/Separator.svg';
import { Features } from '../../constants';
import FeatureBox from '../Shared/FeatureBox';
import Path1 from '../../assets/paths/vectors.svg';
import { COLORS } from '../styles/ColorStyles';

const FeaturesSection = () => {
  return (
    <BenifitsWrapper id='features'>
      <Path src={Path1} alt='Wave background' />
      <Wrapper>
        <ContentWrapper>
          <TextWrapper>
            <Title>
              Why to join <span>Cloudy?</span>{' '}
            </Title>
            <Description>
              Inside Cloudy we present everything you need to manage and monitor
              your files.
            </Description>
          </TextWrapper>
          <Separator src={SeparatorImg} alt='Content separator image' />
          <FeaturesWrapper>
            {Features.map((feature, index) => (
              <FeatureBox feature={feature} key={index} />
            ))}
          </FeaturesWrapper>
        </ContentWrapper>
      </Wrapper>
    </BenifitsWrapper>
  );
};

const BenifitsWrapper = styled.section`
  padding: 50px 50px 100px;
  position: relative;
  overflow: hidden;

  @media (max-width: 860px) {
    padding: 60px 50px 250px;
  }

  @media (max-width: 400px) {
    padding-bottom: 200px;
  }
`;

const Wrapper = styled.main`
  width: 100%;
  margin-top: -50px;

  @media (max-width: 860px) {
    margin-top: 0px;
  }
`;

const Path = styled.img`
  position: absolute;
  top: -150px;
  left: 100px;
  z-index: -1;

  @media (max-width: 860px) {
    top: -100px;
    left: -250px;
    transform: rotate(150deg);
  }
`;

const ContentWrapper = styled.article`
  max-width: 1050px;
  height: 396px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 400px 80px auto;
  gap: 100px;
  align-items: center;
  justify-content: center;

  @media (max-width: 1130px) {
    grid-template-columns: 300px auto;
    gap: 50px;
  }

  @media (max-width: 860px) {
    grid-template-columns: 400px;
    gap: 60px;
    justify-content: center;
  }

  @media (max-width: 400px) {
    grid-template-columns: 350px;
    gap: 40px;
  }
`;

const TextWrapper = styled.div`
  display: grid;
  gap: 50px;
  align-content: center;

  @media (max-width: 1130px) {
    gap: 30px;
  }

  @media (max-width: 860px) {
    justify-content: center;
  }
`;

const Title = styled(H1)`
  span {
    color: ${COLORS.primary1};
  }

  @media (max-width: 1130px) {
    font-size: 50px;
  }

  @media (max-width: 860px) {
    font-size: 40px;
  }

  @media (max-width: 400px) {
    font-size: 30px;
  }
`;

const Description = styled(BodyIntro)`
  @media (max-width: 1130px) {
    font-size: 20px;
  }

  @media (max-width: 860px) {
    max-width: 300px;
    text-align: center;
    margin-left: 20px;
  }

  @media (max-width: 400px) {
    font-size: 15px;
    margin-left: -10px;
  }
`;

const Separator = styled.img`
  opacity: 0.9;

  @media (max-width: 1130px) {
    display: none;
  }
`;

const FeaturesWrapper = styled.div`
  display: grid;
  gap: 30px;
  align-self: center;

  @media (max-width: 400px) {
    gap: 20px;
  }
`;

export default FeaturesSection;
