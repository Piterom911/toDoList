import {TasksStateType} from "../App";
import {TaskType, toDoListsAPI, UpdateDataType, UpdateTaskType} from "../api/todolists-api";
import {SetTDLsACType} from "./todolists-reducer";
import {AppRootStateType, ThunkType} from "./store";

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case "SET-TO-DO-LISTS":
            const newState = {...state}
            action.tdls.forEach(t => newState[t.id] = [])
            return newState
        case "SET-TASKS":
            return {...state, [action.tdlID]: action.tasks}
        case 'REMOVE-TASK':
            return {...state, [action.tdlID]: state[action.tdlID].filter(t => t.id !== action.id)}
        case "ADD-NEW-TASK":
            return {...state, [action.tdlID]: [action.taskData, ...state[action.tdlID]]}
        case "CHANGE-TASK":
            return {
                ...state, [action.tdlID]: state[action.tdlID].map(task =>
                    (task.id === action.id ? {...task, ...action.newData} : task))
            }
        case "ADD-TODOLIST":
            return {...state, [action.tdlID]: []}
        case "REMOVE-TODOLIST": {
            const newState = {...state}
            delete newState[action.tdlID]
            return newState
        }
        default:
            return state
    }
}

export type TasksActionType = SetTasksACType | RemoveTaskACType | RemoveTodolistACType
    | AddNewTaskACType | ChangeTaskACType | AddNewToDoListTasksArrayACType
    | SetTDLsACType

export type SetTasksACType = ReturnType<typeof setTasksAC>
export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type AddNewTaskACType = ReturnType<typeof addNewTaskAC>
export type ChangeTaskACType = ReturnType<typeof changeTaskAC>
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type AddNewToDoListTasksArrayACType = ReturnType<typeof addNewToDoListTasksArrayAC>

export const setTasksAC = (tdlID: string, tasks: TaskType[]) => (
    {type: 'SET-TASKS', tdlID, tasks} as const
)
export const removeTaskAC = (tdlID: string, id: string) => (
    {type: 'REMOVE-TASK', tdlID, id} as const
)
export const addNewTaskAC = (tdlID: string, taskData: TaskType) => (
    {type: 'ADD-NEW-TASK', tdlID, taskData} as const
)
export const changeTaskAC = (tdlID: string, id: string, newData: UpdateTaskType) => (
    {type: 'CHANGE-TASK', tdlID, id, newData} as const
)
export const removeTodolistAC = (tdlID: string) => ({type: 'REMOVE-TODOLIST', tdlID} as const)
export const addNewToDoListTasksArrayAC = (tdlID: string) => ({type: 'ADD-TODOLIST', tdlID} as const)

export const setTasks = (tdlID: string): ThunkType => async dispatch => {
    const response = await toDoListsAPI.getTasks(tdlID)
    dispatch(setTasksAC(tdlID, response.data.items))
}
export const createTask = (tdlID: string, title: string): ThunkType => async dispatch => {
    const response = await toDoListsAPI.createTask(tdlID, title)
    dispatch(addNewTaskAC(tdlID, response.data.data.item))
}
export const deleteTask = (tdlID: string, taskID: string): ThunkType => async dispatch => {
    await toDoListsAPI.deleteTasks(tdlID, taskID)
    dispatch(removeTaskAC(tdlID, taskID))
}
export const changeTask = (tdlID: string, taskID: string, newData: UpdateDataType): ThunkType =>
    async (dispatch, getState: () => AppRootStateType) => {
        let task = getState().tasks[tdlID].find( t => t.id === taskID)
        if (!task) {
            console.warn('There is no such taskID')
            return
        }
        const currentTaskValues = {
            title: task.title,
            description: task.description,
            priority: task.priority,
            status: task.status,
            deadline: task.deadline,
            startDate: task.startDate,
            ...newData
        }
        await toDoListsAPI.updateTask(tdlID, taskID, currentTaskValues)
        dispatch(changeTaskAC(tdlID, taskID, currentTaskValues))
    }
