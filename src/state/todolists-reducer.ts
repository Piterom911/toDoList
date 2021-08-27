import {FilterType, ToDoListsType} from "../App";
import {v1} from "uuid";

export type RemoveToDoListType = { type: 'REMOVE-TODOLIST'; tdlID: string; }
export type AddToDoListType = { type: 'ADD-TODOLIST'; tdlID: string; title: string;  }
export type ChangeToDoListFilterType = { type: 'CHANGE-TODOLIST-FILTER'; id: string; status: FilterType }
export type ChangeToDoListTitleType = { type: 'CHANGE-TODOLIST-TITLE'; id: string; title: string; }

export type ActionType = RemoveToDoListType
    | AddToDoListType
    | ChangeToDoListFilterType
    | ChangeToDoListTitleType

export const toDoListReducer = (state: ToDoListsType[], action: ActionType): ToDoListsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter( tdl => tdl.id !== action.tdlID)
        case 'ADD-TODOLIST': {
            return [
                ...state,
                {title: action.title, id: action.tdlID, status: 'all'}
            ]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map( tdl => {
                return tdl.id === action.id
                    ? {...tdl, title: action.title}
                    : tdl
            })
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map( tdl => {
                return tdl.id === action.id
                    ? {...tdl, status: action.status}
                    : tdl
            })
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeToDoList = (tdlID: string): RemoveToDoListType => ({type: 'REMOVE-TODOLIST', tdlID})
export const addToDoList = (title: string): AddToDoListType => ({type: 'ADD-TODOLIST', title, tdlID: v1(),})
export const changeToDoListFilter = (id: string, status: FilterType): ChangeToDoListFilterType => (
    {type: 'CHANGE-TODOLIST-FILTER', id, status}
)
export const changeToDoListTitle = (id: string, title: string): ChangeToDoListTitleType => (
    {type: 'CHANGE-TODOLIST-TITLE', id, title}
)