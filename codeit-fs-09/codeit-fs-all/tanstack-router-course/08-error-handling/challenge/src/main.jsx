import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen.js';
import './index.css';

// TODO: 3. __root.jsx에서 export한 notFoundRoute를 import 하세요.

const router = createRouter({
  routeTree,
  // TODO: 3. 여기에 notFoundRoute를 등록하세요.
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
