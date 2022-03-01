import React, { useEffect, useState } from 'react'
import useStyles from './styles'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import memoriesLogo from '../../images/memoriesLogo.png'
import memoriesText from '../../images/memoriesText.png'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    // console.log(user);

    useEffect(() => {
        const token = user?.token
        if (token) {
            const decodedData = decode(token)
            if (decodedData.exp * 1000 < new Date().getTime()) {
                logout()
            }
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    const logout = () => {
        dispatch({ type: 'LOGOUT' })
        navigate("/")
        setUser(null)
    }

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <Link to="/" className={classes.brandContainer}>
                <img src={memoriesText} alt="icon" height="45" />
                <img className={classes.image} src={memoriesLogo} alt="Memories" alt="icon" height="40" />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <div className={classes.user}>
                            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl} style={{ backgroundColor: 'purple' }}>
                                {user.result.name.charAt(0)}
                            </Avatar>
                            <Typography className={classes.userName} variant="h6">
                                {user.result.name}
                            </Typography>
                        </div>
                        <Button className={classes.logout} variant="contained" color="secondary" onClick={logout}>
                            Log Out
                        </Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant='contained' color="primary">
                        Sign In
                    </Button>
                )}
            </Toolbar>

        </AppBar>
    )
}

export default Navbar