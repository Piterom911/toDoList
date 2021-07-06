import React from "react";
import {filterType} from "./App";

type propsType = {
    heading?: string,
    tasks: Array<taskPropsType>
    removeTask: (id: number) => void
    filterTasks: (filterType: filterType) => void
}

export type taskPropsType = {
    id: number,
    title: string,
    isDone: boolean
}

export const Todolist = (props: propsType) => {
    return (
        <div>
            <h3>{props.heading}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(t => <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title} </span>
                    <button onClick={ () => props.removeTask(t.id)}>X</button>
                </li>)}
            </ul>
            <div>
                <button onClick={ () => props.filterTasks('all') }>All</button>
                <button onClick={ () => props.filterTasks('active') }>Active</button>
                <button onClick={ () => props.filterTasks('completed') }>Completed</button>
            </div>
        </div>
    )
};