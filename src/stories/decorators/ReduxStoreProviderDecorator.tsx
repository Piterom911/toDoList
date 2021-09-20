import {Provider} from "react-redux";
import React from "react";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../../state/tasks-reducer";
import {toDoListReducer} from "../../state/todolists-reducer";
import {v1} from "uuid";
import {AppRootStateType} from "../../state/store";
import {TaskStatuses} from "../../api/todolists-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    toDoLists: toDoListReducer
})

const initialGlobalState: AppRootStateType = {
    toDoLists: [
        {id: "todolistId1", title: "What to learn", status: "all", order: 0, addedDate: ''},
        {id: "todolistId2", title: "What to buy", status: "all", order: 0, addedDate: ''}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: 'hello', addedDate: '', deadline: '', description: 'Hello 3', order: 0, startDate: '', priority: 1},
            {id: v1(), title: "JS", status: TaskStatuses.New, todoListId: 'hello', addedDate: '', deadline: '', description: 'Hello 3', order: 0, startDate: '', priority: 1}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", status: TaskStatuses.New, todoListId: 'hello', addedDate: '', deadline: '', description: 'Hello 3', order: 0, startDate: '', priority: 1},
            {id: v1(), title: "React Book", status: TaskStatuses.Completed, todoListId: 'hello', addedDate: '', deadline: '', description: 'Hello 3', order: 0, startDate: '', priority: 1}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (Component: React.FC) => {
    return <Provider store={storyBookStore}>{<Component/>}</Provider>
}
export const MaxWidthDecorator = (Story: React.FC) => <div style={{margin: '20px', maxWidth: '300px'}}>{<Story/>}</div>