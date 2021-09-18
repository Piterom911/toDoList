import React, {useEffect, useState} from 'react'
import { toDoListsAPI } from '../api/todolists-api'

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        toDoListsAPI.getToDoLists()
            .then( response => setState(response.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        toDoListsAPI.createToDoList('Some New List')
            .then(response => setState(response.data.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        toDoListsAPI.deleteToDoList('80bcf99a-affa-481f-8638-6920763c8531')
            .then( res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        toDoListsAPI.updateToDoList('0f01b1df-32b0-4355-9f28-ca8295fa0b93', 'This is a new List Title!!!!!!!!')
            .then( res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        toDoListsAPI.getTasks('59e9c21d-5c86-482f-9564-98cdc7497d17')
            .then( response => setState(response.data.items))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        toDoListsAPI.createTask('59e9c21d-5c86-482f-9564-98cdc7497d17', 'Some New Task')
            .then(response => setState(response.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        toDoListsAPI.updateTask('59e9c21d-5c86-482f-9564-98cdc7497d17', 'feb59821-b2be-4933-b12e-77fa6fdf5013')
            .then( res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask= () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        toDoListsAPI.deleteTasks('59e9c21d-5c86-482f-9564-98cdc7497d17', '40c31870-41dd-4891-ba67-9d355135f91f')
            .then( res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
