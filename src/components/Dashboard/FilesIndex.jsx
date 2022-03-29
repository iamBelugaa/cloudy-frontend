import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Caption, SmallText } from '../styles/TextStyles';
import File from './File';
import { FileAttributes } from '../../constants';
import { COLORS } from '../styles/ColorStyles';
import Loading from '../Loading/TextLoading';
import { getTokenFromLocalstorage } from '../../utils';
import { useHistory } from 'react-router-dom';
import { fetchRecentFiles } from '../../services/dashboardService';
import ShowError from '../Errors/ShowError';

const FilesIndex = () => {
  const [files, setFiles] = useState(null);
  const [error, setError] = useState(null);
  const token = getTokenFromLocalstorage();
  const history = useHistory();

  useEffect(() => {
    if (!token) {
      localStorage.removeItem('uAccessToken');
      return history.push('/login');
    }

    fetchRecentFiles(token)
      .then((files) => {
        if (!files) return;

        setError(null);
        setFiles(files);
      })
      .catch((error) => setError(error.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <TextWrapper>
        <Title>Recent Files</Title>
        <Link to="/files">
          <ViewAll>View All</ViewAll>
        </Link>
      </TextWrapper>
      <FilesWrapper>
        <AttributesTable count={FileAttributes.length}>
          {FileAttributes.map((att) => (
            <p key={att}>{att}</p>
          ))}
        </AttributesTable>

        {!files && !error && <Loading />}
        {error && <ShowError />}

        {files?.length === 0 && (
          <RecentFilesDesciption>
            <Title>No files found.</Title>
            <Description>
              Cloudy has you covered allowing for all file types to be shared.
              Cloudy store all your important files in one secure location.
              Wherever you need, share and collaborate with friends, family and
              Co-Workers.
            </Description>
          </RecentFilesDesciption>
        )}

        {files?.length > 0 && (
          <Files>
            {files.map((file) => (
              <File file={file} key={file.uuid} />
            ))}
          </Files>
        )}
      </FilesWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  gap: 40px;
`;

const TextWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 50px;

  a {
    margin-left: auto;
    color: inherit;
  }
`;

const Title = styled(Caption)`
  font-weight: 600;
`;

const ViewAll = styled(Caption)`
  font-weight: 600;
`;

const FilesWrapper = styled.div`
  display: grid;
  gap: 20px;
`;

const AttributesTable = styled.div`
  display: grid;
  grid-template-columns: 2fr repeat(${(p) => p.count}, 1fr);
  padding-left: 15px;
  padding-right: 15px;
  color: ${COLORS.text4};

  p {
    font-size: 14px;
  }
`;

const RecentFilesDesciption = styled.div`
  text-align: center;
  max-width: 450px;
  margin: 30px auto;
  display: grid;
  gap: 15px;
`;

const Description = styled(SmallText)`
  color: ${COLORS.text4};
`;

const Files = styled.div`
  display: grid;
  gap: 10px;
`;

export default FilesIndex;
