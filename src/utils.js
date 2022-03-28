import { Slide, toast } from 'react-toastify';

export const toastify = (message, type = 'success', theme = 'dark') =>
  toast(message, {
    position: 'bottom-right',
    theme,
    type,
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    transition: Slide,
  });

// **************** Formatting The Size Of The File **************** //
export function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';

  const kbToByte = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
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
    return `${filename.slice(0, 20)}...${filename.slice(length - 10, length)}`;
  }
  return filename;
}

export const setTokenInLocalStorage = (key, token) =>
  localStorage.setItem(key, JSON.stringify(token));

export const getTokenFromLocalstorage = () =>
  JSON.parse(localStorage.getItem('uAccessToken') || '');
