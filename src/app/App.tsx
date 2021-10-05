import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "../components/ToDoList/Todolist";
import {AddNewItem} from "../components/AddNewItem/AddNewItem";
import {AppBar, Container, Grid, IconButton, LinearProgress, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    changeToDoListFilterAC,
    createToDoList,
    deleteToDoList,
    FilterType,
    setToDoListsTC,
    ToDoListDomainType,
    updateToDoList
} from "../state/todolists-reducer";
import {changeTask, createTask, deleteTask, LocalTasksType,} from "../state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {TaskStatuses, ToDoListType} from "../api/todolists-api";
import {RequestStatusType} from "../state/appReducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";

const AppWithUseReducer = React.memo(function() {
    const toDoLists = useSelector<AppRootStateType, Array<ToDoListType & ToDoListDomainType>>( state => state.toDoLists)
    const tasks = useSelector<AppRootStateType, LocalTasksType>( state => state.tasks)
    const requestStatus = useSelector<AppRootStateType, RequestStatusType>( state => state.app.requestStatus)

    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(setToDoListsTC())
    }, [dispatch])
    console.log(requestStatus)

    const removeToDoListHandler = useCallback((toDoLostID: string) => {
        dispatch(deleteToDoList(toDoLostID))
    }, [dispatch, requestStatus])

    const onChangeListNameHandler = useCallback((listID: string, value: string) => {
        dispatch(updateToDoList(listID, value))
    }, [dispatch])

    const onChangeItemValueHandler = useCallback((listID: string, itemID: string, title: string) => {
        dispatch(changeTask(listID, itemID, {title}))
    }, [dispatch])

    const filterTasksHandler = useCallback((toDoListID: string, value: FilterType) => {
        dispatch(changeToDoListFilterAC(toDoListID, value))
    }, [dispatch])

    const removeTaskHandler = useCallback((toDoListID: string, taskID: string) => {
        dispatch(deleteTask(toDoListID, taskID))
    }, [dispatch])

    const addNewTaskHandler = useCallback((toDoListID: string, title: string) => {
        dispatch(createTask(toDoListID, title))
    }, [dispatch])

    const changeStatusHandler = useCallback((toDoListID: string, id: string, status: TaskStatuses) => {
        dispatch(changeTask(toDoListID, id, {status}))
    }, [dispatch])

    const addNewListHandler = useCallback((name: string) => {
        dispatch(createToDoList(name))
    }, [dispatch])

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
                    </Toolbar>
                </AppBar>
                <div className={'headerPreloader'}>
                    { requestStatus === 'loading' && <LinearProgress/>}
                </div>
            </div>
            <Container>
                <div className="addNewList">
                    <Paper style={{padding: "15px" }}>
                        <h2 style={{margin: 0}}>Add New List</h2>
                        <AddNewItem addNewItem={addNewListHandler}/>
                    </Paper>
                </div>
                <Grid container spacing={2}>
                    {toDoLists.map(tdl => {
                        return (
                            <Grid item  key={tdl.id}>
                                <Todolist id={tdl.id}
                                          entityStatus={tdl.entityStatus}
                                          heading={tdl.title}
                                          tasks={tasks[tdl.id]}
                                          removeTask={removeTaskHandler}
                                          filterTasks={filterTasksHandler}
                                          addNewTask={addNewTaskHandler}
                                          changeStatus={changeStatusHandler}
                                          filterStatus={tdl.status}
                                          removeToDoList={removeToDoListHandler}
                                          changeItemValue={onChangeItemValueHandler}
                                          onChangeListName={onChangeListNameHandler}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
            <ErrorSnackbar />
        </div>
    );
})

export default AppWithUseReducer;
