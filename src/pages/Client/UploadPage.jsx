import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import DashboardIndex from '../../components/Dashboard/DashboardIndex';
import { COLORS } from '../../components/styles/ColorStyles';
import ProgressContainer from '../../components/Upload/ProgressContainer';
import UploadContainer from '../../components/Upload/UploadContainer';
import SucessBox from '../../components/Upload/SucessBox';
import { uploadFile } from '../../services/uploadService';
import { getTokenFromLocalstorage, toastify } from '../../utils';
import config from '../../config.json';
const MAX_ALLOWED_SIZE = 100 * 1024 * 1024; /* ---- 100MB -----  */

const Upload = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [finishedUploading, setFinishedUploading] = useState(false);
  const [uid, setUid] = useState(null);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef();
  const token = getTokenFromLocalstorage();

  const handleUpload = async (e) => {
    try {
      if (!file) return;

      if (file.size > MAX_ALLOWED_SIZE)
        return toastify('Maz allowed size is 100MB.', 'error');

      setIsUploading(true);
      await uploadFile(file, token, setProgress, setFinishedUploading, setUid);
    } catch (error) {
      toastify(error.message);
    }
  };

  const reset = () => {
    setFile(null);
    setFinishedUploading(false);
    setIsUploading(false);
    setUid(null);
    setProgress(0);
  };

  const sendMail = async (email) => {
    if (!email) return;

    fetch(`${config.apiEndpoint}/mail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ uuid: uid, emailTo: email }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 'ok') {
          toastify(`Email sent.`);
          reset();
        }
      })
      .catch((error) => toastify(error.message, 'error'));
  };

  return (
    <DashboardIndex>
      <Wrapper>
        {!isUploading && !finishedUploading && (
          <UploadContainer
            file={file}
            setFile={setFile}
            inputRef={inputRef}
            handleUpload={handleUpload}
          />
        )}
        {isUploading && !finishedUploading && file && (
          <ProgressContainer progress={progress} />
        )}
        {finishedUploading && uid && (
          <SucessBox uid={uid} sendMail={sendMail} resetState={reset} />
        )}
      </Wrapper>
    </DashboardIndex>
  );
};

const Wrapper = styled.section`
  height: 100%;
  color: ${COLORS.text1};
  display: grid;
  justify-content: center;
  align-content: center;
  position: relative;
`;

export default Upload;
