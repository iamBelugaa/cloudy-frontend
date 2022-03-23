import { useEffect, useReducer } from 'react';

const AUTH_ACTIONS = {
  REGISTER: 'REGISTER',
  LOGIN: 'LOGIN',
};

const reducer = (state, { type, payload }) => {
  if (type === AUTH_ACTIONS.REGISTER)
    return {
      displayName: payload.displayName,
      email: payload.email,
      password: payload.password,
    };

  if (type === AUTH_ACTIONS.LOGIN) {
  }

  return state;
};

export const useAuthenticate = (data) => {
  const [state, dispatch] = useReducer(
    reducer,
    data || { displayName: '', email: '', password: '' }
  );
};
