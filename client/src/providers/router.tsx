import { createBrowserRouter, RouterProvider as ReactRouter } from 'react-router-dom';
import { MainPage } from '../pages/main';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
]);

export const RouterProvider = () => <ReactRouter router={router} />;
