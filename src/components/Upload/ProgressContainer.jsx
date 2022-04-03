import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../styles/ColorStyles';
import { BodyMain, Caption, SmallText } from '../styles/TextStyles';

const ProgressContainer = ({ progress }) => {
  return (
    <Wrapper>
      <Progress>
        <BodyMain>Uploading...</BodyMain>
        <ProgressBar progress={progress} />
        <Caption>{progress}%</Caption>
      </Progress>
      <SmallText style={{ color: COLORS.text4, fontWeight: 500 }}>
        Note : Your file is currently uploading. Don't close the browser window
        or refresh the page or file will not be uploaded.
      </SmallText>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 450px;
  height: 170px;
  border-radius: 20px;
  padding: 30px;
  display: grid;
  gap: 30px;
  align-content: center;
  color: ${COLORS.text3};
  box-shadow: rgb(47 184 255 / 30%) 0px 10px 40px,
    inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.5);
  background: rgba(25, 26, 67, 0.4);
  backdrop-filter: blur(40px);
`;

const ProgressBar = styled.div`
  width: ${(p) => +p.progress + '%'};
  height: ${(p) => (p.progress ? '8px' : '0px')};
  background-color: ${(p) => (p.progress ? COLORS.primary1 : 'none')};
  border-radius: 10px;
  transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
`;

const Progress = styled.div`
  display: grid;
  gap: 8px;
`;

export default ProgressContainer;
