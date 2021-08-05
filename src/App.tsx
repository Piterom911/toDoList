import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {taskPropsType, Todolist} from "./Todolist";
import {AddNewItem} from "./components/AddNewItem/AddNewItem";

export type filterType = 'all' | 'active' | 'completed'
type toDoListsType = {
    id: string
    title: string
    status: filterType
}
type tasksStateType = {
    [key: string]: taskPropsType[]
}

function App() {
    const toDoListID1 = v1()
    const toDoListID2 = v1()

    const [toDoLists, setToDoLists] = useState<Array<toDoListsType>>([
        {id: toDoListID1, title: 'What to learn?', status: 'all'},
        {id: toDoListID2, title: 'What to buy?', status: 'all'}
    ])

    const [tasks, setTasks] = useState<tasksStateType>({
        [toDoListID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'MobX', isDone: false},
            {id: v1(), title: 'Thank', isDone: false},
            {id: v1(), title: 'Axios', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'And more...', isDone: false}
        ],
        [toDoListID2]: [
            {id: v1(), title: 'Knowledge', isDone: true},
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Apartment', isDone: false},
            {id: v1(), title: 'Treats', isDone: false},
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Happiness', isDone: true},
        ],
    })

    const removeToDoList = (toDoLostID: string) => {
        setToDoLists(toDoLists.filter(tdl => tdl.id !== toDoLostID))
        delete tasks[toDoLostID]
        setTasks({...tasks})
    }

    const onChangeListNameHandler = (listID: string, value: string) => {
        setToDoLists(toDoLists.map( tdl => tdl.id === listID ? {...tdl, title: value} : tdl))
    }

    const onChangeItemValueHandler = (listID: string, itemID: string, value: string) => {
        setTasks({...tasks, [listID]: tasks[listID].map( t => t.id === itemID ? {...t, title: value} : t)})
    }

    const filterTasks = (toDoListID: string, value: filterType) => {
        setToDoLists(toDoLists.map( tdl => tdl.id === toDoListID ? {...tdl, status: value} : tdl))
    }

    const removeTask = (toDoListID: string, taskID: string) => {
        tasks[toDoListID] = tasks[toDoListID].filter(t => t.id !== taskID)
        setTasks({...tasks})
    }

    const addNewTask = (toDoListID: string, title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [toDoListID]: [newTask, ...tasks[toDoListID]]})
    }

    const changeStatus = (toDoListID: string, id: string, isDone: boolean) => {
        tasks[toDoListID] = tasks[toDoListID].map(t => t.id === id ? {...t, isDone: isDone} : t)
        setTasks({...tasks})
    }

    const addNewList = (name: string) => {
        const newToDoList: toDoListsType = {id: v1(), title: name, status: 'all'}
        setToDoLists([newToDoList, ...toDoLists])
        setTasks({[newToDoList.id]: [], ...tasks})
    }

    return (
        <div>
            <div style={{marginLeft: "30px"}}>
                <h4>Add New List</h4>
                <AddNewItem addNewItem={addNewList}/>
            </div>
            <div className="App">
                {toDoLists.map(tdl => {
                    let tasksForRender = tasks[tdl.id]

                    if (tdl.status === 'active') tasksForRender = tasksForRender.filter(t => !t.isDone)
                    if (tdl.status === 'completed') tasksForRender = tasksForRender.filter(t => t.isDone)
                    return (
                        <Todolist key={tdl.id}
                                  id={tdl.id}
                                  heading={tdl.title}
                                  tasks={tasksForRender}
                                  removeTask={removeTask}
                                  filterTasks={filterTasks}
                                  addNewTask={addNewTask}
                                  changeStatus={changeStatus}
                                  filterStatus={tdl.status}
                                  removeToDoList={removeToDoList}
                                  changeItemValue={onChangeItemValueHandler}
                                  onChangeListName={onChangeListNameHandler}
                        />
                    )
                })}
            </div>
        </div>
    );
}

export default App;
