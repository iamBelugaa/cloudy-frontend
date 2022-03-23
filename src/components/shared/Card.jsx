import React from 'react';
import styled from 'styled-components';
import Computerwork from '../../assets/illustrations/computer-work.svg';
import { COLORS } from '../styles/ColorStyles';
import { Caption, H2 } from '../styles/TextStyles';
import { MediaQueries } from '../../constants';
import Form from '../shared/Form';

const Card = ({
  title,
  description,
  icon,
  placeholder,
  state,
  onSubmit,
  children,
}) => {
  return (
    <Wrapper>
      <ContentWrapper>
        <IllustrationWrapper>
          <Illustration src={Computerwork} alt="Girl in a scooter with a bag" />
        </IllustrationWrapper>
        <FormWrapper>
          <TextWrapper>
            <Title>{title}</Title>
            <Description>{description}</Description>
          </TextWrapper>
          <Form
            icon={icon}
            placeholder={placeholder}
            title={title}
            state={state}
            onSubmit={onSubmit}
          />
          <LinksWrapper>{children}</LinksWrapper>
        </FormWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 450px auto;
  gap: 80px;
  width: 950px;
  height: 590px;
  margin: 0 auto;
  margin-top: 60px;
  background: rgba(50, 61, 109, 0.5);
  border: 0.5px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0px 50px 100px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(40px);
  border-radius: 20px;
  overflow: hidden;
  position: relative;

  @media (max-width: 1080px) {
    width: 880px;
    height: 570px;
    grid-template-columns: 380px auto;
  }

  @media ${MediaQueries.tablet} {
    padding: 30px;
    gap: 20px;
    width: 600px;
    height: 950px;
    grid-template-columns: auto;
  }

  @media (max-width: 750px) {
    gap: 20px;
    width: 500px;
    height: 900px;
    grid-template-columns: auto;
    padding: 0;
  }

  @media (max-width: 650px) {
    width: 400px;
    height: 850px;
    gap: 0px;
  }

  @media (max-width: 520px) {
    width: 380px;
    height: 600px;
  }

  @media (max-width: 520px) {
    width: 350px;
    height: 530px;
    margin-top: 80px;
  }
`;

const IllustrationWrapper = styled.div`
  display: grid;
  background: linear-gradient(200.42deg, #844ffc 13.57%, #491eb8 98.35%);
  justify-content: center;
  align-content: center;
  border-radius: 20px;

  @media (max-width: 750px) {
    max-width: 400px;
    margin-left: 50px;
    margin-top: 20px;
  }

  @media (max-width: 650px) {
    max-width: 340px;
    margin-left: 30px;
    gap: 0px;
  }

  @media (max-width: 520px) {
    display: none;
  }
`;

const Illustration = styled.img`
  max-width: 380px;
  border-radius: 20px;

  @media ${MediaQueries.tablet} {
    max-width: 300px;
  }
`;

const FormWrapper = styled.div`
  display: grid;
  align-content: center;
  gap: 40px;

  @media ${MediaQueries.tablet} {
    justify-content: center;
  }
`;

const TextWrapper = styled.div`
  display: grid;
  grid-template-columns: 330px;
  align-content: center;
  gap: 30px;
  color: ${COLORS.text3};

  @media (max-width: 650px) {
    grid-template-columns: 280px;
  }
`;

const Title = styled(H2)`
  @media (max-width: 650px) {
    font-size: 40px;
  }
`;

const Description = styled(Caption)`
  color: ${COLORS.text4};

  @media (max-width: 650px) {
    font-size: 13px;
  }
`;

const LinksWrapper = styled.div`
  align-self: initial;
`;

export default Card;
