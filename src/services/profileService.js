import { fetchData } from './httpService';

export const getProfile = (token) => {
  try {
    return fetchData(`/profile`, token);
  } catch (error) {
    throw error;
  }
};

export const changePersonalInfo = (token, body) => {
  try {
    return fetchData('/change-info', token, 'POST', body);
  } catch (error) {
    throw error;
  }
};

export const changePassword = (token, body) => {
  try {
    return fetchData('/change-password', token, 'POST', body);
  } catch (error) {
    throw error;
  }
};

export const deleteAccount = (token) => {
  try {
    return fetchData('/delete-account', token, 'DELETE');
  } catch (error) {
    throw error;
  }
};
