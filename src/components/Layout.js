import React from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';

import AppHeader from './AppHeader';
import SideNavbar, { DrawerHeader } from './SideNavbar';

export default () => {
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <AppHeader open={open} setOpen={setOpen} toggleDrawer={toggleDrawer} />
      <SideNavbar open={open} setOpen={setOpen} toggleDrawer={toggleDrawer} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </>
  );
};
