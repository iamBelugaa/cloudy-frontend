import React, { useEffect, useRef, useState } from 'react';
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
import { FORM_ACTIONS, useForm } from '../../hooks/useForm';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { toastify } from '../../utils';

const data = {
  title: 'Sign Up',
  description:
    'Cloudy has you covered allowing for all file types to be shared.',
  icon: { img: Account, alt: 'User icon' },
  placeholder: 'Display name',
};

const SignUpPage = () => {
  const { state, dispatch } = useForm();
  const [, setToken] = useLocalStorage('uAccessToken');
  const [toDashboard, setToDashboard] = useState(false);
  const timeRef = useRef();

  useEffect(() => (document.title = 'Sing Up to Cloudy'), []);

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
        toastify('Registered. Redirecting to Dashboard.', 'success', 1500);
        timeRef.current = setTimeout(() => setToDashboard(true), 1600);
      }
    })();

    return () => clearTimeout(timeRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: FORM_ACTIONS.register,
      payload: {
        ...state,
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
          state={state}
          onSubmit={handleSubmit}
          dispatch={dispatch}
        >
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
