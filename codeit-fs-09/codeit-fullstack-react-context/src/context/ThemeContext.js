import { createContext, useContext } from 'react';

export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {
    throw Error('ThemeProvider 내부에서 사용해야 합니다.');
  },
});

export const useTheme = () => {
  return useContext(ThemeContext);
};
