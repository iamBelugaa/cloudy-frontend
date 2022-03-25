import React from 'react';
import Lock from '../../assets/icons/lock.svg';
import Mail from '../../assets/icons/mail.svg';
import CtaButton from '../buttons/CtaButton';
import styled from 'styled-components';
import { COLORS } from '../styles/ColorStyles';
import { FORM_ACTIONS } from '../../hooks/useForm';

const Form = ({ icon, placeholder, title, state, onSubmit, dispatch }) => {
  return (
    <FormWrapper onSubmit={onSubmit}>
      {icon && placeholder && (
        <InputWrapper>
          <Icon src={icon.img} alt={icon.alt} />
          <input
            type="text"
            placeholder={placeholder}
            value={state.displayName || ''}
            onChange={(e) =>
              dispatch({
                type: FORM_ACTIONS.updateState,
                payload: { displayName: e.target.value },
              })
            }
          />
        </InputWrapper>
      )}

      <InputWrapper>
        <Icon src={Mail} alt="Mail icon" />
        <input
          type="email"
          placeholder="Email address"
          value={state.email || ''}
          onChange={(e) =>
            dispatch({
              type: FORM_ACTIONS.updateState,
              payload: { email: e.target.value },
            })
          }
        />
      </InputWrapper>

      <InputWrapper>
        <Icon src={Lock} alt="Lock icon" />
        <input
          type="password"
          placeholder="*********"
          value={state.password || ''}
          onChange={(e) =>
            dispatch({
              type: FORM_ACTIONS.updateState,
              payload: { password: e.target.value },
            })
          }
        />
      </InputWrapper>
      <CtaButton type="submit" title={title} />
    </FormWrapper>
  );
};

const FormWrapper = styled.form`
  display: grid;
  align-content: center;
  gap: 20px;
`;

const InputWrapper = styled.div`
  position: relative;
  height: 44px;

  input {
    margin: 0;
    font-family: inherit;
    width: 255px;
    height: 100%;
    border: none;
    outline: none;
    padding-left: 60px;
    color: ${COLORS.text3};
    background: linear-gradient(
      180deg,
      rgba(99, 106, 150, 0.4) 0%,
      rgba(182, 186, 214, 0.25) 100%
    );
    border: 0.5px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(40px);
    border-radius: 30px;

    :focus {
      box-shadow: rgb(47 184 255 / 30%) 0px 10px 40px,
        rgb(47 184 255) 0px 0px 0px 1px inset;
    }

    ::placeholder {
      color: ${COLORS.text4};
      font-size: 14px;
      font-weight: 500;
    }

    @media (max-width: 520px) {
      width: 220px;
    }
  }
`;

const Icon = styled.img`
  align-self: center;
  position: absolute;
  left: 10px;
  top: 7px;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 5px;
  border-radius: 50%;
`;

export default Form;
