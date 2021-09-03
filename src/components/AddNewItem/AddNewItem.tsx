import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddNewItemPropsType = {
    addNewItem: (title: string) => void
}

export const AddNewItem = React.memo(function(props: AddNewItemPropsType) {
    console.log('AddNewItem')
    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState('')

    const onAddNewTaskHandler = useCallback(() => {
        if (inputValue.trim() !== '') {
            props.addNewItem(inputValue)
        } else {
            setError('This field is required!')
        }
        setInputValue('')
    }, [inputValue, props.addNewItem])

    const onInputChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
        if (!!error) setError('')
    }, [error])
    const onInputKeyPressHandler = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') onAddNewTaskHandler()
    }, [onAddNewTaskHandler])

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
})