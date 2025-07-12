import React from 'react';
import { useState, useContext } from 'react';
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
import AdbIcon from '@mui/icons-material/Adb';
import { Link, NavLink, useNavigate } from 'react-router';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import AuthContext from '../context/AuthContext.jsx'


const pages = [{name:'About', link: "about"}, {name: 'Itinerary', link: "itinerary/form"}, {name: 'Contact', link: "#contact"}];
const settings = ['Profile', 'Collection', 'Logout'];

export default function Header({ mode, setMode}) {
  // Get Authentication context
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  const navigate = useNavigate()
  
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);



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

  // Logout handler
  const handleLogout = async () => {
    try {
      await logout();
      handleCloseUserMenu()
      navigate("/");
    } catch (error) {
      console.error("Logout Error: ", error.message);
    }
  }

  return (
    <AppBar elevation={5} position="static" color="transparent" enableColorOnDark >
      <Container maxWidth="xl" sx={{bgcolor: "transparent", boxShadow: "none"}}>
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'center', bgcolor:"transparent" }}>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: "text.primary" }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to={"/"}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'text.primary',
              textDecoration: 'none',
            }}
          >
            AI TRAVEL PLANNER
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="text.primary"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} component= {Link} to={`/${page.link}`}onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                </MenuItem>
              ))}
              { !isAuthenticated 
                ? [                
                  <MenuItem key="signup" onClick={handleCloseNavMenu} component={Link} to="/signup">
                    <Typography sx={{ textAlign: 'center' }}>Signup</Typography>
                  </MenuItem>,
                  <MenuItem key="login" onClick={handleCloseNavMenu} component={Link} to="/login">
                    <Typography sx={{ textAlign: 'center' }}>Login</Typography>
                  </MenuItem>
                  ]
                : null }
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to={"/"}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: "bold",
              letterSpacing: '.2rem',
              color: 'text.primary',
              textDecoration: 'none',
            }}
          >
            AI TRAVEL PLANNER
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'space-evenly', alignItems: 'center', bgcolor:"transparent" }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component= {Link}
                to={`/${page.link}`}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'text.primary', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          { !isAuthenticated ?
            <Box sx={{ flexGrow: 0, display: {  xs: 'none', md: 'flex' }, gap: 1 }}>
              <Button component={NavLink} to="/signup" sx={{ textTransform: 'uppercase', fontWeight:"bold" }}>
                  Signup
              </Button>
              <Button component={NavLink} to="/login" sx={{ textTransform: 'uppercase', fontWeight:"bold" }}>
                  Login
              </Button>
            </Box>
            :
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar>{user.username}</Avatar>
                  {/* <Avatar src="/static/images/avatar/2.jpg" /> */}
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
                  <MenuItem key={setting} onClick={setting === "Logout"? handleLogout : handleCloseUserMenu}>
                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          }
          <Box sx={{ flexGrow: 0, ml: 2 }}>
            <IconButton 
                sx={{ ml: 1 }}
                onClick={() => setMode(mode === 'light' ? 'dark' : 'light' )}
            >
                {mode === 'dark' 
                  ? <LightModeIcon color="warning" />
                  : <DarkModeIcon color="action"/> 
                }
            </IconButton>

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

