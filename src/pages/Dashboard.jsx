import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import logoutIcon from '../assets/icons/signout.svg';
import AirBallon from '../assets/illustrations/error-air-balloon.svg';
import Blob1 from '../assets/paths/blob_1.svg';
import Blob2 from '../assets/paths/blob_2.svg';
import MenuButton from '../components/buttons/MenuButton';
import RecentFiles from '../components/Dashboard/FilesIndex';
import Storage from '../components/Dashboard/Storage';
import ShowError from '../components/Errors/ShowError';
import { default as TextLoading } from '../components/Loading/TextLoading';
import { COLORS } from '../components/styles/ColorStyles';
import { H2, MediumText } from '../components/styles/TextStyles';
import { DashboardLinks } from '../constants';
import HamburgerContext from '../contexts/HamburgerContext';
import { getUserData } from '../services/dashboardService';

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const token = JSON.parse(localStorage.getItem('uAccessToken') || '');
  const history = useHistory();

  useEffect(() => {
    if (!token) {
      localStorage.removeItem('uAccessToken');
      return history.push('/login');
    }

    getUserData(token)
      .then((data) => {
        if (!data) return;
        setError(null);
        setUserInfo(data);
      })
      .catch((error) => setError(error.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HamburgerContext>
      <Wrapper>
        <Blob src={Blob1} alt="Blob 1" />
        <Blob src={Blob2} alt="Blob 2" />

        <DashboardWrapper>
          <SideBar count={DashboardLinks.length}>
            <Navigation>
              <Logo>Cloudy</Logo>
              <Links>
                {DashboardLinks.map((item, index) => (
                  <MenuButton item={item} key={index} />
                ))}
              </Links>
            </Navigation>
            <UserInfo>
              <DisplayName>{userInfo && userInfo.displayName} • </DisplayName>
              <LogoutButton
                onClick={() => {
                  window.localStorage.removeItem('uAccessToken');
                  history.push('/login');
                }}
              >
                <img src={logoutIcon} alt="Logout icon" />
              </LogoutButton>
            </UserInfo>
          </SideBar>

          <MainContent>
            {!userInfo && !error && <TextLoading />}
            {error && <ShowError illustration={AirBallon} message={error} />}
            {!error && <RecentFiles />}
          </MainContent>

          <OverviewWrapper>
            {!userInfo && <TextLoading />}{' '}
            {userInfo && (
              <Storage
                filesCount={userInfo.filesCount}
                storageInfo={{
                  activeStorage: userInfo.activeStorage,
                  activeFiles: userInfo.activeFiles,
                }}
              />
            )}
          </OverviewWrapper>
        </DashboardWrapper>
      </Wrapper>
    </HamburgerContext>
  );
};

const Wrapper = styled.main`
  background: linear-gradient(180deg, #343563 0%, #4926ad 100%);
  backdrop-filter: blur(50px);
  color: ${COLORS.text3};
  padding: 40px 50px;
  position: relative;
  overflow-x: hidden;
`;

const Blob = styled.img`
  position: absolute;

  :first-of-type {
    width: 1508px;
    height: 1300px;
    left: -431px;
    top: -669px;
    transform: rotate(2deg);
    z-index: -1;

    @media (max-width: 860px) {
      width: 1700px;
      height: 2000px;
      top: -600px;
    }
  }

  :nth-of-type(2) {
    width: 1763px;
    height: 1300px;
    left: 119px;
    top: -873px;
    transform: rotate(20deg);
    z-index: -2;
  }
`;

const DashboardWrapper = styled.div`
  max-width: 1440px;
  height: 715px;
  margin: 0 auto;
  background: rgba(50, 61, 109, 0.5);
  border: 0.5px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0px 50px 100px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(40px);
  border-radius: 20px;
  display: grid;
  grid-template-areas: 'sidebar main overview';
  grid-template-columns: 240px 800px auto;
  grid-template-rows: repeat(3, 100%);
`;

const SideBar = styled.nav`
  max-width: 240px;
  border-radius: 20px 0px 0px 20px;
  border-right: 0.5px solid rgba(255, 255, 255, 0.3);
  grid-area: sidebar;
  display: grid;
  grid-template-rows: 300px 50px;
  align-content: space-between;
  gap: 100px;
  padding: 30px 20px 30px;
`;

const Navigation = styled.div`
  display: grid;
  gap: 100px;
`;

const Logo = styled(H2)`
  padding: 10px 0px;
  text-align: center;
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

const Links = styled.div`
  display: grid;
  grid-template-rows: repeat(${(p) => p.count}, 50px);
  gap: 10px;
`;

const UserInfo = styled.div`
  max-width: 210px;
  display: grid;
  grid-template-columns: auto 45px;
  align-items: center;
  padding: 5px 5px 5px 15px;
  gap: 20px;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15),
    inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.2);
  border-radius: 10px;
`;

const DisplayName = styled(MediumText)`
  height: 40px;
  display: flex;
  align-items: center;
`;

const LogoutButton = styled.button`
  height: 40px;
  border: none;
  cursor: pointer;
  background: none;
`;

const MainContent = styled.div`
  grid-area: main;
  max-width: 800px;
  border-right: 0.5px solid rgba(255, 255, 255, 0.3);
  padding: 30px;
`;

const OverviewWrapper = styled.div`
  border-radius: 0px 20px 20px 0px;
  grid-area: overview;
`;

export default Dashboard;
