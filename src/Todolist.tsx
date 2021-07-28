import React, {ChangeEvent} from "react";
import {filterType} from "./App";
import {AddNewItem} from "./components/AddNewItem/AddNewItem";
import {EditableSpan} from "./components/EditableSpan/EditableSpan";

type propsType = {
    id: string
    heading: string,
    tasks: Array<taskPropsType>
    removeTask: (toDoListID: string, id: string) => void
    filterTasks: (toDoListID: string, filterType: filterType) => void
    addNewTask: (toDoListID: string, title: string) => void
    changeStatus: (toDoListID: string, id: string, isDone: boolean) => void
    filterStatus: filterType
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
            <li key={t.id}>
                <input onChange={changeStatusHandler} type="checkbox" checked={t.isDone}/>
                <EditableSpan changeItemValue={onChangeItemHandler} isDone={t.isDone} title={t.title} />
                <button onClick={ onRemoveTaskHandler }>X</button>
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
        <div>
            <h3>
                <EditableSpan isDone={false} title={props.heading} changeItemValue={onChangeListName} />
                <button onClick={removeToDoListHandler}>X</button>
            </h3>
            <AddNewItem addNewItem={addNewTask}/>
            <ul>
                {tasks}
            </ul>
            <div>
                <button className={props.filterStatus === 'all' ? 'active-filter' : ''} onClick={ onAllFilterTasksHandler }>All</button>
                <button className={props.filterStatus === 'active' ? 'active-filter' : ''} onClick={ onActiveFilterTasksHandler }>Active</button>
                <button className={props.filterStatus === 'completed' ? 'active-filter' : ''} onClick={ onCompletedFilterTasksHandler }>Completed</button>
            </div>
        </div>
    )
};

