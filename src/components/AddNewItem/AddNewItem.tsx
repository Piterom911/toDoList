import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddNewItemPropsType = {
    addNewItem: (title: string) => void
}

export function AddNewItem(props: AddNewItemPropsType) {
    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState('')

    const onAddNewTaskHandler = () => {
        if (inputValue.trim() !== '') {
            props.addNewItem(inputValue)
        } else {
            setError('This field is required!')
        }
        setInputValue('')
    }

    const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
        setError('')
    }
    const onInputKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') onAddNewTaskHandler()
    }

    return (
        <div className="listInputAria">
            <TextField variant="outlined" size="small"
                       label="New item name"
                       title="Here you can add a new item to the list"
                       helperText={error} error={!!error}
                       onKeyPress={onInputKeyPressHandler}
                       onChange={onInputChangeHandler}
                       value={inputValue}/>
            <IconButton color="primary" onClick={onAddNewTaskHandler}>
                <AddBox />
            </IconButton>
        </div>
    )
}