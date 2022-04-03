import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../styles/ColorStyles';
import { BodyIntro, Caption } from '../styles/TextStyles';
import FilePreview from './FilePreview';
import arrow from '../../assets/icons/arrow.svg';

const UploadContainer = ({
  file,
  setFile,
  inputRef,
  handleUpload,
  setFinishedUploading,
}) => {
  const [dragging, setDragging] = useState(false);

  return (
    <Wrapper file={file ? true : false}>
      <UploadForm
        dragging={dragging}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setFile(e.dataTransfer.files[0]);
          setDragging(false);
        }}
      >
        <input
          ref={inputRef}
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <TextContainer>
          {!dragging && (
            <>
              <BodyIntro>
                Drag and drop <AccentSpan>images</AccentSpan>,{' '}
                <AccentSpan>videos</AccentSpan> or any{' '}
                <AccentSpan>file</AccentSpan>
              </BodyIntro>
              <Caption>
                or{' '}
                <BrowseButton onClick={() => inputRef.current.click()}>
                  browse files
                </BrowseButton>{' '}
                on your computer
              </Caption>
            </>
          )}
          {dragging && (
            <BodyIntro>
              Drop'em right <AccentSpan>here</AccentSpan> and your're{' '}
              <AccentSpan>good</AccentSpan> to go.
            </BodyIntro>
          )}
        </TextContainer>
      </UploadForm>

      {file && (
        <FilePreview inputRef={inputRef} file={file} setFile={setFile} />
      )}

      <UploadButton type="button" onClick={handleUpload}>
        Upload
        <img src={arrow} alt="Arrow icon" />
      </UploadButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 520px;
  display: grid;
  min-height: ${(p) => (p.file ? '380px' : '360px')};
  gap: ${(p) => (p.file ? '30px' : '40px')};
  grid-template-columns: 450px;
  justify-content: center;
  border-radius: 40px;
  padding: 40px 30px 30px;
  box-shadow: rgb(47 184 255 / 30%) 0px 10px 40px,
    inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.5);
  background: rgba(25, 26, 67, 0.4);
  backdrop-filter: blur(40px);
`;

const UploadForm = styled.div`
  text-align: center;
  border: dashed 3px rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  padding: ${(p) => (p.dragging ? '50px 50px 30px' : '30px 20px 40px')};
  background: rgba(25, 26, 67, 0.2);

  input {
    display: none;
  }
`;

const AccentSpan = styled.span`
  color: ${COLORS.secondary1};
`;

const TextContainer = styled.div`
  margin: 0 auto;
  font-weight: 700;
  max-width: 300px;
  display: grid;
  gap: 20px;
  color: ${COLORS.text3};
`;

const BrowseButton = styled.button`
  font-weight: 600;
  font-size: 17px;
  cursor: pointer;
  background: none;
  outline: none;
  border: none;
  color: ${COLORS.secondary1};
  border-bottom: 3px solid ${COLORS.secondary1};
`;

const UploadButton = styled.button`
  width: 250px;
  font-size: 15px;
  text-transform: uppercase;
  font-weight: 700;
  margin: 0 auto;
  justify-self: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(248, 248, 255, 0.9);
  color: black;
  border: 1px solid transparent;
  padding: 6px 20px;
  border-radius: 100px;
  transition: all 0.2s;

  p {
    margin-right: 5px;
    text-align: center;
  }

  img {
    transition: transform 0.2s ease-in-out;
    width: 34px;
    margin-left: 6px;
  }

  :hover img {
    transform: translateX(5px);
  }

  :active {
    transform: scale(0.95);
  }
`;

export default UploadContainer;
