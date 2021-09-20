import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'api-key': '18e1d480-771d-4bcb-b6a1-86b6a255bc4b'
    }
})

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type ToDoListType = {
    "id": string
    "title": string
    "addedDate": string
    "order": number
}

type CommonRequestToDoListType<D = {}> = {
    resultCode: number
    messages: string[],
    data: D
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

type AllTasksType = {
    items: TaskType[]
    totalCount: number
    error: string
}

export const toDoListsAPI = {
    getToDoLists() {
        return instance.get<ToDoListType[]>('todo-lists')
    },
    createToDoList(title: string) {
        return instance.post<CommonRequestToDoListType<{ item: ToDoListType }>>(`todo-lists`, {title})
    },
    deleteToDoList(tdlID: string) {
        return instance.delete<CommonRequestToDoListType>(`todo-lists/${tdlID}`)
    },
    updateToDoList(tdlID: string, title: string) {
        return instance.put<CommonRequestToDoListType>(`todo-lists/${tdlID}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<AllTasksType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<CommonRequestToDoListType>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string) {
        return instance.put<CommonRequestToDoListType>(`todo-lists/${todolistId}/tasks/${taskId}`, {
            title: 'I AM UPDATED TASK!!!! YOU HOOOO!!!',
            description: 'This Is Some Description',
            priority: 2,
            status: 1,
            deadline: '2021-10-18T21:12:13.063',
            startDate: '2021-09-16T16:48:19.22',
        })
    },
    deleteTasks(todolistId: string, taskId: string) {
        return instance.delete<CommonRequestToDoListType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
}