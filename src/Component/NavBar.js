import React from 'react';
import styled from '@emotion/styled';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import { Button, Grid, Typography } from '@mui/material';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import Cookies from 'js-cookie';

const NavBar = styled(AppBar)({
    position:'static',
    height:'50px',
    backgroundImage:'linear-gradient(to right,#090909,#1A2027,#090909)',
});

const SiteIcon = styled(PersonPinIcon)({
    display:'unset', 
    verticalAlign: 'middle',
    paddingRight:'10px',
});

const SiteName = styled(Typography)({
    fontFamily:'monospace',
    fontWeight: 700,
    letterSpacing:'.3rem',
    color:'inherit',
    textDecoration: 'none',
});

const NavButton = styled(Button)({
    lineHeight:'38px',
    fontFamily:'monospace',
    color:'inherit',
    fontWeight: 700,
    float:'right',
    padding:'0px',
    marginLeft:'15px',
    marginRight:'15px',
    marginBottom:'5px',
    marginTop:'5px',
    minWidth:'100px'
});

export default function Navbar(){

    // Sign out the current user and redirect them to home
    function logOut() {
        Cookies.remove("jwt")
        Cookies.remove("user")
        window.location = "/"
    }

    return (
        <NavBar>
            <Container maxWidth='xl' sx={{lineHeight:'50px'}} >
                
                <SiteName noWrap href='/' variant="h6" component="a">
                    <SiteIcon />
                    My Programmer's Portfolio
                </SiteName>

                {Cookies.get('jwt') ? 
                    <>
                    <NavButton href='/' variant='outlined' onClick={logOut}>
                        Log out
                    </NavButton>
                    <NavButton href='/editprofile' variant='outlined'>
                        Edit Profile
                    </NavButton>
                    <NavButton href='/profile' variant='outlined'>
                        My Profile
                    </NavButton>
                    </>
                    :
                    <>
                    <NavButton href='/register' variant='outlined'>
                        Register
                    </NavButton> 
                    <NavButton href='/login' variant='outlined'>
                        Login
                    </NavButton>
                    </>
                }








            </Container>
        </NavBar>
    )
}
