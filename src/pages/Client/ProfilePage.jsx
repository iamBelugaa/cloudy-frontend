import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Account from '../../assets/icons/account.svg';
import Lock from '../../assets/icons/lock.svg';
import Mail from '../../assets/icons/mail.svg';
import errorTrash from '../../assets/illustrations/error-trash.svg';
import CtaButton from '../../components/buttons/CtaButton';
import DashboardIndex from '../../components/Dashboard/DashboardIndex';
import ShowError from '../../components/Errors/ShowError';
import Loading from '../../components/Loading/TextLoading';
import { COLORS } from '../../components/styles/ColorStyles';
import {
  BodyIntro,
  MediumText,
  SmallText,
} from '../../components/styles/TextStyles';
import { useProfile } from '../../hooks/useProfile';
import {
  changePassword,
  changePersonalInfo,
  deleteAccount,
} from '../../services/profileService';
import {
  getTokenFromLocalstorage,
  setTokenInLocalStorage,
  toastify,
} from '../../utils';

const ProfilePage = () => {
  const [profile, error] = useProfile();
  const [personalInfo, setPersonalInfo] = useState({
    displayName: profile?.displayName | '',
    email: profile?.email || '',
  });
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
  });
  const timeRef = useRef();
  const history = useHistory();
  const token = getTokenFromLocalstorage('uAccessToken');

  useEffect(() => {
    setPersonalInfo({ ...profile });

    return () => clearTimeout(timeRef.current);
  }, [profile]);

  const handleInfoChange = async (e) => {
    e.preventDefault();

    if (
      personalInfo.displayName === profile.displayName &&
      personalInfo.email === profile.email
    )
      return toastify('Display and email must be different.', 'error');

    changePersonalInfo(token, {
      displayName: personalInfo.displayName,
      email: personalInfo.email,
    })
      .then((accessToken) => {
        setTokenInLocalStorage('uAccessToken', accessToken);
        toastify('Information updated.');
      })
      .catch(({ message }) => toastify(error.message, 'error'));
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (passwords.currentPassword === passwords.newPassword)
      return toastify('New password  must be different.', 'error');

    changePassword(token, {
      currentPassword: passwords.currentPassword,
      newPassword: passwords.newPassword,
    })
      .then((accessToken) => {
        setTokenInLocalStorage('uAccessToken', accessToken);
        toastify('Password updated.');
      })
      .catch(({ message }) => toastify(error.message, 'error'));
  };

  const handleDeleteAccount = () => {
    deleteAccount(token)
      .then(() => {
        toastify('Accout deleted.');
        localStorage.removeItem('uAccessToken');
        timeRef.current = setTimeout(() => history.push('/login'), 1800);
      })
      .catch(({ message }) => toastify(message, 'error'));
  };

  return (
    <DashboardIndex>
      <Wrapper>
        {!profile && !error && <Loading />}
        {error && <ShowError illustration={errorTrash} message={error} />}
        {profile && !error && (
          <>
            <BodyIntro style={{ color: COLORS.text4 }}>EDIT PROFILE</BodyIntro>
            <FormWrapper onSubmit={handleInfoChange}>
              <MediumText style={{ color: COLORS.text4 }}>
                Personal Information
              </MediumText>
              <div>
                <InputWrapper>
                  <Icon src={Account} alt="Account icon" />
                  <input
                    type="text"
                    value={personalInfo.displayName}
                    onChange={(e) =>
                      setPersonalInfo((form) => ({
                        ...form,
                        displayName: e.target.value,
                      }))
                    }
                  />
                </InputWrapper>

                <InputWrapper>
                  <Icon src={Mail} alt="Mail icon" />
                  <input
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) =>
                      setPersonalInfo((form) => ({
                        ...form,
                        email: e.target.value,
                      }))
                    }
                  />
                </InputWrapper>
              </div>
              <Button type="submit" title="Update Information" />
            </FormWrapper>
            <FormWrapper onSubmit={handlePasswordChange}>
              <MediumText style={{ color: COLORS.text4 }}>
                Update Password
              </MediumText>
              <div>
                <InputWrapper>
                  <Icon src={Lock} alt="Lock icon" />
                  <input
                    type="password"
                    value={passwords.currentPassword}
                    placeholder="Current Password..."
                    onChange={(e) =>
                      setPasswords((passwords) => ({
                        ...passwords,
                        currentPassword: e.target.value,
                      }))
                    }
                  />
                </InputWrapper>

                <InputWrapper>
                  <Icon src={Lock} alt="Lock icon" />
                  <input
                    type="password"
                    value={passwords.newPassword}
                    placeholder="New Password..."
                    onChange={(e) =>
                      setPasswords((passwords) => ({
                        ...passwords,
                        newPassword: e.target.value,
                      }))
                    }
                  />
                </InputWrapper>
              </div>
              <Button type="submit" title="Update Password" />
            </FormWrapper>
            <DangerZone>
              <div>
                <MediumText>Delete account?</MediumText>
                <SmallText>
                  Your account will be permanently deleted along with its data.
                  You will lose all of your files and profile information.
                </SmallText>
              </div>
              <Button
                type="button"
                title="Delete Account"
                onClick={handleDeleteAccount}
              />
            </DangerZone>
          </>
        )}
      </Wrapper>
    </DashboardIndex>
  );
};

const Wrapper = styled.div`
  display: grid;
  gap: 35px;
`;

const FormWrapper = styled.form`
  display: grid;
  align-content: center;
  gap: 30px;

  > div {
    display: grid;
    grid-template-columns: repeat(2, auto);
    align-items: center;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  height: 44px;

  input {
    margin: 0;
    font-family: inherit;
    width: 255px;
    height: 100%;
    border: none;
    outline: none;
    padding-left: 60px;
    color: ${COLORS.text3};
    background: linear-gradient(
      180deg,
      rgba(99, 106, 150, 0.4) 0%,
      rgba(182, 186, 214, 0.25) 100%
    );
    border: 0.5px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(40px);
    border-radius: 30px;

    :focus {
      box-shadow: rgb(47 184 255 / 30%) 0px 10px 40px,
        rgb(47 184 255) 0px 0px 0px 1px inset;
    }

    ::placeholder {
      color: ${COLORS.text4};
      font-size: 14px;
      font-weight: 500;
    }

    @media (max-width: 520px) {
      width: 220px;
    }
  }
`;

const Icon = styled.img`
  align-self: center;
  position: absolute;
  left: 10px;
  top: 7px;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 5px;
  border-radius: 50%;
`;

const Button = styled(CtaButton)`
  max-width: 250px;
`;

const DangerZone = styled.div`
  margin-top: 10px;
  display: grid;
  gap: 15px;

  div {
    display: grid;
    gap: 5px;

    p:first-child {
      color: #f85149;
    }
  }
`;

export default ProfilePage;
