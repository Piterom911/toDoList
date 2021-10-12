import React, {useCallback, useEffect} from 'react';
import {Todolist} from "./ToDoList/Todolist";
import {AddNewItem} from "../../components/AddNewItem/AddNewItem";
import {Grid, Paper} from "@material-ui/core";
import {
    changeToDoListFilterAC,
    createToDoList,
    deleteToDoList,
    FilterType,
    setToDoListsTC,
    ToDoListDomainType,
    updateToDoList
} from "./todolists-reducer";
import {changeTask, createTask, deleteTask, LocalTasksType,} from "./tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {TaskStatuses, ToDoListType} from "../../api/todolists-api";
import {RequestStatusType} from "../../app/appReducer";
import {Redirect} from "react-router-dom";
import {initializeAppTC} from "../Login/auth-reducer";

export const ToDoListsAll = React.memo(function() {
    const toDoLists = useSelector<AppRootStateType, Array<ToDoListType & ToDoListDomainType>>( state => state.toDoLists)
    const tasks = useSelector<AppRootStateType, LocalTasksType>( state => state.tasks)
    const requestStatus = useSelector<AppRootStateType, RequestStatusType>( state => state.app.requestStatus)
    const isLoggedIn = useSelector<AppRootStateType, boolean>( state => state.login.isLoggedIn )

    const dispatch = useDispatch();

    useEffect( () => {
        if (!isLoggedIn) return
        dispatch(setToDoListsTC())
    }, [dispatch])

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

    if (!isLoggedIn) {
        return <Redirect to={'/login'} />
    }

    return (
            <>
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
            </>
    );
})
