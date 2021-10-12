import {setInitialized, setRequestStatus} from "../../app/appReducer";
import {ThunkType} from "../../app/store";
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginParamsType): ThunkType => async dispatch => {
    dispatch(setRequestStatus('loading'))
    try {
        const response = await authAPI.login(data)
        if (response.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
        } else {
            handleServerAppError(response.data, dispatch)
        }
    } catch (error) {
        handleServerNetworkError({message: error.message}, dispatch)
    } finally {
        dispatch(setRequestStatus('succeeded'))
    }
}
export const initializeAppTC = (): ThunkType => async dispatch => {
    dispatch(setRequestStatus('loading'))
    try {
       const response = await authAPI.me()
       if (response.data.resultCode === 0) {
           dispatch(setIsLoggedInAC(true));
       } else {
           handleServerAppError(response.data, dispatch)
       }
   } catch (error) {
       handleServerNetworkError({message: error.message}, dispatch)
   } finally {
       dispatch(setRequestStatus('succeeded'))
        dispatch(setInitialized(true))
   }
}
export const logoutTC = (): ThunkType => async dispatch => {
    dispatch(setRequestStatus('loading'))
        try {
            const response = await authAPI.logout()
            if (response.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setRequestStatus('succeeded'))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        } catch(error) {
            handleServerNetworkError(error, dispatch)
        }  finally {
            dispatch(setRequestStatus('succeeded'))
        }
}



// types
export type AuthActionsType = ReturnType<typeof setIsLoggedInAC>