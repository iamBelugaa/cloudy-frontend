import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { formatBytes, getSmallerFileName } from '../../utils';
import downloadIcon from '../../assets/icons/download.svg';
import trashIcon from '../../assets/icons/trash.svg';

const File = ({ file, handleDelete }) => {
  return (
    <article>
      <Wrapper>
        <p>{getSmallerFileName(file.originalName)}</p>
        <p>{formatBytes(file.fileSize)}</p>
        <p>{file.extension.split('.')[1].toUpperCase()}</p>
        <p>{new Date(file.createdAt).toDateString()}</p>
        <Link to={`/download/${file.uuid}`} target="_blank">
          <img src={downloadIcon} alt="Download icon" />
        </Link>
        <img
          src={trashIcon}
          alt="Trash icon"
          style={{ marginLeft: 'auto' }}
          onClick={() => handleDelete(file.uuid)}
        />
      </Wrapper>
    </article>
  );
};

const Wrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 2.5fr repeat(3, 1fr) repeat(2, 50px);
  padding: 14px 15px 13px 15px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1),
    inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  position: relative;

  p {
    font-size: 14px;
  }

  a {
    color: inherit;
    margin-left: auto;
  }

  img {
    width: 22px;
    cursor: pointer;
  }
`;

export default File;
