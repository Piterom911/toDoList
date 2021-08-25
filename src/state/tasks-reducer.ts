import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddToDoListType, RemoveToDoListType} from "./todolists-reducer";

type RemoveTaskType = { type: 'REMOVE-TASK'; tdlID: string; id: string }
type AddNewTaskType = { type: 'ADD-NEW-TASK'; tdlID: string; title: string }
type ChangeTaskStatusType = { type: 'CHANGE-TASK-STATUS'; tdlID: string; id: string; isDone: boolean }
type ChangeTaskTitleType = { type: 'CHANGE-TASK-TITLE'; tdlID: string; id: string; title: string }

type ActionType = RemoveTaskType | AddNewTaskType | ChangeTaskStatusType
    | ChangeTaskTitleType | AddToDoListType | RemoveToDoListType

export const tasksReducer = (state: TasksStateType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.tdlID]: state[action.tdlID].filter( t => t.id !== action.id)
            }
        }
        case "ADD-NEW-TASK": {
            const newTask = {id: v1(), title: action.title, isDone: false}
            return {
                ...state,
                [action.tdlID]: [newTask,...state[action.tdlID]]
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.tdlID]: state[action.tdlID].map( task => (
                    task.id === action.id ? {...task, isDone: action.isDone} : task
                ))
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                [action.tdlID]: state[action.tdlID].map( task => (
                    task.id === action.id ? {...task, title: action.title} : task
                ))
            }
        }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.tdlID]: []
            }
        }
        case "REMOVE-TODOLIST": {
            const newState = {...state}
            delete newState[action.tdlID]
            return newState
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTask = (tdlID: string, id: string): RemoveTaskType => (
    {type: 'REMOVE-TASK', tdlID, id}
)
export const addNewTask = (tdlID: string, title: string): AddNewTaskType => (
    {type: 'ADD-NEW-TASK', tdlID, title}
)
export const changeTaskStatus = (tdlID: string, id: string, isDone: boolean): ChangeTaskStatusType => (
    {type: 'CHANGE-TASK-STATUS', tdlID, id, isDone}
)
export const changeTaskTitle = (tdlID: string, id: string, title: string): ChangeTaskTitleType => (
    {type: 'CHANGE-TASK-TITLE', tdlID, id, title}
)
export const addNewToDoList = (tdlID: string, title: string): AddToDoListType => ({type: 'ADD-TODOLIST', tdlID, title})
export const removeTodolist = (tdlID: string): RemoveToDoListType => ({type: 'REMOVE-TODOLIST', tdlID})