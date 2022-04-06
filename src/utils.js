import _ from 'lodash';
import toast from 'react-hot-toast';
import config from './config.json';

export const toastify = (
  message,
  type = 'success',
  duration = 1800,
  position = 'top-center'
) =>
  toast(message, {
    position,
    type,
    duration,
  });

// **************** Formatting The Size Of The File **************** //
export function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';

  const kbToByte = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const size = Math.floor(Math.log(bytes) / Math.log(kbToByte));

  return (
    parseFloat((bytes / Math.pow(kbToByte, size)).toFixed(2)) +
    ' ' +
    sizes[size]
  );
}

// **************** Compress The File Name **************** //
export function getSmallerFileName(filename) {
  if (filename.length > 20) {
    const length = filename.length;
    return `${filename.slice(0, 15)}...${filename.slice(length - 5, length)}`;
  }
  return filename;
}

export const setTokenInLocalStorage = (key, token) =>
  localStorage.setItem(key, JSON.stringify(token));

export const getTokenFromLocalstorage = () =>
  JSON.parse(localStorage.getItem('sidToken') || '');

export const paginate = (items, pageSize, pageNumber) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
};

export const userEndpoints = {
  register: `${config.userApiEndpoint}/register`,
  login: `${config.userApiEndpoint}/login`,
  dashboard: `${config.userApiEndpoint}/dashboard`,
  upload: `${config.userApiEndpoint}/upload`,
  mail: `${config.userApiEndpoint}/mail`,
  profile: `${config.userApiEndpoint}/profile`,
  changeInfo: `${config.userApiEndpoint}/change-info`,
  deleteAccount: `${config.userApiEndpoint}/delete-account`,
  changePassword: `${config.userApiEndpoint}/change-password`,
  clearStorage: `${config.userApiEndpoint}/clear-storage`,
  recentFiles: `${config.userApiEndpoint}/recent-files`,
  allFiles: `${config.userApiEndpoint}/files`,
  images: `${config.userApiEndpoint}/images`,
  videos: `${config.userApiEndpoint}/videos`,
  music: `${config.userApiEndpoint}/music`,
  others: `${config.userApiEndpoint}/others`,
  deleteFile: `${config.userApiEndpoint}/delete-file`,
};

export const adminEndpoints = {
  login: `${config.adminApiEndpoint}/login`,
  dashboard: `${config.adminApiEndpoint}/dashboard`,
  profile: `${config.adminApiEndpoint}/profile`,
  changeInfo: `${config.adminApiEndpoint}/change-info`,
  deleteAccount: `${config.adminApiEndpoint}/delete-account`,
  changePassword: `${config.adminApiEndpoint}/change-password`,
  recentFiles: `${config.adminApiEndpoint}/recent-files`,
  allFiles: `${config.adminApiEndpoint}/files`,
  images: `${config.adminApiEndpoint}/images`,
  videos: `${config.adminApiEndpoint}/videos`,
  music: `${config.adminApiEndpoint}/music`,
  others: `${config.adminApiEndpoint}/others`,
  deleteFile: `${config.adminApiEndpoint}/delete-file`,
};
