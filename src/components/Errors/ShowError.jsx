import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../styles/ColorStyles';
import { BodyIntro, MediumText } from '../styles/TextStyles';

const ShowError = ({ message, illustration }) => {
  return (
    <Wrapper>
      <IllustrationWrapper>
        <Illustration src={illustration} alt="Error Illustration" />
      </IllustrationWrapper>
      <ErrorText>Oops! An Error Occured.</ErrorText>
      <ErrorSubtext>{message}</ErrorSubtext>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  display: grid;
  gap: 10px;
  grid-template-columns: 450px;
  justify-content: center;
  align-content: center;
  margin-top: -40px;
`;

const IllustrationWrapper = styled.div`
  max-width: 450px;
  margin-bottom: -30px;
`;

const Illustration = styled.img``;

const ErrorText = styled(BodyIntro)`
  text-align: center;
`;

const ErrorSubtext = styled(MediumText)`
  text-align: center;
  color: ${COLORS.text4};
`;

export default ShowError;
