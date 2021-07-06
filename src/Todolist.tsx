import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {filterType} from "./App";

type propsType = {
    heading?: string,
    tasks: Array<taskPropsType>
    removeTask: (id: string) => void
    filterTasks: (filterType: filterType) => void
    addNewTask: (title: string) => void
}

export type taskPropsType = {
    id: string,
    title: string,
    isDone: boolean
}

export const Todolist = (props: propsType) => {

    const [inputValue, setInputValue] = useState('')

    const tasks = props.tasks.map(t => {
        const onRemoveTaskHandler = () => props.removeTask(t.id)
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title} </span>
                <button onClick={ onRemoveTaskHandler }>X</button>
            </li>
        )
    })

    const onAllFilterTasksHandler = () => props.filterTasks('all')
    const onActiveFilterTasksHandler = () => props.filterTasks('active')
    const onCompletedFilterTasksHandler = () => props.filterTasks('completed')
    const onAddNewTaskHandler = () => {
        props.addNewTask(inputValue)
        setInputValue('')
    }
    const onInputChangeHandler= (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
    }
    const onInputKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') onAddNewTaskHandler()
    }

    return (
        <div>
            <h3>{props.heading}</h3>
            <div>
                <input onKeyPress={onInputKeyPressHandler} onChange={onInputChangeHandler} value={inputValue}/>
                <button onClick={onAddNewTaskHandler}>+</button>
            </div>
            <ul>
                {tasks}
            </ul>
            <div>
                <button onClick={ onAllFilterTasksHandler }>All</button>
                <button onClick={ onActiveFilterTasksHandler }>Active</button>
                <button onClick={ onCompletedFilterTasksHandler }>Completed</button>
            </div>
        </div>
    )
};