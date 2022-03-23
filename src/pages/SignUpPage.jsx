import React from 'react';
import Card from '../components/shared/Card';
import NavBar from '../components/shared/NavBar';
import styled from 'styled-components';
import Account from '../assets/icons/account.svg';
import { Link } from 'react-router-dom';
import { SmallText } from '../components/styles/TextStyles';
import { COLORS } from '../components/styles/ColorStyles';

const data = {
  title: 'Sign Up',
  description:
    'Cloudy has you covered allowing for all file types to be shared.',
  icon: { img: Account, alt: 'User icon' },
  placeholder: 'Display name',
};

const SignUpPage = () => {
  return (
    <Wrapper>
      <NavBar />
      <Card {...data}>
        <CaptionText>Already have an account?</CaptionText>
        <Link to={'/login'}>
          <span style={{ color: `${COLORS.secondary1}` }}>Sign in</span>
        </Link>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  height: 100%;
  padding: 40px 80px 63px 80px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, #343563 0%, #4926ad 100%);
  backdrop-filter: blur(50px);

  @media (max-width: 1000px) {
    padding: 30px 90px 65px 65px;
  }

  @media (max-width: 850px) {
    padding: 30px 60px 65px 65px;
  }

  @media (max-width: 520px) {
    padding: 30px 60px 100px 55px;
  }

  @media (max-width: 470px) {
    padding: 30px 30px 100px 25px;
  }
`;

const CaptionText = styled(SmallText)`
  font-size: 14px;
  display: inline-block;
  color: ${COLORS.text3};
  padding-right: 5px;
`;

export default SignUpPage;
