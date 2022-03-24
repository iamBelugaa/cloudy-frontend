import { toast } from 'react-toastify';

export const toastify = (message, type = 'success', theme = 'dark') =>
  toast(message, {
    position: 'bottom-center',
    theme,
    type,
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
