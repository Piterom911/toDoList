import React from 'react';
import {Meta, Story} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "./Task";
import {MaxWidthDecorator} from "../../../../stories/decorators/ReduxStoreProviderDecorator";
import {TaskStatuses} from "../../../../api/todolists-api";


export default {
    title: 'AppWithUseState Components/Task',
    component: Task,
    decorators: [ MaxWidthDecorator ],
} as Meta;

const changeTaskStatusCallback = action('Change Task Status')
const changeTaskTitleCallback = action('Change Task Title')
const removeTaskCallback = action('Remove Task')

const TaskDefault: Story<TaskPropsType> = (args) => <Task {...args} />;

const baseArgs = {
    changeStatus: changeTaskStatusCallback,
    changeItemValue: changeTaskTitleCallback,
    removeTask: removeTaskCallback,
}

export const TaskIsNotDone = TaskDefault.bind({});
TaskIsNotDone.args = {
    ...baseArgs,
    task: {id: '1', entityStatus: 'idle', title: 'JavaScript', status: TaskStatuses.New, todoListId: 'hello', addedDate: '', deadline: '', description: 'Hello 3', order: 0, startDate: '', priority: 1},
    tdlID: 'ToDoList ID'
}

export const TaskIsDone = TaskDefault.bind({});
TaskIsDone.args = {
    ...baseArgs,
    task: {id: '1', entityStatus: 'idle', title: 'React', status: TaskStatuses.New, todoListId: 'hello', addedDate: '', deadline: '', description: 'Hello 3', order: 0, startDate: '', priority: 1},
    tdlID: 'ToDoList ID2'
}