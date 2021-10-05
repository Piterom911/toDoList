export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppReducerInitialStateType = {
    errorText: null | string
    requestStatus: RequestStatusType
}

export const appReducerInitialState: AppReducerInitialStateType = {
    errorText: null,
    requestStatus: 'idle'
}

export const appReducer = (state: AppReducerInitialStateType = appReducerInitialState, action: AppActionsType)
    : AppReducerInitialStateType => {
    switch (action.type) {
        case "SET-REQUEST-STATUS":
            return { ...state, requestStatus: action.status }
        case "SET-APP-ERROR":
            return { ...state, errorText: action.errorText }
        default:
            return state
    }
}

export type AppActionsType = SetRequestStatusActionType
    | SetErrorActionType

export type SetRequestStatusActionType = ReturnType<typeof setRequestStatus>
export type SetErrorActionType = ReturnType<typeof setError>

export const setRequestStatus = (status: RequestStatusType) => ({type: 'SET-REQUEST-STATUS', status} as const)
export const setError = (errorText: null | string) => ({type: 'SET-APP-ERROR', errorText} as const)