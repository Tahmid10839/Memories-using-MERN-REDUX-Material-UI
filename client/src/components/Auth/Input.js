import React from 'react'
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const Input = ({ name, label, type, half, autoFocus, handleShowPassword, handleChange, handleRepeatPassword }) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField
                autoComplete='off'
                name={name}
                label={label}
                variant="outlined"
                required
                fullWidth
                type={type}
                autoFocus={autoFocus}
                onChange={handleChange}
                InputProps={name === 'password' || name === 'confirmPassword' ? {
                    endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton onClick={name === 'password' ? handleShowPassword : handleRepeatPassword}>
                                {type === 'password' ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    )
                } : null}
            />
        </Grid>
    )
}

export default Input