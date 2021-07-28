import React, {ChangeEvent, KeyboardEvent, useState} from "react";

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
        <div>
            <input className={error !== '' ? 'input-required' : ''} onKeyPress={onInputKeyPressHandler}
                   onChange={onInputChangeHandler} value={inputValue}/>
            <button onClick={onAddNewTaskHandler}>+</button>
            {error && <p className="required-field">{error}</p>}
        </div>
    )
}