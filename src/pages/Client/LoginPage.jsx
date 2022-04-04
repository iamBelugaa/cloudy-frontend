import React, { useEffect, useRef, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import styled from 'styled-components';
import Card from '../../components/shared/Card';
import NavBar from '../../components/shared/NavBar';
import { COLORS } from '../../components/styles/ColorStyles';
import { SmallText } from '../../components/styles/TextStyles';
import HamburgerContext from '../../contexts/HamburgerContext';
import { FORM_ACTIONS, useForm } from '../../hooks/useForm';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { toastify } from '../../utils';

const data = {
  title: 'Sign In',
  description:
    'Cloudy has you covered allowing for all file types to be shared.',
  placeholder: 'Display name',
};

const LoginPage = () => {
  const { state, dispatch } = useForm();
  const [, setToken] = useLocalStorage('uAccessToken');
  const [toDashboard, setToDashboard] = useState(false);
  const timeRef = useRef();

  useEffect(() => (document.title = 'Login to Cloudy'), []);

  useEffect(() => {
    (async function () {
      const { error, userInfo } = await state;

      if (error) {
        toastify(error, 'error');
        dispatch({
          type: FORM_ACTIONS.updateState,
          payload: { ...state, error: null },
        });
        return;
      }

      if (userInfo) {
        setToken(userInfo.token);
        toastify('Logged in. Redirecting to Dashboard.', 'success', 1500);
        timeRef.current = setTimeout(() => setToDashboard(true), 1600);
      }
    })();

    return () => clearTimeout(timeRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({
      type: FORM_ACTIONS.login,
      payload: {
        ...state,
        path: '/login',
      },
    });
  };

  if (toDashboard) return <Redirect to="/dashboard" />;

  return (
    <HamburgerContext>
      <Wrapper>
        <NavBar />
        <Card
          {...data}
          onSubmit={handleSubmit}
          state={state}
          dispatch={dispatch}
        >
          <div>
            <CaptionText>Don't have an account?</CaptionText>
            <Link to={'/register'}>
              <span style={{ color: `${COLORS.secondary1}` }}>Sign Up</span>
            </Link>
          </div>
          <div style={{ marginTop: '20px' }}>
            <CaptionText>Admin? Login here </CaptionText>
            <Link to={'/admin/login'}>
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
