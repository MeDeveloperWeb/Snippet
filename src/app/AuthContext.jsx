import { createContext } from 'react';

export const AuthContext = createContext([
  {
    access: undefined,
    username: undefined,
    id: undefined
  },
  () => {}
]);
