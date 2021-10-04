import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {alpha, InputBase, styled} from "@mui/material";
import { Auth } from 'aws-amplify';

// Heavily borrowed from the MUI Component Demo for Appbar's
const AmplifyBar = ({loggedIn, searchCallback, todos}) => {
    const [auth, setAuth] = React.useState(loggedIn);
    const [anchorElevation, setAnchorElevation] = React.useState(null);
    const [searchVal, setSearchVal] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorElevation(event.currentTarget);
    }

    async function handleLogOut () {
        try {
            await Auth.signOut();
        } catch (err) {
            console.log('error signing out: ', err);
        }
    }

    const logOutHandler = () => {
        setAnchorElevation(null);
        handleLogOut().then();
        setAuth(false);
        localStorage.clear();
        window.location.reload();
    }

    const handleClose = () => {
        setAnchorElevation(null);
    }

    return (
    <Box sx={{flexGrow: 1}}>
            <AppBar position={"static"}>
                <Toolbar>
                    <Typography
                        variant={"h6"}
                        noWrap
                        component={"div"}
                        style={{flexGrow: 1}}>
                        Amplify Notes
                    </Typography>
                    {
                        auth && (
                            <div style={{ align: 'flex-end' }}>
                                <IconButton
                                    size={"large"}
                                    onClick={handleMenu}
                                    color={"inherit"}
                                >
                                    <AccountCircle/>
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElevation}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElevation)}
                                    onClose={handleClose}>
                                    <MenuItem onClick={logOutHandler}>Logout</MenuItem>
                                </Menu>
                            </div>
                        )
                    }
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default AmplifyBar;