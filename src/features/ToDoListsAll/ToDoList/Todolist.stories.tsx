import React from 'react';
import {Meta, Story} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Todolist, ToDoListPropsType} from "./Todolist";
import {v1} from "uuid";
import {MaxWidthDecorator} from "../../../stories/decorators/ReduxStoreProviderDecorator";
import {TaskStatuses} from "../../../api/todolists-api";


export default {
    title: 'AppWithUseState Components/To Do List',
    component: Todolist,
    decorators: [MaxWidthDecorator]
} as Meta;

const ToDoListDefault: Story<ToDoListPropsType> = (args) => <Todolist {...args} />;

const baseArgs = {
    removeTask: action('Task is removed'),
    onChangeListName: action('List name is changed'),
    filterTasks: action('To Do List filter is changed'),
    addNewTask: action('New task is added'),
    changeStatus: action('Task status is changed'),
    changeItemValue: action('Task name is changed'),
    removeToDoList: action('To do list is removed'),
    tasks: [
        {id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, todoListId: 'hello', addedDate: '', deadline: '', description: 'Hello 3', order: 0, startDate: '', priority: 1},
        {id: v1(), title: 'JS', status: TaskStatuses.New, todoListId: 'hello', addedDate: '', deadline: '', description: 'Hello 3', order: 0, startDate: '', priority: 1},
        {id: v1(), title: 'Milk', status: TaskStatuses.New, todoListId: 'hello', addedDate: '', deadline: '', description: 'Hello 3', order: 0, startDate: '', priority: 1},
        {id: v1(), title: 'React Book', status: TaskStatuses.Completed, todoListId: 'hello', addedDate: '', deadline: '', description: 'Hello 3', order: 0, startDate: '', priority: 1},
        ]
}

// export const ToDoListAll = ToDoListDefault.bind({});
// ToDoListAll.args = {
//     ...baseArgs,
//     entityStatus: 'idle',
//     id: '2354e',
//     filterStatus: 'all',
//     heading: 'To Do List All',
// }
//
// export const ToDoListActive = ToDoListDefault.bind({});
// ToDoListActive.args = {
//     ...baseArgs,
//     id: '2354e',
//     filterStatus: 'active',
//     heading: 'To Do List Active',
//     entityStatus: 'succeeded',
// }
//
// export const ToDoListCompleted = ToDoListDefault.bind({});
// ToDoListCompleted.args = {
//     ...baseArgs,
//     id: '2354e',
//     filterStatus: 'completed',
//     heading: 'To Do List Completed',
//     entityStatus: 'failed',
// }

// const Template: Story<ToDoListPropsType> = (args) => <Todolist {...args} />;
//
// export const AddNewItemExample = Template.bind({});
// AddNewItemExample.args = {
//     changeItemValue: action('Item Value is Changed.'),
//     changeStatus: action('Status is Changed.'),
//     addNewTask: action('New Task is Added.'),
//     filterTasks: action('New Task is Added.'),
//     removeTask: action('New Task is Added.'),
//     onChangeListName: action('New Task is Added.'),
// }