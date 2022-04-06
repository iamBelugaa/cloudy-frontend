import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import styled from 'styled-components';
import Card from '../../components/Shared/Card';
import NavBar from '../../components/Shared/NavBar';
import { COLORS } from '../../components/styles/ColorStyles';
import { SmallText } from '../../components/styles/TextStyles';
import HamburgerContext from '../../contexts/HamburgerContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { adminEndpoints, toastify } from '../../utils';
import { authenticate as login } from '../../services/authService';

const data = {
  title: 'Sign In',
  description:
    'Cloudy has you covered allowing for all file types to be shared.',
  placeholder: 'Display name',
};

const LoginPage = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [, setToken] = useLocalStorage('userSID');
  const [toDashboard, setToDashboard] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(form, adminEndpoints.login)
      .then((data) => {
        if (data) {
          setForm({
            email: '',
            password: '',
          });
          setToken(data.token);
          setToDashboard(true);
        }
      })
      .catch((e) => toastify(e.message, 'error'));
  };

  if (toDashboard) return <Redirect to="/admin/dashboard" />;

  return (
    <HamburgerContext>
      <Wrapper>
        <NavBar />
        <Card {...data} form={form} setForm={setForm} onSubmit={handleSubmit}>
          <div>
            <CaptionText>Don't have an account?</CaptionText>
            <Link to={'/register'}>
              <span style={{ color: `${COLORS.secondary1}` }}>Sign Up</span>
            </Link>
          </div>
          <div style={{ marginTop: '20px' }}>
            <CaptionText>User? Login here </CaptionText>
            <Link to={'/login'}>
              <span style={{ color: `${COLORS.secondary1}` }}>Sign In</span>
            </Link>
          </div>
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
  background: linear-gradient(180deg, #343563 0%, #4926ad 100%);
  backdrop-filter: blur(50px);

  @media (max-width: 1000px) {
    padding: 30px 90px 65px 65px;
  }

  @media (max-width: 850px) {
    padding: 30px 60px 65px 65px;
  }

  @media (max-width: 520px) {
    padding: 30px 60px 80px 55px;
  }

  @media (max-width: 470px) {
    padding: 30px 30px 80px 25px;
  }
`;

const CaptionText = styled(SmallText)`
  font-size: 14px;
  display: inline-block;
  color: ${COLORS.text3};
  padding-right: 5px;
`;

export default LoginPage;
