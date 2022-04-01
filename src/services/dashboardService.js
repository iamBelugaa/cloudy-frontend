import { fetchData } from './httpService';

export const getUserData = (token) => {
  try {
    return fetchData(`/dashboard`, token);
  } catch (error) {
    throw error;
  }
};

export const fetchRecentFiles = async (token) => {
  try {
    return fetchData(`/recent-files`, token);
  } catch (error) {
    throw error;
  }
};

export const deleteFile = (uuid, token) => {
  try {
    return fetchData(`/delete-file`, token, 'DELETE', { uuid });
  } catch (error) {
    throw error;
  }
};

export const clearStorage = (token) => {
  try {
    return fetchData(`/clear-storage`, token, 'DELETE');
  } catch (error) {
    throw error;
  }
};
