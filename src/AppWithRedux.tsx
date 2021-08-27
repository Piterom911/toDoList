import React from 'react';
import './App.css';
import {taskPropsType, Todolist} from "./Todolist";
import {AddNewItem} from "./components/AddNewItem/AddNewItem";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addToDoList, changeToDoListFilter, changeToDoListTitle, removeToDoList} from "./state/todolists-reducer";
import {addNewTask, changeTaskStatus, changeTaskTitle, removeTask} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


export type ToDoListsType = {
    id: string
    title: string
    status: FilterType
}
export type TasksStateType = {
    [key: string]: taskPropsType[]
}
export type FilterType = 'all' | 'active' | 'completed'

function AppWithUseReducer() {

    const toDoLists = useSelector<AppRootStateType, Array<ToDoListsType>>( state => state.toDoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>( state => state.tasks)

    const dispatch = useDispatch();

    const removeToDoListHandler = (toDoLostID: string) => {
        dispatch(removeToDoList(toDoLostID))
    }

    const onChangeListNameHandler = (listID: string, value: string) => {
        dispatch(changeToDoListTitle(listID, value))
    }

    const onChangeItemValueHandler = (listID: string, itemID: string, value: string) => {
        dispatch(changeTaskTitle(listID, itemID, value))
    }

    const filterTasksHandler = (toDoListID: string, value: FilterType) => {
        dispatch(changeToDoListFilter(toDoListID, value))
    }

    const removeTaskHandler = (toDoListID: string, taskID: string) => {
        dispatch(removeTask(toDoListID, taskID))
    }

    const addNewTaskHandler = (toDoListID: string, title: string) => {
        dispatch(addNewTask(toDoListID, title))
    }

    const changeStatusHandler = (toDoListID: string, id: string, isDone: boolean) => {
        dispatch(changeTaskStatus(toDoListID, id, isDone))
    }

    const addNewListHandler = (name: string) => {
        let tdlID = addToDoList(name)
        dispatch(tdlID)
    }

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
                        let tasksForRender = tasks[tdl.id]

                        if (tdl.status === 'active') tasksForRender = tasksForRender.filter(t => !t.isDone)
                        if (tdl.status === 'completed') tasksForRender = tasksForRender.filter(t => t.isDone)
                        return (
                            <Grid item  key={tdl.id}>
                                <Todolist id={tdl.id}
                                          heading={tdl.title}
                                          tasks={tasksForRender}
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
}

export default AppWithUseReducer;
