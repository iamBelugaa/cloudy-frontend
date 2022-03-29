import React from 'react';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import docIcon from '../../assets/icons/doc.svg';
import imageIcon from '../../assets/icons/image.svg';
import trashIcon from '../../assets/icons/trash.svg';
import videoIcon from '../../assets/icons/video.svg';
import { clearStorage } from '../../services/dashboardService';
import { formatBytes, getTokenFromLocalstorage, toastify } from '../../utils';
import { H3, MediumText, SmallText } from '../styles/TextStyles';

const Storage = ({ filesCount, storageInfo }) => {
  const token = getTokenFromLocalstorage();

  const data = [
    { name: 'Images', icon: imageIcon, count: filesCount.imagesCount },
    { name: 'Videos', icon: videoIcon, count: filesCount.videosCount },
    { name: 'Music', icon: videoIcon, count: filesCount.musicCount },
    { name: 'Documents', icon: docIcon, count: filesCount.othersCount },
  ];

  const handleClearStorage = async () => {
    try {
      const message = await clearStorage(token);
      if (!message) return;
      toastify(message);
    } catch (error) {
      toastify(error.message, 'error');
    }
  };

  return (
    <Wrapper>
      <Title>Storage Information</Title>
      <FilesCountWrapper>
        <StorageInfo>
          <SmallText>
            Storage •{' '}
            {formatBytes(
              storageInfo?.activeStorage ? storageInfo.activeStorage : 0
            )}
          </SmallText>
          <SmallText>
            Files •{' '}
            {storageInfo.activeFiles === 1
              ? `${storageInfo.activeFiles} File`
              : `${storageInfo.activeFiles} Files`}
          </SmallText>
        </StorageInfo>

        {data.map((item) => (
          <FileCount key={item.name}>
            <div>
              <Icon src={item.icon} alt={item.name + ' icon'} />
              <SmallText>{item.name}</SmallText>
            </div>
            <SmallText>
              {item.count === 1 ? `${item.count} File` : `${item.count} Files`}
            </SmallText>
          </FileCount>
        ))}
      </FilesCountWrapper>
      <DangerZone>
        <div>
          <Description>Clear Storage?</Description>
          <SmallText>
            This operation will remove all your files and it cann't be undone.
          </SmallText>
        </div>
        <Button onClick={handleClearStorage}>
          <Icon src={trashIcon} alt="Trash icon" />
          <MediumText>Clear Storage</MediumText>
        </Button>
      </DangerZone>

      <SmallText style={{ textAlign: 'center' }}>
        &copy; {new Date().getFullYear()} Cloudy
      </SmallText>
      <ToastContainer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 40px 20px;
  display: grid;
  gap: 45px;
`;

const Title = styled(H3)`
  background: linear-gradient(0deg, #ffffff, #ffffff),
    linear-gradient(
      180deg,
      rgba(77, 34, 221, 0.4) 0%,
      rgba(101, 89, 209, 0.4) 100%
    );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-blend-mode: overlay, normal;
  text-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
`;

const FilesCountWrapper = styled.div`
  display: grid;
  gap: 25px;
  padding-left: 40px;
  padding-right: 40px;
`;

const StorageInfo = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;
`;

const FileCount = styled.div`
  display: grid;
  justify-content: space-between;
  gap: 30px;
  grid-template-columns: repeat(2, auto);
  align-items: center;
`;

const Icon = styled.img`
  padding: 5px;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15),
    inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.2);
  border-radius: 10px;
`;

const DangerZone = styled.div`
  display: grid;
  gap: 30px;

  div {
    display: grid;
    gap: 10px;
  }
`;

const Description = styled(MediumText)`
  font-weight: 600;
  color: #f85149;
`;

const Button = styled.button`
  width: 280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 10px;
  justify-content: center;
  align-items: center;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  border-radius: 50px;
  background-size: 300% 100%;
  background: #b1dae7;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.7s cubic-bezier(0.075, 0.82, 0.165, 1);

  :hover {
    background-position: 100% 0;
    transform: translateY(-3px);
    box-shadow: 0 10px 35px 0 rgba(0, 0, 0, 0.15);
  }

  :active {
    transform: translateY(0px);
    box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.15);
  }

  img {
    width: 30px;
  }

  p {
    filter: drop-shadow(0 0 10px);
  }
`;

export default Storage;
