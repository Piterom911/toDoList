import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {loginTC} from "./auth-reducer";
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from "../../app/store";
import {Redirect} from "react-router-dom";

export const Login = () => {

    type FormikErrorType = {
        email?: string
        password?: string
        rememberMe?: boolean
    }

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: true
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'The password field is required'
            } else if (values.password.length < 5) {
                errors.password = 'The password should contain minimum 5 characters'
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
    })

    if (isLoggedIn) {
        return <Redirect to={'/'}/>
    }


    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField label="Email" margin="normal"
                                   {...formik.getFieldProps('email')}
                                   onBlur={formik.handleBlur}
                        />
                        {formik.errors.email && formik.touched.email &&
                        <div style={{color: 'red', fontSize: '10px'}}>{formik.errors.email}</div>}
                        <TextField type="password" label="Password"
                                   margin="normal" {...formik.getFieldProps('password')}
                                   onBlur={formik.handleBlur}
                        />
                        {formik.errors.password && formik.touched.password &&
                        <div style={{color: 'red', fontSize: '10px'}}>{formik.errors.password}</div>}
                        <FormControlLabel label={'Remember me'}
                                          control={<Checkbox/>} {...formik.getFieldProps('rememberMe')}
                                          checked={formik.values.rememberMe}/>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}
