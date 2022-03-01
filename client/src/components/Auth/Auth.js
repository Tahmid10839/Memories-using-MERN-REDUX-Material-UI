import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, Grow } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles'
import Input from './Input'
import { GoogleLogin } from 'react-google-login'
import Icon from './icon'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signin, signup } from '../../actions/auth'

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const Auth = () => {
    const classes = useStyles()
    const [showPassword, setShowPassword] = useState(false)
    const [showRepeatPassword, setShowRepeatPassword] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData, setFormData] = useState(initialState)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isSignUp) {
            dispatch(signup(formData, navigate))
        } else {
            dispatch(signin(formData, navigate))
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleRepeatPassword = () => {
        setShowRepeatPassword(!showRepeatPassword)
    }

    const switchMode = () => {
        setIsSignUp(!isSignUp)
        setShowPassword(false)
        setShowRepeatPassword(false)
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj
        const token = res?.tokenId
        try {
            dispatch({ type: 'AUTH', data: { result, token } })
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }

    const googleFailure = () => {
        console.log('Google login was unsuccessful... Try again later')
    }

    return (
        <Container component="main" maxWidth="xs">
            <Grow in>

                <Paper className={classes.paper} elevation={6}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant='h5'>
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {
                                isSignUp && (
                                    <>
                                        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                        <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                    </>
                                )
                            }
                            <Input name="email" label="Email Address" handleChange={handleChange} type="email" autoFocus={isSignUp ? false : true} />
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : 'password'} handleShowPassword={handleShowPassword} />
                            {isSignUp && (
                                <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type={showRepeatPassword ? 'text' : 'password'} handleRepeatPassword={handleRepeatPassword} />
                            )}
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            {isSignUp ? 'Sign Up' : 'Sign In'}
                        </Button>
                        <GoogleLogin
                            clientId="890596146266-50858v3d7mqbj6gf8b1q6n15r5r5tf0d.apps.googleusercontent.com"
                            render={(renderProps) => (
                                <Button
                                    className={classes.googleButton}
                                    color="primary"
                                    fullWidth
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    startIcon={<Icon />}
                                    variant="contained"
                                >
                                    Google Sign In
                                </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy="single_host_origin"
                        />
                        <Grid container justifyContent='flex-end'>
                            <Grid item>
                                <Button onClick={switchMode}>
                                    {isSignUp ? 'Already have an account? Sign In' : 'Dont have an account? Sign Up'}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grow>
        </Container>
    )
}

export default Auth