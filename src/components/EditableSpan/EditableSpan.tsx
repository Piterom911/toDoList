import React, {ChangeEvent, FocusEvent, KeyboardEvent, useCallback, useState} from "react";
import {TextField} from "@material-ui/core";
import {TaskStatuses} from "../../api/todolists-api";

export type EditableSpanPropsType = {
    status: TaskStatuses
    title: string
    changeItemValue: (value: string) => void
}

export const EditableSpan = React.memo(function(props: EditableSpanPropsType) {
    const [edit, setEdit] = useState<boolean>(false)
    const [value, setValue] = useState<string>('')

    const onSetEditHandler = useCallback(() => {
        setEdit(true)
        setValue(props.title)
    }, [setEdit, setValue, props])

    const onFocusBlur = useCallback((event: FocusEvent<HTMLInputElement>) => {
        props.changeItemValue(event.currentTarget.value)
        setEdit(false)
    }, [props, setEdit])

    const onChangeValueHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value)
    }, [setValue])

    const onEnterKeyHandler = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') {
            props.changeItemValue(value)
            setEdit(false)
        }
    }, [props, setEdit, value])

    return edit
        ? <TextField onKeyPress={onEnterKeyHandler}
                     onChange={onChangeValueHandler}
                     onBlur={onFocusBlur} value={value}
                     autoFocus
                     type="text"/>
        : <span onDoubleClick={onSetEditHandler}
                className={props.status === TaskStatuses.Completed
                    ? 'doneTask'
                    : 'inProcess'}>{props.title} </span>
})