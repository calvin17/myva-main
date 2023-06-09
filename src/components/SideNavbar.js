import * as React from 'react';
import { Link } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddTaskIcon from '@mui/icons-material/AddTask';
import HomeIcon from '@mui/icons-material/Home';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const sideNavLinks = [
  {
    name: 'Home',
    link: '/',
    icon: <HomeIcon />,
  },
  {
    name: 'Task Manager',
    link: '/todo',
    icon: <AddTaskIcon />,
  },
  {
    name: 'Cricket Info',
    link: '/cricket',
    icon: <SportsCricketIcon />,
  },
  {
    name: 'Expanse Tracker',
    link: '/expanseTracker',
    icon: <AccountBalanceWalletIcon />,
  },
];

export default ({ open, setOpen, toggleDrawer }) => {
  const theme = useTheme();

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      variant="permanent"
      open={open}
      PaperProps={{
        sx: {
          background: 'linear-gradient(to right bottom, #4e73df, #5c6bc0)',
          color: '#f8f9fc',
        },
      }}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {sideNavLinks.map(({ name, link, icon }, index) => (
          <ListItem key={name} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              component={Link}
              to={link}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
                component={Link}
              >
                {icon}
              </ListItemIcon>
              <ListItemText primary={name} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export { DrawerHeader };
