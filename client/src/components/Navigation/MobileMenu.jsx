import React, { useState } from 'react';
import {
    IconButton,
    Menu,
    MenuItem,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

export const MobileMenu = () => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNavigate = (path) => {
        navigate(path);
        handleClose();
    };

    return (
        <>
            <IconButton
                color='inherit'
                aria-label='open drawer'
                onClick={handleMenu}
                sx={{ position: 'fixed', top: 16, right: 16, zIndex: 1300 }}
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id='mobile-menu'
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={() => handleNavigate('/dashboard')}>
                    Dashboard
                </MenuItem>
                <MenuItem onClick={() => handleNavigate('/allJobs')}>All Jobs</MenuItem>
                <MenuItem onClick={() => handleNavigate('/stats')}>My Stats</MenuItem>
                <MenuItem onClick={() => handleNavigate('/resources')}>
                    Resources
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        localStorage.removeItem('user');
                        navigate('/');
                        handleClose();
                    }}
                >
                    Sign out
                </MenuItem>
            </Menu>
        </>
    );
};

export default MobileMenu;
