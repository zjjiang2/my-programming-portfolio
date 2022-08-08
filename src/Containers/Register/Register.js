import { Button, Grid, Typography, Paper, TextField, styled, } from '@mui/material';
import React, { useState, useEffect } from 'react';

import axios from '../../Component/Helpers/axios'
import Cookies from 'js-cookie';

const RegBox = styled(Paper)({
    background:'#272728',
    padding:25,
    maxWidth:500,
    display:'block',
    justifyContent:'center',
    marginLeft:'auto',
    marginRight:'auto',
    display:'flex',
    position:'relative',
    top:'150px',
});

const RegItems = styled(Grid)({
    marginLeft:'auto',
    marginRight:'auto',
});

const Title = styled(Typography)({
    fontFamily:'monospace',
    color:'white',
    fontSize:'25px',
    fontWeight:'bold',
    paddingBottom:'25px',
    textAlign:'center',
});

const InputText = styled(Typography)({
    fontFamily:'monospace',
    color:'white',
    fontSize:'15px'
});

const InputBox = styled(TextField)({
    input: {
        color:'white',
        fontFamily:'monospace',
    }
});

const RegButton = styled(Button)({
    margin:'20px'
});

const ErrorMessage = styled(Typography)({
    color:'red',
    position:'absolute',
    textAlign:'center',
    marginTop:'500px',
});

export default function Register() {
    const [value, setValue] = useState({email: '', fname: '', lname: '', password: '', password2: ''});
    const [error, setError] = useState({email: '', fname: '', lname: '', password: '', password2: ''});
    const [serverError, setServerError] = useState({error: false, message: ""});

    // Keep watch for when the user is authenticated and redirect them to home
    useEffect(() => {
        if (Cookies.get('jwt')){
            window.location = "/"
        }
    }, [])

    // Function to check all input errors & send HTTP request to backend
    const submitHandler = () => {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const nameRegex = /^([^0-9]*)$/
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

        let valid = true;
        let errors = {email: '', fname: '', lname: '', phone: '', password: '', password2: ''}

        // Valid email input check
        if (!emailRegex.test(String(value.email).toLowerCase())) {
            errors.email= "Email must be valid email"
            valid = false;
        } else if (value.email.length === 0){
            errors.email = "Email is required"
            valid = false;
        } else if (value.email.length > 50){
            errors.email = "Email must between 1 - 50"
            valid = false;
        } else {
            errors.email = ""
        }

        // Valid name checks
        if (!nameRegex.test(String(value.fname).toLowerCase())) {
            errors.fname= "First name must contain letters only"
            valid = false;
        } else if (value.fname.length === 0){
            errors.fname = "First name is required"
            valid = false;
        } else if (value.fname.length > 45){
            errors.fname = "First name must between 1 - 45"
            valid = false;
        } else {
            errors.fname = ""
        }
        if (!nameRegex.test(String(value.lname).toLowerCase())) {
            errors.lname = "Last name must contain letters only"
            valid = false;
        } else if (!value.lname.length > 0){
            errors.lname = "Last name is required"
            valid = false;
        } else if (value.lname.length > 45){
            errors.lname = "Last name must between 1 - 45"
            valid = false;
        } else {
            errors.lname = ""
        }

        // Valid password check
        if (!passwordRegex.test(String(value.password).toLowerCase())) {
            errors.password= "Password must be 8 characters with at least one letter, number and special character"
            valid = false;
        } else if (!value.password.length > 0){
            errors.password= "Password is required"
            valid = false;
        } else if (value.password.length > 30){
            errors.password= "Password must be between 8 - 30"
            valid = false;
        } else {
            errors.password= ""
        }

        // Password confirmation
        if (value.password !== value.password2) {
            errors.password2= "Password do not match"
            valid = false;
        } else if (!value.password2.length > 0){
            errors.password2= "Confirm password is required"
            valid = false;
        } else {
            errors.password2= ""
        }

        setError(errors)

        // HTTPS call to add user data into the database
        if (valid) {
            console.log(value)
            axios.post('/auth/signup', {...value})
            .then(function (response) {
                // Assign authentication cookie and log the user in
                console.log(response);
                if (response.data.status === "success") {
                    Cookies.set('user', {...response.data.user}, { expires: 7 });
                    Cookies.set('jwt', response.data.token, { expires: 7 });
                    
                    if (Cookies.get('jwt')){
                        window.location = "/"
                    }
                } else {
                    setServerError({error: true, message: response.data.message != "" ? response.data.message : ""})
                }
            })
            .catch(() =>{
                setServerError({error: true, message: "Connection error, please try again later"})
            })
        }
    };

    // Set user input as state for submission use
    const handleChange = (event) => {
        setValue({
            ...value,
            [event.target.id]: event.target.value
        });
    };

    // Triggers submit form when user presses enter
    const submitReg = (event) => {
        if(event.keyCode === 13){
            submitHandler()
        }
    }

    return (
        <RegBox>
            
            <Grid container alignItems='center' spacing={2}>
                <RegItems item xs={12}>
                    <Title>
                        Create an Account
                    </Title>
                </RegItems>
                <RegItems item xs={12}>
                    <InputText>
                        Email Address:
                    </InputText>
                    <InputBox 
                        fullWidth
                        id='email'
                        onChange={handleChange}
                        error={error.email !== ''}
                        variant='outlined'
                        helperText={error.email}
                    />
                </RegItems>
                <RegItems item xs={6}>
                    <InputText>
                        First Name:
                    </InputText>
                    <InputBox 
                        fullWidth
                        id='fname'
                        onChange={handleChange}
                        error={error.fname !== ''}
                        variant='outlined'
                        helperText={error.fname}
                    />
                </RegItems>
                <RegItems item xs={6}>
                    <InputText>
                        Last Name:
                    </InputText>
                    <InputBox 
                        fullWidth
                        id='lname'
                        onChange={handleChange}
                        error={error.lname !== ''}
                        variant='outlined'
                        helperText={error.lname}
                    />
                </RegItems>
                <RegItems item xs={6}>
                    <InputText>
                        Password:
                    </InputText>
                    <InputBox 
                        fullWidth
                        id='password'
                        onChange={handleChange}
                        error={error.password !== ''}
                        variant='outlined'
                        helperText={error.password} 
                        type="password"
                    />
                </RegItems>
                
                <RegItems item xs={6}> 
                    <InputText>
                        Confirm Password:
                    </InputText>
                    <InputBox 
                        fullWidth
                        id='password2'
                        onChange={handleChange}
                        error={error.password2 !== ''}
                        variant='outlined'
                        helperText={error.password2}
                        type="password"
                        onKeyDown={submitReg}
                    />
                </RegItems>

                <RegItems item>
                    <RegButton variant='contained' onClick={submitHandler}>
                        Register
                    </RegButton>
                </RegItems>
            </Grid>

            <ErrorMessage>
                {serverError.message}
            </ErrorMessage>   
        </RegBox>
    );
}