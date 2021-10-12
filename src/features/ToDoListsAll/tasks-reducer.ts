import {TaskType, toDoListsAPI, UpdateDataType, UpdateTaskType} from "../../api/todolists-api";
import {AddToDoListACType, SetTDLsACType} from "./todolists-reducer";
import {AppRootStateType, ThunkType} from "../../app/store";
import {RequestStatusType, setError, setRequestStatus} from "../../app/appReducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState: LocalTasksType = {}

export type LocalTasksType = {
    [key: string]: Array<TaskType & TaskWithLocalDataType>
}
export type TaskWithLocalDataType = {
    entityStatus: RequestStatusType
}

export const tasksReducer = (state: LocalTasksType = initialState, action: TasksActionsType): LocalTasksType => {
    switch (action.type) {
        case "SET-TO-DO-LISTS":
            const newState = {...state}
            action.tdls.forEach(t => newState[t.id] = [])
            return newState
        case "SET-TASKS":
            return {...state, [action.tdlID]: action.tasks.map(ts => ({...ts, entityStatus: 'idle'}))}
        case 'REMOVE-TASK':
            return {...state, [action.tdlID]: state[action.tdlID].filter(t => t.id !== action.id)}
        case "ADD-NEW-TASK":
            return {...state, [action.tdlID]: [{...action.taskData, entityStatus: 'idle'}, ...state[action.tdlID]]}
        case "CHANGE-TASK":
            return {
                ...state, [action.tdlID]: state[action.tdlID].map(task =>
                    (task.id === action.id ? {...task, ...action.newData} : task))
            }
        case "ADD-TODOLIST":
            return {...state, [action.payload.id]: []}
        case "REMOVE-TODOLIST": {
            const newState = {...state}
            delete newState[action.tdlID]
            return newState
        }
        case "SET-TASK-ENTITY-STATUS":
            return {
                ...state, [action.tdlID]: state[action.tdlID].map(task =>
                    (task.id === action.id ? {...task, entityStatus: action.status} : task))
            }
        default:
            return state
    }
}

export type TasksActionsType = SetTasksACType | RemoveTaskACType | RemoveTodolistACType
    | AddNewTaskACType | ChangeTaskACType
    | SetTDLsACType | AddToDoListACType
    | SetTaskEntityStatus

export type SetTasksACType = ReturnType<typeof setTasksAC>
export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type AddNewTaskACType = ReturnType<typeof addNewTaskAC>
export type ChangeTaskACType = ReturnType<typeof changeTaskAC>
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type SetTaskEntityStatus = ReturnType<typeof setTaskEntityStatus>

export const setTaskEntityStatus = (tdlID: string, id: string, status: RequestStatusType) => (
    { type: "SET-TASK-ENTITY-STATUS", status, tdlID, id } as const)
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

export const setTasks = (tdlID: string): ThunkType => async dispatch => {
    dispatch(setRequestStatus('loading'))
    try {
        const response = await toDoListsAPI.getTasks(tdlID)
        if (response.data.error) {
            dispatch(setRequestStatus('failed'))
            dispatch(setError('Some error occurred'))
        } else {
            dispatch(setTasksAC(tdlID, response.data.items))
            dispatch(setRequestStatus('succeeded'))
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}
export const createTask = (tdlID: string, title: string): ThunkType => async dispatch => {
    dispatch(setRequestStatus('loading'))
    try {
        const response = await toDoListsAPI.createTask(tdlID, title)
        if (response.data.resultCode !== 0) {
            handleServerAppError(response.data, dispatch)
        } else {
            dispatch(addNewTaskAC(tdlID, response.data.data.item))
            dispatch(setRequestStatus('succeeded'))
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}
export const deleteTask = (tdlID: string, taskID: string): ThunkType => async dispatch => {
    dispatch(setTaskEntityStatus(tdlID, taskID, 'loading'))
    dispatch(setRequestStatus('loading'))
    try {
        const response = await toDoListsAPI.deleteTasks(tdlID, taskID)
        if (response.data.resultCode !== 0) {
            handleServerAppError(response.data, dispatch)
            dispatch(setTaskEntityStatus(tdlID, taskID, 'failed'))
        } else {
            dispatch(removeTaskAC(tdlID, taskID))
            dispatch(setRequestStatus('succeeded'))
            dispatch(setTaskEntityStatus(tdlID, taskID, 'succeeded'))
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
        dispatch(setTaskEntityStatus(tdlID, taskID, 'failed'))
    }
}
export const changeTask = (tdlID: string, taskID: string, newData: UpdateDataType): ThunkType =>
    async (dispatch, getState: () => AppRootStateType) => {
        dispatch(setTaskEntityStatus(tdlID, taskID, 'loading'))
        dispatch(setRequestStatus('loading'))
        let task = getState().tasks[tdlID].find(t => t.id === taskID)
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
        try {
            const response = await toDoListsAPI.updateTask(tdlID, taskID, currentTaskValues)
            if (response.data.resultCode !== 0) {
                handleServerAppError(response.data, dispatch)
                dispatch(setTaskEntityStatus(tdlID, taskID, 'failed'))
            } else {
                dispatch(changeTaskAC(tdlID, taskID, currentTaskValues))
                dispatch(setRequestStatus('succeeded'))
                dispatch(setTaskEntityStatus(tdlID, taskID, 'succeeded'))
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch)
            dispatch(setTaskEntityStatus(tdlID, taskID, 'failed'))
        }
    }
