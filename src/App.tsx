import React, {useState} from 'react';
import { v1 } from 'uuid';
import './App.css';
import {taskPropsType, Todolist} from "./Todolist";

export type filterType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState<Array<taskPropsType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Hello World', isDone: false},
        {id: v1(), title: 'This will be my first time hiking in the mountains', isDone: true},
        {id: v1(), title: 'It is working', isDone: false},
        {id: v1(), title: 'I am not the same anymore.', isDone: true},
        {id: v1(), title: 'What about you', isDone: false},
        {id: v1(), title: 'Do you really want to do this?', isDone: true}
    ])

    let tasksForRender = tasks

    const [filter, setFilter] = useState<filterType>('all')

    if(filter === 'active') {
        tasksForRender = tasks.filter( t => !t.isDone )
    }
    if(filter === 'completed') tasksForRender = tasks.filter( t => t.isDone )

    const filterTasks = (value: filterType) => {
        setFilter(value)
    }

    const removeTask = (taskID: string) => {
        tasksForRender = tasks.filter( t => t.id !== taskID )
        setTasks(tasksForRender)
    }

    const addNewTask = (title: string) => {
        setTasks([{id: v1(), title, isDone: false}, ...tasks])
    }

    const changeStatus = (id: string, isDone: boolean) => {
        // let taskForChange = tasks.find(t => t.id)
        // if (taskForChange) {
        //     taskForChange.isDone = isDone
        //     setTasks([...tasks])
        // }
        setTasks(tasks.map( t => t.id === id ? {...t, isDone: isDone} : t ))
    }

    return (
        <div className="App">
            <Todolist heading={'What to learn 1'}
                      tasks={tasksForRender}
                      removeTask={removeTask}
                      filterTasks={filterTasks}
                      addNewTask={addNewTask}
                      changeStatus={changeStatus}
                      filterStatus={filter}
            />
        </div>
    );
}

export default App;
