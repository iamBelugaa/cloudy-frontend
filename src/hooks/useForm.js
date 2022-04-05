import { useReducer } from 'react';
import { login, register } from '../services/authService';

const reducer = (state, { type, payload }) => {
  if (type === FORM_ACTIONS.updateState)
    return {
      ...state,
      ...payload,
    };

  if (type === FORM_ACTIONS.register) {
    const { displayName, email, password } = payload;

    if (password?.length < 5)
      return { ...state, error: 'Password must be 5 characters long.' };

    if (!displayName || !email || !password)
      return { ...state, error: 'All fields are required.' };

    return (async function () {
      try {
        const response = await register({ email, password, displayName });

        if (response.status === 'error')
          return { ...state, error: response.error };

        return { ...state, userInfo: response.data };
      } catch (error) {
        return { ...state, error: error.message };
      }
    })();
  }

  if (type === FORM_ACTIONS.login) {
    const { email, password, url } = payload;

    if (!email || !password)
      return { ...state, error: 'All fields are required.' };

    return (async function () {
      try {
        const response = await login({ email, password }, url);

        if (response.status === 'error')
          return { ...state, error: response.error };

        return { ...state, userInfo: response.data };
      } catch (error) {
        return { ...state, error: error.message };
      }
    })();
  }

  return state;
};

export const FORM_ACTIONS = {
  updateState: 'UPDATE_STATE',
  register: 'REGISTER',
  login: 'LOGIN',
};

export const useForm = () => {
  const [state, dispatch] = useReducer(reducer, {
    displayName: '',
    email: '',
    password: '',
    error: null,
    userInfo: null,
  });

  return { state, dispatch };
};
