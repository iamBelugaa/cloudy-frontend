import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../styles/ColorStyles';
import { BodyIntro, Caption } from '../styles/TextStyles';
import FilePreview from './FilePreview';

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
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
    0px 20px 40px rgba(23, 0, 102, 0.25),
    inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.5);
`;

const UploadForm = styled.div`
  text-align: center;
  border: dashed 3px rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  padding: ${(p) => (p.dragging ? '50px 50px 30px' : '30px 20px 40px')};

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
  width: 200px;
  height: 44px;
  font-weight: 500;
  font-size: 17px;
  padding: 10px 30px;
  justify-self: center;
  cursor: pointer;
  border: none;
  outline: none;
  background: linear-gradient(91.4deg, #2fb8ff 0%, #9eecd9 100%);
  border-radius: 40px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
    0px 20px 40px rgba(23, 0, 102, 0.2);
  transition: all 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);

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

export default UploadContainer;
