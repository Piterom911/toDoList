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
export type ResponseType<D = {}> = {
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
export type UpdateDataType = {
    title?: string
    status?: TaskStatuses
}

export const toDoListsAPI = {
    getToDoLists() {
        return instance.get<ToDoListType[]>('todo-lists')
    },
    createToDoList(title: string) {
        return instance.post<ResponseType<{ item: ToDoListType }>>(`todo-lists`, {title})
    },
    deleteToDoList(tdlID: string) {
        return instance.delete<ResponseType>(`todo-lists/${tdlID}`)
    },
    updateToDoList(tdlID: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${tdlID}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<AllTasksType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, newTaskData: UpdateTaskType) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, newTaskData)
    },
    deleteTasks(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
}