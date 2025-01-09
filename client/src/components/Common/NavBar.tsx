import { Box } from '@mui/material'
import classes from './navbar.module.css'
import Account from '@mui/icons-material/AccountCircleOutlined';

function NavBar() {
  return (
    <Box component={'nav'} className={classes.nav}>
        <Box></Box>
        <Box><Account sx={{fontSize:'40px'}}/></Box>
    </Box>
  )
}

export default NavBar