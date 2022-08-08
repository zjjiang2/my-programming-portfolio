import { Button, Grid, Typography, Paper, TextField, styled, } from '@mui/material';
import React, { useState } from 'react';
import axios from '../../Component/Helpers/axios'
import Cookies from 'js-cookie';

const LoginBox = styled(Paper)({
    background:'#272728',
    padding:25,
    maxWidth:250,
    display:'block',
    justifyContent:'center',
    marginLeft:'auto',
    marginRight:'auto',
    display:'flex',
    position:'relative',
    top:'150px',
});

const LoginItems = styled(Grid)({
    marginLeft:'auto',
    marginRight:'auto',
});

const Title = styled(Typography)({
    fontFamily:'monospace',
    color:'white',
    fontSize:'25px',
    fontWeight:'bold',
    paddingBottom:'25px',
});

const InputBox = styled(TextField)({
    input: {
        color:'white',
        fontFamily:'monospace',
    }
});

const LoginButton = styled(Button)({
    margin:'20px'
});

const ErrorMessage = styled(Typography)({
    color:'red',
    position:'absolute',
    textAlign:'center',
    marginTop:'400px',
});

export default function Login() {
    const [value, setValue] = useState({email: '', password: ''});
    const [error, setError] = useState({email:'', password:''});
    const [serverError, setServerError] = useState({error: false, message: ''});

    // If user has already logged in, send to home page
    if(Cookies.get('jwt')){
        window.location = '/';
    }

    // Function to check all input errors & send HTTP request to backend.
    const submitHandler = async () => {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        let valid = true;
        let errors = {email: '', password: ''}
        
        // Check valid email formats using custom Regex
        if (!emailRegex.test(String(value.email).toLowerCase())) {
            errors.email= 'Email must be valid email'
            valid = false;
        } else if (value.email.length === 0){
            errors.email= 'Email is required'
        } else {
            errors.email= ''
        }

        // Check if password is entered
        if (!value.password.length > 0){
            errors.password= 'Password is required'
            valid = false;
        } else {
            errors.password= ''
        }

        setError(errors)

        // Send an HTTPS call to the backend to confirm if the credential is valid
        if (valid) {
            console.log(value)
            axios.post('/auth/login', {
                email: value.email,
                password: value.password
            })
            .then(function (response) {
                console.log(response)
                if (response.data.status === 'success') {
                    Cookies.set('user', response.data.user, { expires: 7 });
                    Cookies.set('jwt', response.data.token, { expires: 7 });
                    
                    if (Cookies.get('jwt')){
                        window.location = '/'
                    }
                } else {
                    setServerError({error: true, message: 'Incorrect password or email'})
                }
            })
            .catch(() =>{
                setServerError({error: true, message: 'Connection error, please try again later'})
            })
        }
    };

    // Set user input as state for submission use
    const handleChange = (event) => {
        setValue({
            ...value,
            [event.target.id]: event.target.value
        });
        console.log(value)
    };

    // Triggers submit form when user presses enter
    const submitLogin = (event) => {
        if(event.keyCode === 13){
           submitHandler()
        }
    }

    return (
        <LoginBox>
            
            <Grid container alignItems='center' spacing={2}>
                <LoginItems item>
                    <Title>
                        Welcome
                    </Title>
                </LoginItems>
                <LoginItems item>
                    <Typography
                        sx={{
                            fontFamily:'monospace',
                            color:'white',
                            fontSize:'15px'
                        }}>
                        Email Address:
                    </Typography>
                    <InputBox 
                        id='email'
                        onChange={handleChange}
                        error={error.email !== ''}
                        variant='outlined'
                        helperText={error.email}
                        onKeyDown={submitLogin}
                    />
                </LoginItems>
                <LoginItems item>
                    <Typography
                        sx={{
                            fontFamily:'monospace',
                            color:'white',
                            fontSize:'15px'
                        }}>
                        Password:
                    </Typography>
                    <InputBox 
                        id='password'
                        onChange={handleChange}
                        error={error.password !== ''}
                        variant='outlined'
                        helperText={error.password} 
                        type='password'
                        onKeyDown={submitLogin}
                    />
                </LoginItems>
                
                <LoginItems item>
                    <LoginButton variant='contained' onClick={submitHandler}>
                        Login
                    </LoginButton>
                </LoginItems>
            </Grid>

            <ErrorMessage>
                {serverError.message}
            </ErrorMessage>   
        </LoginBox>
        
    );
}