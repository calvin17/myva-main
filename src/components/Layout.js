import React, { useState, useEffect } from 'react';
import { Outlet, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import Box from '@mui/material/Box';
import { auth } from '../utils/firebase';

import { addUser, removeUser } from '../store/userSlice';

import AppHeader from './AppHeader';
import SideNavbar, { DrawerHeader } from './SideNavbar';
import Progress from './Progress';

export default ({ user, loading, setLoading }) => {
  const [open, setOpen] = useState(true);
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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(true);
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
        navigate('/');
        setLoading(false);
      } else {
        dispatch(removeUser());
        navigate('/auth/signin');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {!loading && !(authRoutes.indexOf(`${location.pathname}`) > -1) && (
        <>
          <AppHeader open={open} setOpen={setOpen} toggleDrawer={toggleDrawer} />
          <SideNavbar open={open} setOpen={setOpen} toggleDrawer={toggleDrawer} />
        </>
      )}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {!loading && !(authRoutes.indexOf(`${location.pathname}`) > -1) && <DrawerHeader />}
        <Outlet />
      </Box>
    </>
  );
};
