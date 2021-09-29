import {applyMiddleware, combineReducers, createStore} from "redux";
import {ToDoListActionType, toDoListReducer} from "./todolists-reducer";
import {TasksActionType, tasksReducer} from "./tasks-reducer";
import thunk, {ThunkAction} from "redux-thunk";

const rootReducer = combineReducers({
    toDoLists: toDoListReducer,
    tasks: tasksReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type RootActionType = ToDoListActionType | TasksActionType
export type ThunkType = ThunkAction<void, AppRootStateType, unknown, RootActionType>

// @ts-ignore
window.store = store;
