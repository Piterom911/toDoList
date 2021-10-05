import React, {useCallback, useEffect} from "react";
import {AddNewItem} from "../AddNewItem/AddNewItem";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, IconButton, Paper} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../api/todolists-api";
import {FilterType} from "../../state/todolists-reducer";
import {useDispatch} from "react-redux";
import {setTasks, TaskWithLocalDataType} from "../../state/tasks-reducer";
import {RequestStatusType} from "../../state/appReducer";

export type ToDoListPropsType = {
    id: string
    heading: string,
    tasks: Array<TaskType & TaskWithLocalDataType>
    filterStatus: FilterType
    entityStatus: RequestStatusType
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
    }, [dispatch, props.id])

    let tasksForRender = props.tasks
    if (props.filterStatus === 'active') tasksForRender = tasksForRender.filter(t => t.status === TaskStatuses.New)
    if (props.filterStatus === 'completed') tasksForRender = tasksForRender.filter(t => t.status === TaskStatuses.Completed)

    const tasks = tasksForRender.map(t => <Task removeTask={props.removeTask}
                                                changeItemValue={props.changeItemValue}
                                                changeStatus={props.changeStatus}
                                                tdlID={props.id} task={t} key={t.id} />)

    const removeToDoListHandler = useCallback(() => props.removeToDoList(props.id), [props])

    const onAllFilterTasksHandler = useCallback(() => props.filterTasks(props.id, 'all'), [props])
    const onActiveFilterTasksHandler = useCallback(() => props.filterTasks(props.id, 'active'), [props])
    const onCompletedFilterTasksHandler = useCallback(() => props.filterTasks(props.id, 'completed'), [props])

    const addNewTask = useCallback((title: string) => {
        props.addNewTask(props.id, title)
    }, [props])

    const onChangeListName = useCallback((value: string) => {
        props.onChangeListName(props.id, value)
    }, [props])

    console.log(props.entityStatus)
    return (
        <Paper className={`toDoListsWrapper ${props.entityStatus === 'loading' && 'entityRequest'}`}>
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
                <Button style={{margin: '0 5px'}} color="secondary" disabled={props.filterStatus === 'all'} variant={props.filterStatus === 'all' ? 'outlined' : 'contained'} onClick={ onAllFilterTasksHandler }>All</Button>
                <Button style={{margin: '0 5px'}} color="primary" disabled={props.filterStatus === 'active'} variant={props.filterStatus === 'active' ? 'outlined' : 'contained'} onClick={ onActiveFilterTasksHandler }>Active</Button>
                <Button style={{margin: '0 5px'}} color="primary" disabled={props.filterStatus === 'completed'} variant={props.filterStatus === 'completed' ? 'outlined' : 'contained'} onClick={ onCompletedFilterTasksHandler }>Completed</Button>
            </div>
        </Paper>
    )
});

