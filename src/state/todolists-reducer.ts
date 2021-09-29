import {v1} from "uuid";
import {toDoListsAPI, ToDoListType} from "../api/todolists-api";
import {ThunkType} from "./store";

const initialState: Array<ToDoListType & { status: FilterType }> = []

export const toDoListReducer = (state: Array<ToDoListWithStatusType> = initialState,
                                action: ToDoListActionType): Array<ToDoListWithStatusType> => {
    switch (action.type) {
        case "SET-TO-DO-LISTS":
            return action.tdls.map(tdl => ({...tdl, status: 'all'}))
        case 'REMOVE-TODOLIST':
            return state.filter(tdl => tdl.id !== action.tdlID)
        case 'ADD-TODOLIST':
            return [{title: action.title, id: action.tdlID, status: 'all', order: 0, addedDate: ''}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tdl => tdl.id === action.id ? {...tdl, title: action.title} : tdl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tdl => tdl.id === action.id ? {...tdl, status: action.status} : tdl)
        default:
            return state
    }
}

//actions
export const setTDLsAC = (tdls: Array<ToDoListType>) => ({type: "SET-TO-DO-LISTS", tdls} as const)
export const removeToDoListAC = (tdlID: string) => ({type: 'REMOVE-TODOLIST', tdlID} as const)
export const addToDoListAC = (title: string) => ({type: 'ADD-TODOLIST', title, tdlID: v1(),} as const)
export const changeToDoListFilterAC = (id: string, status: FilterType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, status} as const
}
export const changeToDoListTitleAC = (id: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title} as const
}

//types
export type ToDoListActionType = SetTDLsACType | RemoveToDoListACType
    | AddToDoListACType | ChangeToDoListFilterACType | ChangeToDoListTitleACType

export type FilterType = 'all' | 'active' | 'completed'
export type ToDoListWithStatusType = ToDoListType & { status: FilterType }
export type SetTDLsACType = ReturnType<typeof setTDLsAC>
export type RemoveToDoListACType = ReturnType<typeof removeToDoListAC>
export type AddToDoListACType = ReturnType<typeof addToDoListAC>
export type ChangeToDoListFilterACType = ReturnType<typeof changeToDoListFilterAC>
export type ChangeToDoListTitleACType = ReturnType<typeof changeToDoListTitleAC>


//thunks
export const setToDoListsTC = (): ThunkType => async dispatch => {
    const response = await toDoListsAPI.getToDoLists()
    dispatch(setTDLsAC(response.data))
}
export const createToDoList = (title: string): ThunkType => async dispatch => {
    await toDoListsAPI.createToDoList(title)
    dispatch(addToDoListAC(title))
}
export const deleteToDoList = (id: string): ThunkType => async dispatch => {
    await toDoListsAPI.deleteToDoList(id)
    dispatch(removeToDoListAC(id))
}
export const updateToDoList = (id: string, title: string): ThunkType => async dispatch => {
    await toDoListsAPI.updateToDoList(id, title)
    dispatch(changeToDoListTitleAC(id, title))
}