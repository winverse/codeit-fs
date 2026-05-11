import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// TODO 1: Provider를 react-redux에서 import하기
// import { Provider } from 'react-redux';
// TODO 2: store를 @/store에서 import하기  
// import { store } from '@/store';
import { App } from './App.jsx';
import '@/styles/index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* TODO 3: Provider로 App을 감싸고 store 전달하기 */}
    {/* <Provider store={store}> */}
      <App />
    {/* </Provider> */}
  </StrictMode>,
);