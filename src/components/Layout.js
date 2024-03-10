import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import Box from '@mui/material/Box';
import { auth } from '../utils/firebase';

import { addUser, removeUser } from '../store/userSlice';

import AppHeader from './AppHeader';
import SideNavbar, { DrawerHeader } from './SideNavbar';

export default ({ user }) => {
  const [open, setOpen] = React.useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let authRoutes = ['/auth/signin', '/auth/signup'];
  let location = useLocation();
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    dispatch(addUser(user));
  }, [user]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
        navigate('/');
      } else {
        dispatch(removeUser());
        navigate('/auth/signin');
      }
    });
  }, []);

  return (
    <>
      {!(authRoutes.indexOf(`${location.pathname}`) > -1) && (
        <>
          <AppHeader open={open} setOpen={setOpen} toggleDrawer={toggleDrawer} />
          <SideNavbar open={open} setOpen={setOpen} toggleDrawer={toggleDrawer} />
        </>
      )}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {!(authRoutes.indexOf(`${location.pathname}`) > -1) && <DrawerHeader />}
        <Outlet />
      </Box>
    </>
  );
};
