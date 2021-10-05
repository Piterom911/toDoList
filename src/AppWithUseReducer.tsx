// import React, {useReducer} from 'react';
// import {v1} from 'uuid';
// import './app/App.css';
// import {Todolist} from "./components/ToDoList/Todolist";
// import {AddNewItem} from "./components/AddNewItem/AddNewItem";
// import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
// import {Menu} from "@material-ui/icons";
// import {
//     addToDoListAC,
//     changeToDoListFilterAC,
//     changeToDoListTitleAC,
//     FilterType,
//     removeToDoListAC,
//     toDoListReducer
// } from "./state/todolists-reducer";
// import {
//     addNewTaskAC,
//     removeTaskAC,
//     removeTodolistAC,
//     tasksReducer
// } from "./state/tasks-reducer";
// import {TaskPriorities, TaskStatuses} from "./api/todolists-api";
//
// function AppWithUseReducer() {
//     const toDoListID1 = v1()
//     const toDoListID2 = v1()
//
//     const [toDoLists, dispatchToDoLists] = useReducer( toDoListReducer,[
//         {id: toDoListID1, entityStatus: 'idle', title: 'What to learn?', status: 'all', order: 0, addedDate: ''},
//         {id: toDoListID2, entityStatus: 'idle', title: 'What to buy?', status: 'all', order: 0, addedDate: ''}
//     ])
//
//     const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
//         [toDoListID1]: [
//             {id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, order: 0, addedDate: '', deadline: '', description: '', priority: TaskPriorities.Hi, startDate: '', todoListId: toDoListID1},
//             {id: v1(), title: 'JS', status: TaskStatuses.Completed, order: 0, addedDate: '', deadline: '', description: '', priority: TaskPriorities.Hi, startDate: '', todoListId: toDoListID1},
//             {id: v1(), title: 'React', status: TaskStatuses.Completed, order: 0, addedDate: '', deadline: '', description: '', priority: TaskPriorities.Hi, startDate: '', todoListId: toDoListID1},
//             {id: v1(), title: 'Redux', status: TaskStatuses.Completed, order: 0, addedDate: '', deadline: '', description: '', priority: TaskPriorities.Hi, startDate: '', todoListId: toDoListID1},
//             {id: v1(), title: 'Thank', status: TaskStatuses.New, order: 0, addedDate: '', deadline: '', description: '', priority: TaskPriorities.Hi, startDate: '', todoListId: toDoListID1},
//             {id: v1(), title: 'Axios', status: TaskStatuses.Completed, order: 0, addedDate: '', deadline: '', description: '', priority: TaskPriorities.Hi, startDate: '', todoListId: toDoListID1},
//             {id: v1(), title: 'Rest API', status: TaskStatuses.Completed, order: 0, addedDate: '', deadline: '', description: '', priority: TaskPriorities.Hi, startDate: '', todoListId: toDoListID1},
//         ],
//         [toDoListID2]: [
//             {id: v1(), title: 'Knowledge', status: TaskStatuses.Completed, order: 0, addedDate: '', deadline: '', description: '', priority: TaskPriorities.Hi, startDate: '', todoListId: toDoListID1},
//             {id: v1(), title: 'Book', status: TaskStatuses.Completed, order: 0, addedDate: '', deadline: '', description: '', priority: TaskPriorities.Hi, startDate: '', todoListId: toDoListID1},
//             {id: v1(), title: 'Apartment', status: TaskStatuses.New, order: 0, addedDate: '', deadline: '', description: '', priority: TaskPriorities.Hi, startDate: '', todoListId: toDoListID1},
//             {id: v1(), title: 'Treats', status: TaskStatuses.Completed, order: 0, addedDate: '', deadline: '', description: '', priority: TaskPriorities.Hi, startDate: '', todoListId: toDoListID1},
//             {id: v1(), title: 'Milk', status: TaskStatuses.New, order: 0, addedDate: '', deadline: '', description: '', priority: TaskPriorities.Hi, startDate: '', todoListId: toDoListID1},
//             {id: v1(), title: 'Happiness', status: TaskStatuses.Completed, order: 0, addedDate: '', deadline: '', description: '', priority: TaskPriorities.Hi, startDate: '', todoListId: toDoListID1},
//         ],
//     })
//
//     const removeToDoListHandler = (toDoLostID: string) => {
//         dispatchToDoLists(removeToDoListAC(toDoLostID))
//         dispatchToTasks(removeTodolistAC(toDoLostID))
//     }
//
//     const onChangeListNameHandler = (listID: string, value: string) => {
//         dispatchToDoLists(changeToDoListTitleAC(listID, value))
//     }
//
//     const onChangeItemValueHandler = (listID: string, itemID: string, value: string) => {
//         // dispatchToTasks(changeTaskTitleAC(listID, itemID, value))
//     }
//
//     const filterTasksHandler = (toDoListID: string, value: FilterType) => {
//         dispatchToDoLists(changeToDoListFilterAC(toDoListID, value))
//     }
//
//     const removeTaskHandler = (toDoListID: string, taskID: string) => {
//         dispatchToTasks(removeTaskAC(toDoListID, taskID))
//     }
//
//     const addNewTaskHandler = (toDoListID: string, title: string) => {
//         dispatchToTasks(addNewTaskAC(toDoListID, {description: 'string',
//             title: 'string',
//             status: TaskStatuses.New,
//             priority: 0,
//             startDate: '',
//             deadline: 'string',
//             id: 'Jenifer',
//             todoListId: 'Some id',
//             order: 0,
//             addedDate: 'string',}))
//     }
//
//     const changeStatusHandler = (toDoListID: string, id: string, status: TaskStatuses) => {
//         // dispatchToTasks(changeTaskStatusAC(toDoListID, id, status))
//     }
//
//     const addNewListHandler = (name: string) => {
//         let tdlID = addToDoListAC(name)
//         dispatchToDoLists(tdlID)
//         dispatchToTasks(tdlID)
//     }
//
//     return (
//         <div>
//             <AppBar position="static">
//                 <Toolbar variant="dense">
//                     <IconButton edge="start" color="inherit" aria-label="menu">
//                         <Menu />
//                     </IconButton>
//                     <Typography variant="h6" color="inherit">
//                         My To Do Lists
//                     </Typography>
//                 </Toolbar>
//             </AppBar>
//             <Container>
//                 <div className="addNewList">
//                     <Paper style={{padding: "15px" }}>
//                         <h2 style={{margin: 0}}>Add New List</h2>
//                         <AddNewItem addNewItem={addNewListHandler}/>
//                     </Paper>
//                 </div>
//                 <Grid container spacing={2}>
//                     {toDoLists.map(tdl => {
//                         let tasksForRender = tasks[tdl.id]
//
//                         if (tdl.status === 'active') tasksForRender = tasksForRender.filter(t => t.status === TaskStatuses.New)
//                         if (tdl.status === 'completed') tasksForRender = tasksForRender.filter(t => t.status === TaskStatuses.Completed)
//                         return (
//                             <Grid item  key={tdl.id}>
//                                 <Todolist id={tdl.id}
//                                           entityStatus={tdl.entityStatus}
//                                           heading={tdl.title}
//                                           tasks={tasksForRender}
//                                           removeTask={removeTaskHandler}
//                                           filterTasks={filterTasksHandler}
//                                           addNewTask={addNewTaskHandler}
//                                           changeStatus={changeStatusHandler}
//                                           filterStatus={tdl.status}
//                                           removeToDoList={removeToDoListHandler}
//                                           changeItemValue={onChangeItemValueHandler}
//                                           onChangeListName={onChangeListNameHandler}
//                                 />
//                             </Grid>
//                         )
//                     })}
//                 </Grid>
//             </Container>
//         </div>
//     );
// }
//
// export default AppWithUseReducer;
export const b = 2
