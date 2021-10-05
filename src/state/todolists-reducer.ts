import {toDoListsAPI, ToDoListType} from "../api/todolists-api";
import {ThunkType} from "../app/store";
import {RequestStatusType, setError, setRequestStatus} from "./appReducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export type ToDoListDomainType = {
    entityStatus: RequestStatusType
    status: FilterType
}
export type ToDoListWithDomainType = ToDoListType & ToDoListDomainType
const initialState: Array<ToDoListWithDomainType> = []

export const toDoListReducer = (state: Array<ToDoListWithDomainType> = initialState,
                                action: ToDoListActionsType): Array<ToDoListWithDomainType> => {
    switch (action.type) {
        case "SET-ENTITY-STATUS":
            return state.map(tdl => tdl.id === action.tdlID ? {...tdl, entityStatus: action.status} : tdl)
        case "SET-TO-DO-LISTS":
            return action.tdls.map(tdl => ({...tdl, status: 'all', entityStatus: 'idle'}))
        case 'REMOVE-TODOLIST':
            return state.filter(tdl => tdl.id !== action.tdlID)
        case 'ADD-TODOLIST':
            return [ {...action.payload, status: 'all', entityStatus: 'idle'}, ...state ]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tdl => tdl.id === action.id ? {...tdl, title: action.title} : tdl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tdl => tdl.id === action.id ? {...tdl, status: action.status} : tdl)
        default:
            return state
    }
}

//actions
export const setEntityStatus = (tdlID: string, status: RequestStatusType) => (
    { type: "SET-ENTITY-STATUS", status, tdlID } as const)
export const setTDLsAC = (tdls: Array<ToDoListType>) => ({type: "SET-TO-DO-LISTS", tdls} as const)
export const removeToDoListAC = (tdlID: string) => ({type: 'REMOVE-TODOLIST', tdlID} as const)
export const addToDoListAC = (payload: ToDoListType) => ({type: 'ADD-TODOLIST', payload,} as const)
export const changeToDoListFilterAC = (id: string, status: FilterType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, status} as const
}
export const changeToDoListTitleAC = (id: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title} as const
}

//types
export type ToDoListActionsType = SetTDLsACType | RemoveToDoListACType
    | AddToDoListACType | ChangeToDoListFilterACType | ChangeToDoListTitleACType
    | SetEntityStatusType

export type FilterType = 'all' | 'active' | 'completed'
export type SetEntityStatusType = ReturnType<typeof setEntityStatus>
export type SetTDLsACType = ReturnType<typeof setTDLsAC>
export type RemoveToDoListACType = ReturnType<typeof removeToDoListAC>
export type AddToDoListACType = ReturnType<typeof addToDoListAC>
export type ChangeToDoListFilterACType = ReturnType<typeof changeToDoListFilterAC>
export type ChangeToDoListTitleACType = ReturnType<typeof changeToDoListTitleAC>


//thunks
export const setToDoListsTC = (): ThunkType => async dispatch => {
    dispatch(setRequestStatus('loading'))
    const response = await toDoListsAPI.getToDoLists()
    dispatch(setTDLsAC(response.data))
    dispatch(setRequestStatus('succeeded'))
}
export const createToDoList = (title: string): ThunkType => async dispatch => {
    dispatch(setRequestStatus('loading'))
    try {
        const response = await toDoListsAPI.createToDoList(title)
        if (response.data.resultCode !== 0) {
            handleServerAppError(response.data, dispatch)
        } else {
            dispatch(addToDoListAC(response.data.data.item))
            dispatch(setRequestStatus('succeeded'))
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}


export const deleteToDoList = (id: string): ThunkType => async dispatch => {
    dispatch(setRequestStatus('loading'))
    dispatch(setEntityStatus(id, 'loading'))
    try {
        const response = await toDoListsAPI.deleteToDoList(id)
        if (response.data.resultCode !== 0) {
            handleServerAppError(response.data, dispatch)
        } else {
            dispatch(removeToDoListAC(id))
            dispatch(setRequestStatus('succeeded'))
            dispatch(setEntityStatus(id, 'succeeded'))
        }
    } catch (error) {
        dispatch(setError(error.message ?? 'Some Error occurred!'))
        dispatch(setRequestStatus('failed'))
        dispatch(setEntityStatus(id, 'failed'))
    }
}
export const updateToDoList = (id: string, title: string): ThunkType => async dispatch => {
    dispatch(setRequestStatus('loading'))
    dispatch(setEntityStatus(id, 'loading'))
    try {
        const response = await toDoListsAPI.updateToDoList(id, title)
        if (response.data.resultCode !== 0) {
            handleServerAppError(response.data, dispatch)
        } else {
            dispatch(changeToDoListTitleAC(id, title))
            dispatch(setEntityStatus(id, 'succeeded'))
            dispatch(setRequestStatus('succeeded'))
        }
    } catch (error) {
        dispatch(setError(error.message ?? 'Some Error occurred!'))
        dispatch(setRequestStatus('failed'))
        dispatch(setEntityStatus(id, 'failed'))
    }
}