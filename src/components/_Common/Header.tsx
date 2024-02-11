import React, { useState } from 'react';
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Box, Button, Menu, MenuItem, Tab, Tabs, styled } from '@mui/material';
import { ROUTES } from '../../tools/routes';
import PlayerSnackbar from './PlayerSnackbar';
import useScreenSize from '../../tools/useScreenSize';
import MenuIcon from '@mui/icons-material/Menu';

const HeaderBox = styled(Box)(({ theme }) => ({
  borderBottom: '1px solid',
  borderColor: theme.palette.divider,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 16,
  background: theme.palette.background.paper,
  width: '100%',
  zIndex: 1,
}));

function Header() {
  const [isPlayerSnackbarOpen, setPlayerSnackbarOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const onNavigationChange = (_: unknown, val: string) => {
    navigate(val);
    if (val === ROUTES.AUDIO) {
      setPlayerSnackbarOpen(true);
    }
  }

  const { isDesktop } = useScreenSize();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const isMobileMenuOpen = Boolean(anchorEl);

  const handleMobileMenuItemClick = (route: string) => {
    navigate(route);
    handleClose();
  }

  return (
    <HeaderBox>
      {isDesktop ? (
        <>
          <Tabs value={`/${location.pathname.split('/')[1]}`} onChange={onNavigationChange} >
            <Tab label="Home" value={ROUTES.HOME} />
            <Tab label="Music Videos" value={ROUTES.VIDEO} />
            <Tab label="Listen" value={ROUTES.AUDIO} />
          </Tabs>
        </>
      ) : (
        <>
          <Button
            id="basic-button"
            aria-controls={isMobileMenuOpen ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={isMobileMenuOpen ? 'true' : undefined}
            onClick={handleClick}
          >
            <MenuIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={isMobileMenuOpen}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={() => handleMobileMenuItemClick(ROUTES.HOME)}>Home</MenuItem>
            <MenuItem onClick={() => handleMobileMenuItemClick(ROUTES.VIDEO)}>Music Videos</MenuItem>
            <MenuItem onClick={() => handleMobileMenuItemClick(ROUTES.AUDIO)}>Listen</MenuItem>
          </Menu>
        </>
      )}
      <PlayerSnackbar isOpen={isPlayerSnackbarOpen} setIsOpen={setPlayerSnackbarOpen} />
    </HeaderBox>
  );
}

export default Header;
