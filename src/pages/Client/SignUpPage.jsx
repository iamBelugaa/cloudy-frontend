import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import styled from 'styled-components';
import Account from '../../assets/icons/account.svg';
import stars from '../../assets/illustrations/stars.svg';
import Card from '../../components/Shared/Card';
import NavBar from '../../components/Shared/NavBar';
import { COLORS } from '../../components/styles/ColorStyles';
import { SmallText } from '../../components/styles/TextStyles';
import HamburgerContext from '../../contexts/HamburgerContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { toastify, userEndpoints } from '../../utils';
import { authenticate as register } from '../../services/authService';

const data = {
  title: 'Sign Up',
  description:
    'Cloudy has you covered allowing for all file types to be shared.',
  icon: { img: Account, alt: 'User icon' },
  placeholder: 'Display name',
};

const SignUpPage = () => {
  const [form, setForm] = useState({
    displayName: '',
    email: '',
    password: '',
  });
  const [, setToken] = useLocalStorage('sidToken');
  const [toDashboard, setToDashboard] = useState(false);

  useEffect(() => (document.title = 'Sing Up to Cloudy'), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    register(form, userEndpoints.register)
      .then((data) => {
        if (data) {
          setForm({
            displayName: '',
            email: '',
            password: '',
          });
          setToken(data.token);
          setToDashboard(true);
        }
      })
      .catch((e) => toastify(e.message, 'error'));
  };

  if (toDashboard) return <Redirect to="/dashboard" />;

  return (
    <HamburgerContext>
      <Wrapper>
        <NavBar />
        <Card {...data} form={form} onSubmit={handleSubmit} setForm={setForm}>
          <CaptionText>Already have an account?</CaptionText>
          <Link to={'/login'}>
            <span style={{ color: `${COLORS.secondary1}` }}>Sign in</span>
          </Link>
        </Card>
        <Toaster />
      </Wrapper>
    </HamburgerContext>
  );
};

const Wrapper = styled.main`
  height: 100%;
  padding: 40px 80px 63px 80px;
  position: relative;
  overflow: hidden;
  background: url(${stars}), linear-gradient(180deg, #343563 0%, #4926ad 100%);
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
