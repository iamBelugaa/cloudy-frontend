import { Link } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import { Caption2, SmallText } from '../styles/TextStyles';
import file from '../../assets/icons/image.svg';
import ring from '../../assets/icons/icon-ring.svg';

const GetStartedButton = ({ title, subtitle }) => {
  return (
    <Link to="/register">
      <Wrapper>
        <IconWrapper>
          <Icon src={file} alt="File icon" />
          <Ring src={ring} alt="Ring icon" />
        </IconWrapper>
        <TextWrapper>
          <Title>{title || 'Feeling Good?'}</Title>
          <Subtitle>{subtitle || 'Lets get started'}</Subtitle>
        </TextWrapper>
      </Wrapper>
    </Link>
  );
};

const Wrapper = styled.div`
  width: 280px;
  height: 75px;
  padding: 12px;
  background: linear-gradient(180deg, #ffffff 0%, #d9dfff 100%);
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
    0px 20px 40px rgba(23, 0, 102, 0.2),
    inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  display: grid;
  grid-template-columns: 53px auto;
  align-items: center;
  gap: 15px;

  *,
  & {
    transition: all 0.8s cubic-bezier(0.075, 0.82, 0.165, 1);
  }

  :hover {
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
      0px 30px 60px rgba(23, 0, 102, 0.4),
      inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.5);
    transform: translateY(-3px);
  }

  :active {
    transform: translateY(0px);
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
      0px 25px 45px rgba(23, 0, 102, 0.4),
      inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.5);
  }
`;

const IconWrapper = styled.div`
  width: 45px;
  height: 45px;
  background: linear-gradient(200.44deg, #4316db 13.57%, #9076e7 98.38%);
  box-shadow: 0px 10px 20px rgba(182, 153, 255, 0.3);
  border-radius: 50%;
  display: grid;
  justify-content: center;
  align-content: center;
  justify-self: center;
  position: relative;

  ${Wrapper}:hover & {
    filter: hue-rotate(8deg) brightness(110%) saturate(115%);
  }
`;

const Icon = styled.img`
  width: 25px;
  height: 25px;

  ${Wrapper}:hover & {
    transform: scale(1.2);
  }
`;

const Ring = styled.img`
  position: absolute;
  left: -16px;
  top: -15px;

  ${Wrapper}:hover & {
    transform: scale(1.1) rotate(30deg) translate(1px, 1.5px);
  }
`;

const TextWrapper = styled.div`
  display: grid;
  gap: 2px;
`;

const Title = styled(Caption2)`
  color: black;
`;

const Subtitle = styled(SmallText)`
  color: black;
  opacity: 0.7;
`;

export default GetStartedButton;
