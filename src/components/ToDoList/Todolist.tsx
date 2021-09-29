import React, {useCallback, useEffect} from "react";
import {AddNewItem} from "../AddNewItem/AddNewItem";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, IconButton, Paper} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "../Task/Task";
import {TaskStatuses, TaskType} from "../../api/todolists-api";
import {FilterType} from "../../state/todolists-reducer";
import {useDispatch} from "react-redux";
import {setTasks} from "../../state/tasks-reducer";

export type ToDoListPropsType = {
    id: string
    heading: string,
    tasks: Array<TaskType>
    filterStatus: FilterType
    removeTask: (toDoListID: string, id: string) => void
    filterTasks: (toDoListID: string, filterType: FilterType) => void
    addNewTask: (toDoListID: string, title: string) => void
    changeStatus: (toDoListID: string, id: string, status: TaskStatuses) => void
    removeToDoList: (toDoListID: string) => void
    changeItemValue: (listID: string, itemID: string, value: string) => void
    onChangeListName: (listID: string, value: string) => void
}

export const Todolist = React.memo((props: ToDoListPropsType) => {
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(setTasks(props.id))
    }, [])

    let tasksForRender = props.tasks
    if (props.filterStatus === 'active') tasksForRender = tasksForRender.filter(t => t.status === TaskStatuses.New)
    if (props.filterStatus === 'completed') tasksForRender = tasksForRender.filter(t => t.status === TaskStatuses.Completed)

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
                <EditableSpan status={TaskStatuses.New} title={props.heading} changeItemValue={onChangeListName} />
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

