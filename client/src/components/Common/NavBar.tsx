import { Box } from '@mui/material'
import classes from './navbar.module.css'
import Account from '@mui/icons-material/AccountCircleOutlined';

interface NavBarProps{
  children?:React.ReactNode;
}

function NavBar({children}:NavBarProps) {
  return (
    <Box component={'nav'} className={classes.nav}>
        <Box>{children && children}</Box>
        <Box><Account sx={{fontSize:'40px'}}/></Box>
    </Box>
  )
}

export default NavBar