import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FileAttributes } from '../../constants';
import { postData as deleteFile } from '../../services/httpService';
import { getTokenFromLocalstorage, toastify } from '../../utils';
import { COLORS } from '../styles/ColorStyles';
import { Caption, SmallText } from '../styles/TextStyles';
import File from './File';

const FilesIndex = ({ files, setFiles, deleteFileUrl }) => {
  const originalFiles = files;

  const handleDelete = (uuid) => {
    setFiles((files) => files.filter((f) => f.uuid !== uuid));

    deleteFile(
      deleteFileUrl,
      getTokenFromLocalstorage('uAccessToken'),
      { uuid },
      'DELETE'
    )
      .then(() => toastify('File deleted.'))
      .catch((error) => {
        toastify(error.message);
        setFiles(originalFiles);
      });
  };

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

        {files?.length === 0 && (
          <Info style={{ marginTop: '150px' }}>
            <Title>No files found.</Title>
            <Description>
              Cloudy has you covered allowing for all file types to be shared.
              Cloudy store all your important files in one secure location.
              Wherever you need, share and collaborate with friends, family and
              Co-Workers.
            </Description>
          </Info>
        )}

        <div>
          {files?.length > 0 && (
            <Files>
              {files.map((file) => (
                <File file={file} key={file.uuid} handleDelete={handleDelete} />
              ))}
            </Files>
          )}
        </div>
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
  grid-template-columns: 2.5fr repeat(${(p) => p.count - 2}, 1fr) 1.3fr repeat(
      2,
      50px
    );
  padding-left: 15px;
  padding-right: 15px;
  color: ${COLORS.text4};

  p {
    font-size: 14px;
  }
`;

const Info = styled.div`
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
