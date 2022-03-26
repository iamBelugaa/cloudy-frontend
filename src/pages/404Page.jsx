import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Zero from '../assets/letters/0.svg';
import Four from '../assets/letters/4.svg';
import Vector from '../assets/paths/vectors.svg';
import CtaButton from '../components/buttons/CtaButton';
import NavBar from '../components/shared/NavBar';
import { COLORS } from '../components/styles/ColorStyles';
import { H1, MediumText } from '../components/styles/TextStyles';
import { MediaQueries } from '../constants';
import HamburgerContext from '../contexts/HamburgerContext';

const FourOhFourPage = () => {
  const history = useHistory();

  return (
    <HamburgerContext>
      <Wrapper>
        <NavBar />
        <Container>
          <ContentWrapper>
            <SVGWrapper>
              <SVG src={Four} alt="Four Icon" className="svg-1" />
              <SVG src={Zero} alt="Zero Icon" className="svg-2" />
              <SVG src={Four} alt="Four Icon" className="svg-3" />
            </SVGWrapper>
            <TextWrapper>
              <Title>Page Not Found.</Title>
              <Description>
                Sorry, we can't find the page you're looking for.
              </Description>
              <CtaButton
                title="Back To Home"
                onClick={() => history.push('/')}
              />
            </TextWrapper>
          </ContentWrapper>
        </Container>
      </Wrapper>
    </HamburgerContext>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  background: url(${Vector}), linear-gradient(180deg, #343563 0%, #4926ad 100%);
  backdrop-filter: blur(50px);
  background-position: bottom center;
  padding: 40px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const Container = styled.main`
  width: 100%;
  padding-top: 120px;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  justify-content: center;

  @media ${MediaQueries.laptop} {
    margin: 0 auto;
  }
`;

const SVGWrapper = styled.div`
  position: relative;
`;

const SVG = styled.img`
  max-width: 400px;
  position: absolute;
  top: -50px;

  &.svg-1 {
    left: -200px;

    @media (max-width: 660px) {
      left: -60px;
    }
  }

  &.svg-2 {
    left: 30px;
    top: -60px;
    transform: scale(1.18);

    @media (max-width: 660px) {
      left: 80px;
    }

    @media (max-width: 480px) {
      left: 45px;
    }
  }

  &.svg-3 {
    right: -135px;

    @media (max-width: 660px) {
      right: -20px;
    }

    @media (max-width: 480px) {
      right: -50px;
    }
  }

  @media (max-width: 800px) {
    max-width: 300px;
  }

  @media (max-width: 660px) {
    max-width: 200px;
  }
`;

const TextWrapper = styled.div`
  margin-top: 240px;
  display: grid;
  gap: 20px;
  justify-items: center;

  @media (max-width: 800px) {
    margin-top: 200px;
    gap: 10px;
  }

  @media (max-width: 660px) {
    margin-top: 110px;
    gap: 10px;
  }
`;

const Title = styled(H1)`
  color: ${COLORS.text3};
  letter-spacing: 3px;

  @media (max-width: 480px) {
    font-size: 35px;
  }

  @media (max-width: 400px) {
    font-size: 30px;
  }
`;

const Description = styled(MediumText)`
  color: ${COLORS.text4};
  font-size: 18px;

  @media (max-width: 800px) {
    font-size: 15px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export default FourOhFourPage;
