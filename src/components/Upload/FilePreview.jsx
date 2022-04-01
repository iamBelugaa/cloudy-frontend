import React from 'react';
import styled from 'styled-components';
import { formatBytes, getSmallerFileName } from '../../utils';
import { SmallText } from '../styles/TextStyles';
import closeButton from '../../assets/icons/x.svg';
import { COLORS } from '../styles/ColorStyles';

const FilePreview = ({ file, inputRef, setFile }) => {
  return (
    <Wrapper>
      <div>
        <SmallText style={{ fontWeight: 500 }}>
          {getSmallerFileName(file.name)} •{' '}
        </SmallText>
        <SmallText style={{ fontWeight: 500 }}>
          {formatBytes(file.size)}
        </SmallText>
      </div>
      <CloseButton
        src={closeButton}
        alt="X icon"
        onClick={() => {
          inputRef.current.value = '';
          setFile(null);
        }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 400px;
  justify-self: center;
  display: grid;
  grid-template-columns: 300px auto;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 10px 10px 10px 20px;
  border-radius: 10px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
    0px 20px 40px rgba(23, 0, 102, 0.2),
    inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.5);

  div {
    color: ${COLORS.text3};
    font-weight: 600;
    display: grid;
    grid-template-columns: auto auto;
    justify-content: start;
    align-items: baseline;
    gap: 5px;
  }
`;

const CloseButton = styled.img`
  cursor: pointer;
  padding: 7px;
  border-radius: 50%;
`;

export default FilePreview;
