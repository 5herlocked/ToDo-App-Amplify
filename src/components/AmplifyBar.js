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
const AmplifyBar = ({loggedIn, searchCallback}) => {
    const [auth, setAuth] = React.useState(loggedIn);
    const [anchorElevation, setAnchorElevation] = React.useState(null);

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

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));

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
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon/>
                        </SearchIconWrapper>
                        <StyledInputBase
                            onChange={(newValue) => {}}
                            placeholder={"Search..."}/>
                    </Search>
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