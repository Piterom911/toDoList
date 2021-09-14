import {Provider} from "react-redux";
import React from "react";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../tasks-reducer";
import {toDoListReducer} from "../todolists-reducer";
import {v1} from "uuid";
import {AppRootStateType} from "../store";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    toDoLists: toDoListReducer
})

const initialGlobalState: AppRootStateType = {
    toDoLists: [
        {id: "todolistId1", title: "What to learn", status: "all"},
        {id: "todolistId2", title: "What to buy", status: "all"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (Component: React.FC) => {
    return <Provider store={storyBookStore}>{<Component/>}</Provider>
}
export const MaxWidthDecorator = (Story: React.FC) => <div style={{margin: '20px', maxWidth: '300px'}}>{<Story/>}</div>