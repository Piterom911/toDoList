import React, {useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {RequestStatusType} from "./appReducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Redirect, Route, Switch} from "react-router-dom";
import {ToDoListsAll} from "../features/ToDoListsAll/ToDoListsAll";
import {Login} from "../features/Login/Login";
import {initializeAppTC, logoutTC} from "../features/Login/auth-reducer";

const AppWithUseReducer = React.memo(function() {
    const requestStatus = useSelector<AppRootStateType, RequestStatusType>( state => state.app.requestStatus)
    const isInitialized = useSelector<AppRootStateType, boolean>( state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>( state => state.login.isLoggedIn)
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(initializeAppTC())
    }, [dispatch])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }


    return (
        <div>
            <div className={'headerWrapper'}>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu />
                        </IconButton>
                        <Typography variant="h6" color="inherit">
                            My To Do Lists
                        </Typography>
                        {isLoggedIn && <Button onClick={() => dispatch(logoutTC())} style={{color: "white", fontWeight: 'bold', marginLeft: 'auto'}}>Log out</Button>}
                    </Toolbar>
                </AppBar>
                <div className={'headerPreloader'}>
                    { requestStatus === 'loading' && <LinearProgress/>}
                </div>
            </div>
            <Container>
                <Switch>
                    <Route path={'/'} exact render={ () =>  <ToDoListsAll />} />
                    <Route path={'/login'} render={ () =>  <Login />} />
                    <Route path={'/404'} render={ () =>  <h1><p>404:</p> Page Not Found</h1>} />
                    <Redirect from={'*'} to={'/404'} />
                </Switch>
            </Container>
            <ErrorSnackbar />
        </div>
    );
})

export default AppWithUseReducer;
