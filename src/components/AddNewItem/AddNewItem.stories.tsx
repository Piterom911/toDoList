import React from 'react';
import {Meta, Story} from '@storybook/react';
import {AddNewItem, AddNewItemPropsType} from "./AddNewItem";
import {action} from "@storybook/addon-actions";
import {MaxWidthDecorator} from "../../state/decorators/ReduxStoreProviderDecorator";


export default {
    title: 'App Components/Add Item Form',
    component: AddNewItem,
    decorators: [ MaxWidthDecorator ],
    argTypes: {
        onClick: {
            description: 'Hello World!'
        }
    },
} as Meta;

const Template: Story<AddNewItemPropsType> = (args) => <AddNewItem {...args} />;

export const AddNewItemExample = Template.bind({});
AddNewItemExample.args = {
    addNewItem: action('New Item is added. The value is')
}