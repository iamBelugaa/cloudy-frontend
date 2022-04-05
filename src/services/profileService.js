import { fetchData, postData } from './httpService';

export const getProfile = (url, token) => {
  try {
    return fetchData(url, token);
  } catch (error) {
    throw error;
  }
};

export const changePersonalInfo = (url, token, body) => {
  try {
    return postData(url, token, body, 'POST');
  } catch (error) {
    throw error;
  }
};

export const changePassword = (url, token, body) => {
  try {
    return postData(url, token, body, 'POST');
  } catch (error) {
    throw error;
  }
};

export const deleteAccount = (url, token) => {
  try {
    return fetchData(url, token, '', 'DELETE');
  } catch (error) {
    throw error;
  }
};
