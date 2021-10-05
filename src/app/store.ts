import {applyMiddleware, combineReducers, createStore} from "redux";
import {ToDoListActionsType, toDoListReducer} from "../state/todolists-reducer";
import {TasksActionsType, tasksReducer} from "../state/tasks-reducer";
import thunk, {ThunkAction} from "redux-thunk";
import {AppActionsType, appReducer} from "../state/appReducer";

const rootReducer = combineReducers({
    toDoLists: toDoListReducer,
    tasks: tasksReducer,
    app: appReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppRootActionType = ToDoListActionsType | TasksActionsType | AppActionsType
export type ThunkType = ThunkAction<void, AppRootStateType, unknown, AppRootActionType>

// @ts-ignore
window.store = store;
