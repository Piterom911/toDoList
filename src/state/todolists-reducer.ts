import {FilterType, ToDoListsType} from "../App";
import {v1} from "uuid";

export enum ACTIONS_TYPE {
    REMOVE_TODOLIST = 'REMOVE-TODOLIST',
    ADD_TODOLIST = 'TODOLIST-TODOLIST',
    CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE',
    CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER',
}

type RemoveToDoListType = { type: 'REMOVE-TODOLIST'; id: string }
type AddToDoListType = { type: 'ADD-TODOLIST'; title: string }
type ChangeToDoListFilterType = { type: 'CHANGE-TODOLIST-FILTER'; id: string; status: FilterType }
type ChangeToDoListTitleType = { type: 'CHANGE-TODOLIST-TITLE'; id: string; title: string}

type ActionType = RemoveToDoListType
    | AddToDoListType
    | ChangeToDoListFilterType
    | ChangeToDoListTitleType

export const toDoListReducer = (state: ToDoListsType[], action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter( tdl => tdl.id !== action.id)
        case 'ADD-TODOLIST': {
            return [
                ...state,
                {title: action.title, id: v1(), status: 'all'}
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

export const removeToDoList = (id: string): RemoveToDoListType => ({type: 'REMOVE-TODOLIST', id})
export const addToDoList = (title: string): AddToDoListType => ({type: 'ADD-TODOLIST', title})
export const changeToDoListFilter = (id: string, status: FilterType): ChangeToDoListFilterType => (
    {type: 'CHANGE-TODOLIST-FILTER', id, status}
)
export const changeToDoListTitle = (id: string, title: string): ChangeToDoListTitleType => (
    {type: 'CHANGE-TODOLIST-TITLE', id, title}
)