import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {taskPropsType} from "../ToDoList/Todolist";


export type TaskPropsType = {
    removeTask: (toDoListID: string, id: string) => void
    changeStatus: (toDoListID: string, id: string, isDone: boolean) => void
    changeItemValue: (listID: string, itemID: string, value: string) => void
    tdlID: string
    task: taskPropsType
}

export const Task = (props: TaskPropsType) => {
    const onChangeItemHandler = useCallback((value: string) => {
        props.changeItemValue(props.tdlID, props.task.id, value)
    }, [props.tdlID, props.task.id])
    const onRemoveTaskHandler = useCallback(() => {
        props.removeTask(props.tdlID, props.task.id)
    }, [props.removeTask, props.tdlID, props.task.id])

    const changeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(props.tdlID, props.task.id, e.currentTarget.checked)
    }, [props.changeStatus, props.tdlID, props.task.id])


    return (
        <li className="listItem" key={props.task.id}>
            <Checkbox className="itemCheckBox" color="primary" onChange={changeStatusHandler} checked={props.task.isDone}/>
            <EditableSpan changeItemValue={onChangeItemHandler} isDone={props.task.isDone} title={props.task.title} />
            <IconButton className={"iconTrash"} onClick={ onRemoveTaskHandler }>
                <Delete />
            </IconButton>
        </li>
    )
}