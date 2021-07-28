import React, {ChangeEvent, KeyboardEvent, FocusEvent, useState} from "react";

export type EditableSpanPropsType = {
    isDone: boolean
    title: string
    changeItemValue: (value: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    const [edit, setEdit] = useState<boolean>(false)
    const [value, setValue] = useState<string>('')

    const onSetEditHandler = () => {
        setEdit(true)
        setValue(props.title)
    }

    const onFocusBlur = (event: FocusEvent<HTMLInputElement>) => {
        props.changeItemValue(event.currentTarget.value)
        setEdit(false)
    }

    const onChangeValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value)
    }

    const onEnterKeyHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') {
            props.changeItemValue(value)
            setEdit(false)
        }
    }

    return edit
        ? <input onKeyPress={onEnterKeyHandler}
                 onChange={onChangeValueHandler}
                 onBlur={onFocusBlur} value={value}
                 autoFocus
                 type="text"/>
        : <span onDoubleClick={onSetEditHandler}
                className={props.isDone
                    ? 'doneTask'
                    : ''}>{props.title} </span>
}