import React from 'react';
import Navbar from './NavBar';

import Grid from '@mui/material/Grid';
import { Box, Container} from '@mui/material';


export default function(props) {

    return(
        <Grid>
            <Navbar/>
            <Box sx={{
                backgroundImage:'linear-gradient(to right,#090909,#1A2027,#090909)',
                minHeight:1000,
                backgroundRepeat:'repeat-y',
                }}>{props.children}
            </Box>
            
        </Grid>
    );

}