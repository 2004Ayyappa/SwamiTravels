import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from '../images/logo.png';

const pages = ['AdminSignUp', 'AdminSignIn', 'BusManagement','citylist','cityform'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navigation() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            src={logo}
            alt="Logo"
            style={{
              marginRight: 1,
              display: { xs: 'none', md: 'flex' },
              maxWidth: '60px',
              maxHeight: '60px',
            }}
          />
          &nbsp; &nbsp;
          <div className='nav-menu'>
          <h1>Swami Travels</h1>
          </div>
          {/* Move the Box and Buttons to the right side */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                }}
              >
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href={page.toLowerCase().substring(0, 6)}
                  sx={{
                    mr: 2,
                    fontFamily: 'fantasy',
                    fontWeight: 400,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                 
                </Typography>
              </Button>
            ))}
          </Box>

          {/* Box to move buttons to the right side */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                }}
              >
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href={page.toLowerCase().substring(0, 6)}
                  sx={{
                    ml: 2, // Adjust margin as needed
                    fontFamily: 'monospace',
                    fontWeight: 400,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  {page}
                </Typography>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* Update the src attribute to the correct path or URL */}
                <Avatar alt="Profile" src="/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navigation;
