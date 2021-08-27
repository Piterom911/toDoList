import {TasksStateType} from "../App";
import {v1} from "uuid";
import {RemoveToDoListType} from "./todolists-reducer";

type RemoveTaskType = { type: 'REMOVE-TASK'; tdlID: string; id: string }
type AddNewTaskType = { type: 'ADD-NEW-TASK'; tdlID: string; title: string }
type ChangeTaskStatusType = { type: 'CHANGE-TASK-STATUS'; tdlID: string; id: string; isDone: boolean }
type ChangeTaskTitleType = { type: 'CHANGE-TASK-TITLE'; tdlID: string; id: string; title: string }
type AddToDoListType = { type: 'ADD-TODOLIST'; tdlID: string; }

type ActionType = RemoveTaskType | AddNewTaskType | ChangeTaskStatusType
    | ChangeTaskTitleType | AddToDoListType | RemoveToDoListType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
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
                ...state,
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
            return state
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
export const addNewToDoListTasksArray = (tdlID: string): AddToDoListType => ({type: 'ADD-TODOLIST', tdlID})
export const removeTodolist = (tdlID: string): RemoveToDoListType => ({type: 'REMOVE-TODOLIST', tdlID})