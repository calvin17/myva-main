import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import GlobalStyles from '@mui/material/GlobalStyles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import { auth } from './utils/firebase';
import appStore from './store/appStore';

import Progress from './components/Progress';
import Layout from './components/Layout';

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

const TodoAppLazy = lazy(() => import('todo/TodoIndex'));
const CricketAppLazy = lazy(() => import('cricket/CricketIndex'));
const AuthLazy = lazy(() => import('auth/AuthIndex'));

const onSignIn = (signIn) => {
  if (signIn) {
    console.log('User Sign In');
  } else {
    console.log('User not Sign In');
  }
};

export default () => {
  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <>Dashboard</>,
        },
        {
          path: '/auth/*',
          element: <AuthLazy onSignIn={onSignIn} auth={auth} />,
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
          path: '*',
          element: <>No Match Route path</>,
        },
      ],
    },
  ]);

  return (
    <React.Fragment>
      <Provider store={appStore}>
        <ThemeProvider theme={theme}>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <GlobalStyles
              styles={{
                body: { backgroundColor: '#f5f5f9' },
              }}
            />
            <Suspense fallback={<Progress />}>
              <RouterProvider router={appRouter} />
            </Suspense>
          </Box>
        </ThemeProvider>
      </Provider>
    </React.Fragment>
  );
};
