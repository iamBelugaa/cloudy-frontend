import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../styles/ColorStyles';
import { Caption, H2 } from '../styles/TextStyles';
import copyIcon from '../../assets/icons/copy.svg';
import config from '../../config.json';
import { toastify } from '../../utils';

const SucessBox = ({ uid, sendMail, resetState }) => {
  const [email, setEmail] = useState('');

  useEffect(() => toastify('File uploaded successfully.'), []);

  return (
    <Wrapper>
      <H2 style={{ fontWeight: 600, textAlign: 'center' }}>
        File uploaded{' '}
        <span
          style={{
            fontSize: '55px',
            color: COLORS.secondary1,
            textShadow: '0px 20px 40px rgba(23, 0, 102, 0.2)',
          }}
        >
          successfully.
        </span>
      </H2>
      <ActionContainer>
        <div>
          <Caption>Share Link</Caption>
          <input
            type="text"
            value={`${config.rootDomain}/download/${uid}`}
            readOnly
            autoFocus
          />
          <Icon
            src={copyIcon}
            alt="Copy Icon"
            onClick={() => {
              navigator.clipboard.writeText(
                `${config.rootDomain}/download/${uid}`
              );
              toastify('Link copied.');
            }}
          />
        </div>
        <div>
          <Caption>Or send via Mail</Caption>
          <input
            type="email"
            value={email}
            placeholder="Reciever's email..."
            onChange={(e) => setEmail(e.target.value.trim())}
          />
        </div>
        <Button type="button" onClick={() => sendMail(email)}>
          Send Mail
        </Button>
      </ActionContainer>
      <Button type="button" onClick={() => resetState()}>
        Upload Another
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 500px;
  color: ${COLORS.text3};
  padding: 40px 20px 30px;
  display: grid;
  justify-content: center;
  grid-template-columns: auto;
  gap: 45px;
  border-radius: 30px;
  box-shadow: rgb(47 184 255 / 30%) 0px 10px 40px,
    inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.5);
  background: rgba(25, 26, 67, 0.4);
  backdrop-filter: blur(40px);
`;

const Icon = styled.img`
  position: absolute;
  width: 18px;
  right: 12px;
  top: 38.5px;
  cursor: pointer;
`;

const ActionContainer = styled.div`
  position: relative;
  justify-self: center;
  text-align: center;
  display: grid;
  gap: 30px;
  position: relative;

  ::after {
    content: 'OR';
    position: absolute;
    width: 100%;
    bottom: -30px;
    left: 0;
  }

  div {
    display: grid;
    gap: 10px;
  }

  input {
    font-family: inherit;
    font-weight: 600;
    font-size: 15px;
    color: inherit;
    width: 360px;
    height: 30px;
    text-align: center;
    padding: 5px 20px;
    border: none;
    outline: none;
    background: none;
    border-radius: 30px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
      0px 20px 40px rgba(23, 0, 102, 0.2),
      inset 0px 0px 0px 0.7px rgba(255, 255, 255, 0.5);

    :first-of-type {
      padding-right: 40px;
    }

    :focus {
      box-shadow: rgb(47 184 255 / 30%) 0px 10px 40px,
        rgb(47 184 255) 0px 0px 0px 1px inset;
    }

    ::placeholder {
      font-size: 14px;
      font-weight: 500;
      color: ${COLORS.text4};
    }
  }
`;

const Button = styled.button`
  width: 200px;
  justify-self: center;
  cursor: pointer;
  border: none;
  outline: none;
  font-weight: 600;
  font-size: 15px;
  padding: 10px 30px;
  background: rgba(245, 245, 245, 0.95);
  border-radius: 20px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
    0px 20px 40px rgba(23, 0, 102, 0.2);
  transition: all 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);

  :hover {
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
      0px 30px 60px rgba(23, 0, 102, 0.4);
    transform: translateY(-3px);
  }

  :active {
    transform: translateY(0px);
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
      0px 25px 45px rgba(23, 0, 102, 0.4);
  }
`;

export default SucessBox;
