import React from 'react';
import styled from 'styled-components';
import Blob1 from '../../assets/paths/blob_1.svg';
import Blob2 from '../../assets/paths/blob_2.svg';
import { COLORS } from '../styles/ColorStyles';
import { H1, MediumText } from '../styles/TextStyles';
import illustration from '../../assets/illustrations/computer-work.svg';
import GetStartedButton from '../buttons/GetStartedButton';
import NavBar from '../shared/NavBar';
import { MediaQueries } from '../../constants';

const HeroSection = () => {
  return (
    <Wrapper>
      <Blob src={Blob1} alt="Blob 1" />
      <Blob src={Blob2} alt="Blob 2" />
      <NavBar />
      <HeaderWrapper>
        <ContentWrapper>
          <TextWrapper>
            <Title>
              Manage your Files <span>efficiently</span> with{' '}
              <span>Cloudy</span>.
            </Title>
            <Description>
              Cloudy is a simple File Manager that has all the features you need
              and provides a easy-to-use interface. Securely share files with
              friends, family and colleagues.
            </Description>
            <GetStartedButton />
          </TextWrapper>
          <Illustration
            src={illustration}
            alt="Person using computer Illustration"
          />
        </ContentWrapper>
      </HeaderWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 40px;
  position: relative;
  overflow: hidden;

  @media ${MediaQueries.tablet} {
    padding: 30px 50px;
  }

  @media ${MediaQueries.phone} {
    padding: 20px 40px;
  }

  @media ${MediaQueries.phoneSmaller} {
    padding: 20px;
  }
`;

const Blob = styled.img`
  position: absolute;

  :first-of-type {
    width: 1508px;
    height: 1799.78px;
    left: -431px;
    top: -669px;
    transform: rotate(2deg);
    z-index: -1;

    @media (max-width: 860px) {
      width: 1700px;
      height: 2000px;
      top: -600px;
    }
  }

  :nth-of-type(2) {
    width: 1763.81px;
    height: 1430.17px;
    left: 119px;
    top: -873px;
    transform: rotate(20deg);
    z-index: -2;
  }
`;

const HeaderWrapper = styled.header`
  width: 100%;
  padding-top: 60px;
  padding-bottom: 100px;

  @media ${MediaQueries.tablet} {
    padding-top: 50px;
    padding-bottom: 120px;
  }

  @media (max-width: 860px) {
    padding-bottom: 40px;
  }

  @media ${MediaQueries.tabletSmall} {
    padding-top: 30px;
    padding-top: 10px;
  }

  @media ${MediaQueries.phone} {
    padding-bottom: 0px;
  }

  @media ${MediaQueries.phoneSmaller} {
    padding-top: 60px;
    padding-bottom: 60px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 440px auto;
  align-items: center;
  gap: 80px;

  @media (max-width: 800px) {
    gap: 50px;
    grid-template-columns: 320px auto;
  }
`;

const TextWrapper = styled.div`
  max-width: 440px;
  display: grid;
  gap: 30px;
`;

const Title = styled(H1)`
  color: ${COLORS.text3};
  span {
    color: ${COLORS.secondary2};
  }
`;

const Description = styled(MediumText)`
  color: ${COLORS.text4};
`;

const Illustration = styled.img`
  @media ${MediaQueries.phoneSmaller} {
    display: none;
  }
`;

export default HeroSection;
