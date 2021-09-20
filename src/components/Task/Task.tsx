import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../api/todolists-api";


export type TaskPropsType = {
    removeTask: (toDoListID: string, id: string) => void
    changeStatus: (toDoListID: string, id: string, status: TaskStatuses) => void
    changeItemValue: (listID: string, itemID: string, value: string) => void
    tdlID: string
    task: TaskType
}

export const Task = (props: TaskPropsType) => {
    const onChangeItemHandler = useCallback((value: string) => {
        props.changeItemValue(props.tdlID, props.task.id, value)
    }, [props.tdlID, props.task.id])
    const onRemoveTaskHandler = useCallback(() => {
        props.removeTask(props.tdlID, props.task.id)
    }, [props.removeTask, props.tdlID, props.task.id])

    const changeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        console.log(props.task.status, e.currentTarget.checked)
        props.changeStatus(props.tdlID, props.task.id, e.currentTarget.checked
            ? TaskStatuses.Completed
            : TaskStatuses.New)
    }, [props.changeStatus, props.tdlID, props.task.id])

    return (
        <li className="listItem" key={props.task.id}>
            <Checkbox className="itemCheckBox" color="primary" onChange={changeStatusHandler}
                      checked={props.task.status === TaskStatuses.Completed}/>
            <EditableSpan changeItemValue={onChangeItemHandler} status={props.task.status} title={props.task.title}/>
            <IconButton className={"iconTrash"} onClick={onRemoveTaskHandler}>
                <Delete/>
            </IconButton>
        </li>
    )
}