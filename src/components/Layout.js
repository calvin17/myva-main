import React from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';

import AppHeader from './AppHeader';
import SideNavbar, { DrawerHeader } from './SideNavbar';

export default () => {
  return (
    <>
      <AppHeader />
      <SideNavbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </>
  );
};
