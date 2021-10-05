// import React, {useState} from 'react';
// import {v1} from 'uuid';
// import './app/App.css';
// import {Todolist} from "./components/ToDoList/Todolist";
// import {AddNewItem} from "./components/AddNewItem/AddNewItem";
// import {AppBar, Container, Grid, IconButton, LinearProgress, Paper, Toolbar, Typography} from "@material-ui/core";
// import {Menu} from "@material-ui/icons";
// import {FilterType, ToDoListWithDomainType} from "./state/todolists-reducer";
// import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolists-api";
//
// export type TasksStateType = {
//     [key: string]: TaskType[]
// }
//
// function AppWithUseState() {
//     const toDoListID1 = v1()
//     const toDoListID2 = v1()
//
//     const [toDoLists, setToDoLists] = useState<Array<ToDoListWithDomainType>>([
//         {id: toDoListID1, entityStatus: 'idle', title: 'What to learn?', status: 'all', order: 0, addedDate: ''},
//         {id: toDoListID2, entityStatus: 'idle', title: 'What to buy?', status: 'all', order: 0, addedDate: ''}
//     ])
//
//     const [tasks, setTasks] = useState<{
//         [key: string]: TaskType[]
//     }>({
//         [toDoListID1]: [
//             {
//                 id: v1(),
//                 title: 'HTML&CSS',
//                 status: TaskStatuses.Completed,
//                 order: 0,
//                 addedDate: '',
//                 deadline: '',
//                 description: '',
//                 priority: TaskPriorities.Hi,
//                 startDate: '',
//                 todoListId: toDoListID1
//             },
//             {
//                 id: v1(),
//                 title: 'JS',
//                 status: TaskStatuses.Completed,
//                 order: 0,
//                 addedDate: '',
//                 deadline: '',
//                 description: '',
//                 priority: TaskPriorities.Hi,
//                 startDate: '',
//                 todoListId: toDoListID1
//             },
//             {
//                 id: v1(),
//                 title: 'React',
//                 status: TaskStatuses.Completed,
//                 order: 0,
//                 addedDate: '',
//                 deadline: '',
//                 description: '',
//                 priority: TaskPriorities.Hi,
//                 startDate: '',
//                 todoListId: toDoListID1
//             },
//             {
//                 id: v1(),
//                 title: 'Redux',
//                 status: TaskStatuses.Completed,
//                 order: 0,
//                 addedDate: '',
//                 deadline: '',
//                 description: '',
//                 priority: TaskPriorities.Hi,
//                 startDate: '',
//                 todoListId: toDoListID1
//             },
//             {
//                 id: v1(),
//                 title: 'Thank',
//                 status: TaskStatuses.New,
//                 order: 0,
//                 addedDate: '',
//                 deadline: '',
//                 description: '',
//                 priority: TaskPriorities.Hi,
//                 startDate: '',
//                 todoListId: toDoListID1
//             },
//             {
//                 id: v1(),
//                 title: 'Axios',
//                 status: TaskStatuses.Completed,
//                 order: 0,
//                 addedDate: '',
//                 deadline: '',
//                 description: '',
//                 priority: TaskPriorities.Hi,
//                 startDate: '',
//                 todoListId: toDoListID1
//             },
//             {
//                 id: v1(),
//                 title: 'Rest API',
//                 status: TaskStatuses.Completed,
//                 order: 0,
//                 addedDate: '',
//                 deadline: '',
//                 description: '',
//                 priority: TaskPriorities.Hi,
//                 startDate: '',
//                 todoListId: toDoListID1
//             },
//         ],
//         [toDoListID2]: [
//             {
//                 id: v1(),
//                 title: 'Knowledge',
//                 status: TaskStatuses.Completed,
//                 order: 0,
//                 addedDate: '',
//                 deadline: '',
//                 description: '',
//                 priority: TaskPriorities.Hi,
//                 startDate: '',
//                 todoListId: toDoListID1
//             },
//             {
//                 id: v1(),
//                 title: 'Book',
//                 status: TaskStatuses.Completed,
//                 order: 0,
//                 addedDate: '',
//                 deadline: '',
//                 description: '',
//                 priority: TaskPriorities.Hi,
//                 startDate: '',
//                 todoListId: toDoListID1
//             },
//             {
//                 id: v1(),
//                 title: 'Apartment',
//                 status: TaskStatuses.New,
//                 order: 0,
//                 addedDate: '',
//                 deadline: '',
//                 description: '',
//                 priority: TaskPriorities.Hi,
//                 startDate: '',
//                 todoListId: toDoListID1
//             },
//             {
//                 id: v1(),
//                 title: 'Treats',
//                 status: TaskStatuses.Completed,
//                 order: 0,
//                 addedDate: '',
//                 deadline: '',
//                 description: '',
//                 priority: TaskPriorities.Hi,
//                 startDate: '',
//                 todoListId: toDoListID1
//             },
//             {
//                 id: v1(),
//                 title: 'Milk',
//                 status: TaskStatuses.New,
//                 order: 0,
//                 addedDate: '',
//                 deadline: '',
//                 description: '',
//                 priority: TaskPriorities.Hi,
//                 startDate: '',
//                 todoListId: toDoListID1
//             },
//             {
//                 id: v1(),
//                 title: 'Happiness',
//                 status: TaskStatuses.Completed,
//                 order: 0,
//                 addedDate: '',
//                 deadline: '',
//                 description: '',
//                 priority: TaskPriorities.Hi,
//                 startDate: '',
//                 todoListId: toDoListID1
//             },
//         ],
//     })
//
//     const removeToDoList = (toDoLostID: string) => {
//         setToDoLists(toDoLists.filter(tdl => tdl.id !== toDoLostID))
//         delete tasks[toDoLostID]
//         setTasks({...tasks})
//     }
//
//     const onChangeListNameHandler = (listID: string, value: string) => {
//         setToDoLists(toDoLists.map(tdl => tdl.id === listID ? {...tdl, title: value} : tdl))
//     }
//
//     const onChangeItemValueHandler = (listID: string, itemID: string, value: string) => {
//         setTasks({...tasks, [listID]: tasks[listID].map(t => t.id === itemID ? {...t, title: value} : t)})
//     }
//
//     const filterTasks = (toDoListID: string, value: FilterType) => {
//         setToDoLists(toDoLists.map(tdl => tdl.id === toDoListID ? {...tdl, status: value} : tdl))
//     }
//
//     const removeTask = (toDoListID: string, taskID: string) => {
//         tasks[toDoListID] = tasks[toDoListID].filter(t => t.id !== taskID)
//         setTasks({...tasks})
//     }
//
//     const addNewTask = (todoListId: string, title: string) => {
//         const newTask = {
//             id: v1(),
//             title,
//             status: TaskStatuses.New,
//             order: 0,
//             addedDate: '',
//             deadline: '',
//             description: '',
//             priority: TaskPriorities.Hi,
//             startDate: '',
//             todoListId
//         }
//         setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
//     }
//
//     const changeStatus = (toDoListID: string, id: string, status: TaskStatuses) => {
//         tasks[toDoListID] = tasks[toDoListID].map(t => t.id === id ? {...t, status: status} : t)
//         setTasks({...tasks})
//     }
//
//     const addNewList = (name: string) => {
//         const newToDoList: ToDoListWithDomainType =
//             {id: toDoListID1, title: name, status: 'all', order: 0, addedDate: '', entityStatus: 'idle'}
//         setToDoLists([newToDoList, ...toDoLists])
//         setTasks({[newToDoList.id]: [], ...tasks})
//     }
//
//     return (
//         <>
//             <div className={'headerWrapper'}>
//                 <AppBar position="static">
//                     <Toolbar variant="dense">
//                         <IconButton edge="start" color="inherit" aria-label="menu">
//                             <Menu/>
//                         </IconButton>
//                         <Typography variant="h6" color="inherit">
//                             My To Do Lists... Why it does not work!?
//                         </Typography>
//                     </Toolbar>
//                 </AppBar>
//                 <div className={'headerPreloader'}>
//                     <LinearProgress variant="determinate"/>
//                 </div>
//             </div>
//             <Container>
//                 <div className="addNewList">
//                     <Paper style={{padding: "15px"}}>
//                         <h2 style={{margin: 0}}>Add New List</h2>
//                         <AddNewItem addNewItem={addNewList}/>
//                     </Paper>
//                 </div>
//                 <Grid container spacing={2}>
//                     {toDoLists.map(tdl => {
//                         let tasksForRender = tasks[tdl.id]
//
//                         if (tdl.status === 'active') tasksForRender = tasksForRender.filter(t => t.status === TaskStatuses.New)
//                         if (tdl.status === 'completed') tasksForRender = tasksForRender.filter(t => t.status === TaskStatuses.Completed)
//                         return (
//                             <Grid item>
//                                 <Todolist key={tdl.id}
//                                           entityStatus={tdl.entityStatus}
//                                           id={tdl.id}
//                                           heading={tdl.title}
//                                           tasks={tasksForRender}
//                                           removeTask={removeTask}
//                                           filterTasks={filterTasks}
//                                           addNewTask={addNewTask}
//                                           changeStatus={changeStatus}
//                                           filterStatus={tdl.status}
//                                           removeToDoList={removeToDoList}
//                                           changeItemValue={onChangeItemValueHandler}
//                                           onChangeListName={onChangeListNameHandler}
//                                 />
//                             </Grid>
//                         )
//                     })}
//                 </Grid>
//             </Container>
//         </>
//     );
// }
//
// export default AppWithUseState;

export const a = 2
