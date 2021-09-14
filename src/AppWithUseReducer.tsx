import React, {useReducer} from 'react';
import {v1} from 'uuid';
import './App.css';
import {Todolist} from "./components/ToDoList/Todolist";
import {AddNewItem} from "./components/AddNewItem/AddNewItem";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addToDoList,
    changeToDoListFilter,
    changeToDoListTitle,
    removeToDoList,
    toDoListReducer
} from "./state/todolists-reducer";
import {
    addNewTask,
    changeTaskStatus,
    changeTaskTitle,
    removeTask,
    removeTodolist,
    tasksReducer
} from "./state/tasks-reducer";

export type FilterType = 'all' | 'active' | 'completed'

function AppWithUseReducer() {
    const toDoListID1 = v1()
    const toDoListID2 = v1()

    const [toDoLists, dispatchToDoLists] = useReducer( toDoListReducer,[
        {id: toDoListID1, title: 'What to learn?', status: 'all'},
        {id: toDoListID2, title: 'What to buy?', status: 'all'}
    ])

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [toDoListID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'Thank', isDone: false},
            {id: v1(), title: 'Axios', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
        ],
        [toDoListID2]: [
            {id: v1(), title: 'Knowledge', isDone: true},
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Apartment', isDone: false},
            {id: v1(), title: 'Treats', isDone: false},
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Happiness', isDone: true},
        ],
    })

    const removeToDoListHandler = (toDoLostID: string) => {
        dispatchToDoLists(removeToDoList(toDoLostID))
        dispatchToTasks(removeTodolist(toDoLostID))
    }

    const onChangeListNameHandler = (listID: string, value: string) => {
        dispatchToDoLists(changeToDoListTitle(listID, value))
    }

    const onChangeItemValueHandler = (listID: string, itemID: string, value: string) => {
        dispatchToTasks(changeTaskTitle(listID, itemID, value))
    }

    const filterTasksHandler = (toDoListID: string, value: FilterType) => {
        dispatchToDoLists(changeToDoListFilter(toDoListID, value))
    }

    const removeTaskHandler = (toDoListID: string, taskID: string) => {
        dispatchToTasks(removeTask(toDoListID, taskID))
    }

    const addNewTaskHandler = (toDoListID: string, title: string) => {
        dispatchToTasks(addNewTask(toDoListID, title))
    }

    const changeStatusHandler = (toDoListID: string, id: string, isDone: boolean) => {
        dispatchToTasks(changeTaskStatus(toDoListID, id, isDone))
    }

    const addNewListHandler = (name: string) => {
        let tdlID = addToDoList(name)
        dispatchToDoLists(tdlID)
        dispatchToTasks(tdlID)
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
