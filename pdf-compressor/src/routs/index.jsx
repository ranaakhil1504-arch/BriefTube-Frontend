// src/routes/index.jsx
import { lazy } from 'react';

// Lazy load pages for better performance
const HomePage = lazy(() => import('../pages/HomePage'));
const NotFound = lazy(() => import('../pages/NotFound'));

export const routes = [
  {
    path: '/',
    element: <HomePage />,
    exact: true,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;