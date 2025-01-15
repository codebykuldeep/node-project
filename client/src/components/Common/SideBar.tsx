import * as React from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { ISidebarProps } from '../../types/uiTypes';
import { Link } from 'react-router-dom';

import classes from './sidebar.module.css';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
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


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    backgroundColor:'#09090b',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

interface IMiniDrawerProps{
    children:React.ReactNode;
    sidebar?:ISidebarProps,
}

export default function MiniDrawer({children,sidebar}:IMiniDrawerProps) {
  const [open, setOpen] = React.useState(false);
  const userState = useSelector((state:RootState) => state.userState)
  console.log(userState);
  console.log(sidebar);
  
  
  const handleDrawer = () => {
    setOpen(prev=>!prev);
  };

  return (
    <Box sx={{ display: 'flex' }}  >
      <Drawer variant="permanent" open={open} className={classes.sidebar}>
        <DrawerHeader>
            {open && <span>ICON</span>}
          <IconButton onClick={handleDrawer}>
            { open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        
        {sidebar && sidebar.map(({heading,items},index)=>(
        <>
          <List key={index}>
          {open && <Box component={'p'} className={classes.header}>{heading}</Box>}
            {items.map(({text,link}, index) => (
              <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                <Link to={link}>
                  <ListItemButton>
                    <ListItemIcon >
                    <InboxIcon />
                    </ListItemIcon>
                    {open && <ListItemText primary={text}/>}
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
          <Divider />
        </>
      ))}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1}}>
        {children}
      </Box>
      <>
      
      </>
    </Box>

  );
}

/*

<List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton>
                <ListItemIcon >
                <InboxIcon />
                </ListItemIcon>
                {open && <ListItemText primary={text}/>}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton>
              <ListItemIcon >
              <InboxIcon />
              </ListItemIcon>
              {open && <ListItemText primary={text}/>}
            </ListItemButton>
          </ListItem>
          ))}
        </List>

*/