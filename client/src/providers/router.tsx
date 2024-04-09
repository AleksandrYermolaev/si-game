import { createBrowserRouter, RouterProvider as ReactRouter } from 'react-router-dom';
import { MainPage } from '../pages/main';
import { PresenterPage } from '../pages/presenter';
import { PlayerPage } from '../pages/player';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/presenter',
    element: <PresenterPage />,
  },
  {
    path: '/player',
    element: <PlayerPage />,
  },
]);

export const RouterProvider = () => <ReactRouter router={router} />;
