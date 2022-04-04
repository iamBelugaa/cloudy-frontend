import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import styled from 'styled-components';
import logoutIcon from '../../assets/icons/signout.svg';
import Blob1 from '../../assets/paths/blob_1.svg';
import Blob2 from '../../assets/paths/blob_2.svg';
import { DashboardLinks } from '../../constants';
import HamburgerContext from '../../contexts/HamburgerContext';
import { getTokenFromLocalstorage, toastify } from '../../utils';
import MenuButton from '../buttons/MenuButton';
import Storage from '../Dashboard/Storage';
import { COLORS } from '../styles/ColorStyles';
import { H2, MediumText } from '../styles/TextStyles';
import stars from '../../assets/illustrations/stars.svg';
import { useUser } from '../../hooks/useUser';

const DashboardIndex = ({ children }) => {
  const token = getTokenFromLocalstorage('uAccessToken');
  const [user, error] = useUser(token);
  const history = useHistory();
  const timeRef = useRef();

  useEffect(
    () =>
      (document.title = user
        ? `${user.displayName} - Dashboard`
        : 'Welcome to your Dashboard'),
    [user]
  );

  useEffect(() => clearTimeout(timeRef.current), []);

  if (error) {
    localStorage.removeItem('uAccessToken');
    return history.push('/login');
  }

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
              <DisplayName>{user && user.displayName} • </DisplayName>
              <LogoutButton
                onClick={() => {
                  window.localStorage.removeItem('uAccessToken');
                  toastify('Logged out.');
                  timeRef.current = setTimeout(
                    () => history.push('/login'),
                    2000
                  );
                }}
              >
                <img src={logoutIcon} alt="Logout icon" />
              </LogoutButton>
            </UserInfo>
          </SideBar>

          <MainContent>{children}</MainContent>

          <OverviewWrapper>
            {user && (
              <Storage
                filesCount={user.filesCount}
                storageInfo={{
                  activeStorage: user.activeStorage,
                  activeFiles: user.activeFiles,
                }}
              />
            )}
          </OverviewWrapper>
        </DashboardWrapper>
        <Toaster />
      </Wrapper>
    </HamburgerContext>
  );
};

const Wrapper = styled.main`
  background: url(${stars}), linear-gradient(180deg, #191a43 0%, #442d85 100%);
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
  max-width: 400px;
  border-radius: 0px 20px 20px 0px;
  grid-area: overview;
`;

export default DashboardIndex;
