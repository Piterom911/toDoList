import React, {useState} from 'react';
import './App.css';
import {taskPropsType, Todolist} from "./Todolist";

export type filterType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState<Array<taskPropsType>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Hello World', isDone: false},
        {id: 5, title: 'This will be my first time hiking in the mountains', isDone: true},
        {id: 6, title: 'It is working', isDone: false},
        {id: 7, title: 'I am not the same anymore.', isDone: true},
        {id: 8, title: 'What about you', isDone: false},
        {id: 9, title: 'Do you really want to do this?', isDone: true}
    ])

    let tasksForRender = tasks

    let [filter, setFilter] = useState<filterType>('all')

    if(filter === 'active') {
        tasksForRender = tasks.filter( t => !t.isDone )
    }
    if(filter === 'completed') tasksForRender = tasks.filter( t => t.isDone )

    const filterTasks = (value: filterType) => {
        setFilter(value)
    }

    const removeTask = (taskID: number) => {
        tasksForRender = tasks.filter( t => t.id !== taskID )
        setTasks(tasksForRender)
    }

    return (
        <div className="App">
            <Todolist heading={'What to learn 1'}
                      tasks={tasksForRender}
                      removeTask={removeTask}
                      filterTasks={filterTasks}
            />
        </div>
    );
}

export default App;
