import React from 'react';
import {Meta, Story} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {EditableSpan, EditableSpanPropsType} from "./EditableSpan";
import {MaxWidthDecorator} from "../../stories/decorators/ReduxStoreProviderDecorator";


export default {
    title: 'App Components/Editable Span',
    component: EditableSpan,
    decorators: [ MaxWidthDecorator ],
} as Meta;

const TaskDefault: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args} />;

export const EditableSpanExample = TaskDefault.bind({});
EditableSpanExample.args = {
    changeItemValue: action('The new Item Value is'),
    isDone: false,
    title: 'Click me Twice',
}

export const EditableSpanIsDoneExample = TaskDefault.bind({});
EditableSpanIsDoneExample.args = {
    changeItemValue: action('The new Item Value is'),
    isDone: true,
    title: 'Click me Twice',
}