import React, {ChangeEvent} from "react";
import {FilterType} from "./App";
import {AddNewItem} from "./components/AddNewItem/AddNewItem";
import {EditableSpan} from "./components/EditableSpan/EditableSpan";
import {Button, Checkbox, Grid, IconButton, Paper} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type propsType = {
    id: string
    heading: string,
    tasks: Array<taskPropsType>
    removeTask: (toDoListID: string, id: string) => void
    filterTasks: (toDoListID: string, filterType: FilterType) => void
    addNewTask: (toDoListID: string, title: string) => void
    changeStatus: (toDoListID: string, id: string, isDone: boolean) => void
    filterStatus: FilterType
    removeToDoList: (toDoListID: string) => void
    changeItemValue: (listID: string, itemID: string, value: string) => void
    onChangeListName: (listID: string, value: string) => void
}

export type taskPropsType = {
    id: string,
    title: string,
    isDone: boolean
}

export const Todolist = (props: propsType) => {

    const tasks = props.tasks.map(t => {
        const onChangeItemHandler = (value: string) => {
            props.changeItemValue(props.id, t.id, value)
        }
        const onRemoveTaskHandler = () => props.removeTask(props.id, t.id)

        const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(props.id, t.id, e.currentTarget.checked)
        }


        return (
            <li className="listItem" key={t.id}>
                <Checkbox className="itemCheckBox" color="primary" onChange={changeStatusHandler} checked={t.isDone}/>
                <EditableSpan changeItemValue={onChangeItemHandler} isDone={t.isDone} title={t.title} />
                <IconButton className={"iconTrash"} onClick={ onRemoveTaskHandler }>
                    <Delete />
                </IconButton>
            </li>
        )
    })

    const removeToDoListHandler = () => props.removeToDoList(props.id)

    const onAllFilterTasksHandler = () => props.filterTasks(props.id, 'all')
    const onActiveFilterTasksHandler = () => props.filterTasks(props.id, 'active')
    const onCompletedFilterTasksHandler = () => props.filterTasks(props.id, 'completed')
    const addNewTask = (title: string) => {
        props.addNewTask(props.id, title)
    }

    const onChangeListName = (value: string) => {
        props.onChangeListName(props.id, value)
    }

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
};

