import React, {ChangeEvent, KeyboardEvent, FocusEvent, useState, useCallback} from "react";
import {TextField} from "@material-ui/core";

export type EditableSpanPropsType = {
    isDone: boolean
    title: string
    changeItemValue: (value: string) => void
}

export const EditableSpan = React.memo(function(props: EditableSpanPropsType) {
    console.log('Editable Span')
    const [edit, setEdit] = useState<boolean>(false)
    const [value, setValue] = useState<string>('')

    const onSetEditHandler = useCallback(() => {
        setEdit(true)
        setValue(props.title)
    }, [setEdit, setValue, props.title])

    const onFocusBlur = useCallback((event: FocusEvent<HTMLInputElement>) => {
        props.changeItemValue(event.currentTarget.value)
        setEdit(false)
    }, [props.changeItemValue, setEdit])

    const onChangeValueHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value)
    }, [setValue])

    const onEnterKeyHandler = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') {
            props.changeItemValue(value)
            setEdit(false)
        }
    }, [props.changeItemValue, setEdit, value])

    return edit
        ? <TextField onKeyPress={onEnterKeyHandler}
                     onChange={onChangeValueHandler}
                     onBlur={onFocusBlur} value={value}
                     autoFocus
                     type="text"/>
        : <span onDoubleClick={onSetEditHandler}
                className={props.isDone
                    ? 'doneTask'
                    : 'inProcess'}>{props.title} </span>
})