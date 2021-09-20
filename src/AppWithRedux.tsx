import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from "./components/ToDoList/Todolist";
import {AddNewItem} from "./components/AddNewItem/AddNewItem";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addToDoList, changeToDoListFilter, changeToDoListTitle, FilterType, removeToDoList} from "./state/todolists-reducer";
import {addNewTask, changeTaskStatus, changeTaskTitle, removeTask} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskStatuses, TaskType, ToDoListType} from "./api/todolists-api";

export type TasksStateType = {
    [key: string]: TaskType[]
}

const AppWithUseReducer = React.memo(function() {
    const toDoLists = useSelector<AppRootStateType, Array<ToDoListType & {status: FilterType}>>( state => state.toDoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>( state => state.tasks)

    const dispatch = useDispatch();

    const removeToDoListHandler = useCallback((toDoLostID: string) => {
        dispatch(removeToDoList(toDoLostID))
    }, [dispatch])

    const onChangeListNameHandler = useCallback((listID: string, value: string) => {
        dispatch(changeToDoListTitle(listID, value))
    }, [dispatch])

    const onChangeItemValueHandler = useCallback((listID: string, itemID: string, value: string) => {
        dispatch(changeTaskTitle(listID, itemID, value))
    }, [dispatch])

    const filterTasksHandler = useCallback((toDoListID: string, value: FilterType) => {
        dispatch(changeToDoListFilter(toDoListID, value))
    }, [dispatch])

    const removeTaskHandler = useCallback((toDoListID: string, taskID: string) => {
        dispatch(removeTask(toDoListID, taskID))
    }, [dispatch])

    const addNewTaskHandler = useCallback((toDoListID: string, title: string) => {
        dispatch(addNewTask(toDoListID, title))
    }, [dispatch])

    const changeStatusHandler = useCallback((toDoListID: string, id: string, status: TaskStatuses) => {
        dispatch(changeTaskStatus(toDoListID, id, status))
    }, [dispatch])

    const addNewListHandler = useCallback((name: string) => {
        let tdlID = addToDoList(name)
        dispatch(tdlID)
    }, [dispatch])

    return (
        <div>
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
        </div>
    );
})

export default AppWithUseReducer;
