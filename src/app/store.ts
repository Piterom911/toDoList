import {applyMiddleware, combineReducers, createStore} from "redux";
import {ToDoListActionsType, toDoListReducer} from "../features/ToDoListsAll/todolists-reducer";
import {TasksActionsType, tasksReducer} from "../features/ToDoListsAll/tasks-reducer";
import thunk, {ThunkAction} from "redux-thunk";
import {AppActionsType, appReducer} from "./appReducer";
import {AuthActionsType, authReducer} from "../features/Login/auth-reducer";

const rootReducer = combineReducers({
    toDoLists: toDoListReducer,
    tasks: tasksReducer,
    app: appReducer,
    login: authReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppRootActionType = ToDoListActionsType | TasksActionsType
    | AppActionsType | AuthActionsType
export type ThunkType = ThunkAction<void, AppRootStateType, unknown, AppRootActionType>

// @ts-ignore
window.store = store;
