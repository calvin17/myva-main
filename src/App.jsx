import React, { useState, lazy, Suspense, useEffect } from 'react';
import { Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import GlobalStyles from '@mui/material/GlobalStyles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import { auth } from './utils/firebase';
import appStore from './store/appStore';

import Progress from './components/Progress.jsx';
import Layout from './components/Layout.jsx';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4e73df',
    },
    secondary: {
      main: '#858796',
    },
  },
});

const DashboardLazy = lazy(() => {
  console.log('Attempting to load dashboard from:', 'http://localhost:8087/assets/remoteEntry.js');
  return import('dashboard/DashboardIndex').catch(err => {
    console.error('Failed to load dashboard:', err);
    throw err;
  });
});
const TodoAppLazy = lazy(() => import('todo/TodoIndex'));
const CricketAppLazy = lazy(() => import('cricket/CricketIndex'));
const AuthLazy = lazy(() => import('auth/AuthApp'));
const ETAppLazy = lazy(() => import('et/ETIndex'));

export default () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const updateUser = (user) => {
    setUser(user);
  };

  const rootLoader = async () => {};

  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Layout user={user} loading={loading} setLoading={setLoading} />,
      loader: () => 'load',
      children: [
        {
          path: '/',
          element: <DashboardLazy loading={loading} />,
        },
        {
          path: '/auth/*',
          element: <AuthLazy updateUser={(user) => updateUser(user)} auth={auth} />,
        },
        {
          path: '/todo/*',
          element: <TodoAppLazy />,
        },
        {
          path: '/cricket/*',
          element: <CricketAppLazy />,
        },
        {
          path: '/expanseTracker/*',
          element: <ETAppLazy />,
        },
        {
          path: '*',
          element: <>No Match Route path</>,
        },
      ],
    },
  ]);

  console.log('loading', loading);
  return (
    <React.Fragment>
      <Provider store={appStore}>
        <ThemeProvider theme={theme}>
          <Box>
            <CssBaseline />
            <GlobalStyles
              styles={{
                body: { backgroundColor: '#f5f5f9' },
              }}
            />
            {/* {loading && <Progress />} */}
            <Suspense fallback={<Progress />}>
              <RouterProvider router={appRouter} fallbackElement={<Progress />} />
            </Suspense>
          </Box>
        </ThemeProvider>
      </Provider>
    </React.Fragment>
  );
};