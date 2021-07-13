import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {filterType} from "./App";

type propsType = {
    heading?: string,
    tasks: Array<taskPropsType>
    removeTask: (id: string) => void
    filterTasks: (filterType: filterType) => void
    addNewTask: (title: string) => void
    changeStatus: (id: string, isDone: boolean) => void
    filterStatus: filterType
}

export type taskPropsType = {
    id: string,
    title: string,
    isDone: boolean
}

export const Todolist = (props: propsType) => {

    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState('')

    const tasks = props.tasks.map(t => {
        const onRemoveTaskHandler = () => props.removeTask(t.id)

        const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked)
            console.log(e.currentTarget.checked)
        }

        return (
            <li key={t.id}>
                <input onChange={changeStatusHandler} type="checkbox" checked={t.isDone}/>
                <span className={t.isDone ? 'doneTask' : ''}>{t.title} </span>
                <button onClick={ onRemoveTaskHandler }>X</button>
            </li>
        )
    })

    const onAllFilterTasksHandler = () => props.filterTasks('all')
    const onActiveFilterTasksHandler = () => props.filterTasks('active')
    const onCompletedFilterTasksHandler = () => props.filterTasks('completed')
    const onAddNewTaskHandler = () => {
        if(inputValue.trim() !== '') {
            props.addNewTask(inputValue)
        } else {
            setError('This field is required!')
        }
        setInputValue('')
    }
    const onInputChangeHandler= (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
        setError('')
    }
    const onInputKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') onAddNewTaskHandler()
    }

    return (
        <div>
            <h3>{props.heading}</h3>
            <div>
                <input className={error !== '' ? 'input-required' : ''} onKeyPress={onInputKeyPressHandler} onChange={onInputChangeHandler} value={inputValue}/>
                <button onClick={onAddNewTaskHandler}>+</button>
                {error && <p className="required-field">{error}</p>}
            </div>
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