import React from 'react';
import {Meta, Story} from '@storybook/react';
import AppWithRedux from "./app/App";
import {ReduxStoreProviderDecorator} from "./stories/decorators/ReduxStoreProviderDecorator";


export default {
    title: 'AppWithUseState Components/AppWithUseState Main',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as Meta;

const AppDefault: Story = (args) => <AppWithRedux {...args} />;

export const App = AppDefault.bind({});
// TaskIsNotDone.args = {
//     ...baseArgs,
//     task: {id: '1', title: 'JavaScript', isDone: false,},
//     tdlID: 'ToDoList ID'
// }