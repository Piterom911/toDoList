import React, {ChangeEvent, useCallback} from "react";
import {FilterType} from "../../App";
import {AddNewItem} from "../AddNewItem/AddNewItem";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, Checkbox, IconButton, Paper} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "../Task/Task";

export type ToDoListPropsType = {
    id: string
    heading: string,
    tasks: Array<taskPropsType>
    filterStatus: FilterType
    removeTask: (toDoListID: string, id: string) => void
    filterTasks: (toDoListID: string, filterType: FilterType) => void
    addNewTask: (toDoListID: string, title: string) => void
    changeStatus: (toDoListID: string, id: string, isDone: boolean) => void
    removeToDoList: (toDoListID: string) => void
    changeItemValue: (listID: string, itemID: string, value: string) => void
    onChangeListName: (listID: string, value: string) => void
}

export type taskPropsType = {
    id: string,
    title: string,
    isDone: boolean
}

export const Todolist = React.memo((props: ToDoListPropsType) => {
    console.log('TodoList')

    let tasksForRender = props.tasks
    if (props.filterStatus === 'active') tasksForRender = tasksForRender.filter(t => !t.isDone)
    if (props.filterStatus === 'completed') tasksForRender = tasksForRender.filter(t => t.isDone)

    const tasks = tasksForRender.map(t => <Task removeTask={props.removeTask}
                                                changeItemValue={props.changeItemValue}
                                                changeStatus={props.changeStatus}
                                                tdlID={props.id} task={t} key={t.id} />)

    const removeToDoListHandler = useCallback(() => props.removeToDoList(props.id), [props.id, props.removeToDoList])

    const onAllFilterTasksHandler = useCallback(() => props.filterTasks(props.id, 'all'), [props.filterTasks, props.id])
    const onActiveFilterTasksHandler = useCallback(() => props.filterTasks(props.id, 'active'), [props.filterTasks, props.id])
    const onCompletedFilterTasksHandler = useCallback(() => props.filterTasks(props.id, 'completed'), [props.filterTasks, props.id])

    const addNewTask = useCallback((title: string) => {
        props.addNewTask(props.id, title)
    }, [props.addNewTask, props.id])

    const onChangeListName = useCallback((value: string) => {
        props.onChangeListName(props.id, value)
    }, [props.onChangeListName, props.id])

    return (
        <Paper style={{padding: "15px" }}>
            <h3>
                <EditableSpan isDone={false} title={props.heading} changeItemValue={onChangeListName} />
                <IconButton onClick={removeToDoListHandler}>
                    <Delete />
                </IconButton>
            </h3>
            <AddNewItem addNewItem={addNewTask}/>
            <ul className="listWrapper">
                {tasks}
            </ul>
            <div>
                <Button color="primary" disabled={props.filterStatus === 'all'} variant={props.filterStatus === 'all' ? 'outlined' : 'contained'} onClick={ onAllFilterTasksHandler }>All</Button>
                <Button color="secondary" disabled={props.filterStatus === 'active'} variant={props.filterStatus === 'active' ? 'outlined' : 'contained'} onClick={ onActiveFilterTasksHandler }>Active</Button>
                <Button color="default" disabled={props.filterStatus === 'completed'} variant={props.filterStatus === 'completed' ? 'outlined' : 'contained'} onClick={ onCompletedFilterTasksHandler }>Completed</Button>
            </div>
        </Paper>
    )
});

