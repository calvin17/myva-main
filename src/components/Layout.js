import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';

import AppHeader from './AppHeader';
import SideNavbar, { DrawerHeader } from './SideNavbar';

export default () => {
  const [open, setOpen] = React.useState(true);
  let location = useLocation();
  const toggleDrawer = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    console.log('current location', location);
  }, [location]);

  return (
    <>
      {location.pathname !== '/auth/signin' && (
        <>
          <AppHeader open={open} setOpen={setOpen} toggleDrawer={toggleDrawer} />
          <SideNavbar open={open} setOpen={setOpen} toggleDrawer={toggleDrawer} />
        </>
      )}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {location.pathname !== '/auth/signin' && <DrawerHeader />}
        <Outlet />
      </Box>
    </>
  );
};
