import {ResponseType} from "../api/todolists-api";
import {setError, SetErrorActionType, setRequestStatus, SetRequestStatusActionType} from "../state/appReducer";
import {Dispatch} from "redux";


export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setError(data.messages[0] ?? 'Some Error occurred!'))
    dispatch(setRequestStatus('failed'))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setError(error.message ?? 'Some Error occurred!'))
    dispatch(setRequestStatus('failed'))
}

type ErrorUtilsDispatchType = Dispatch<SetErrorActionType | SetRequestStatusActionType>

export const a = 0