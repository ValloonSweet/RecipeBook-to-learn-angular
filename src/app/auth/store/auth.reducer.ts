import { User } from "../user.model";
import * as AuthActions from "./auth.actions";

export interface State {
    user: User;
    authError: string;
    loading: boolean;
}

const initialState: State = {
    user: null,
    authError: null,
    loading: false,
}

export function authReducer(
    state = initialState,
    action: AuthActions.AuthActions) {

    switch(action.type) {
        case AuthActions.AUTHENTICATE_SUCCESS:
            const user = new User(
                action.payload.email,
                action.payload.userId,
                action.payload.token,
                action.payload.expirationDate
            )
            return {
                ...state,
                user,
                authError: null,
                loading: false
            };
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null,
                loading: false
            }
        case AuthActions.LOGIN_START:
            return {
                ...state,
                authError: null,
                loading: true
            }
        case AuthActions.AUTHENTICATE_FAIL:
            return {
                ...state,
                user: null,
                authError: action.payload,
                loading: false
            }
        case AuthActions.SIGNUP_START:
            return {
                ...state,
                user: null,
                authError: null,
                loading: true
            }
        case AuthActions.SIGNUP_FAIL:
            return {
                ...state,
                user: null,
                authError: action.payload,
                loading: false
            }
        case AuthActions.CLEAR_ERROR:
            return {
                ...state,
                authError: null
            }
        // possible to comment them?
        case AuthActions.AUTO_LOGIN:
            return {
                ...state
            }
        case AuthActions.AUTO_LOGOUT: {
            return {
                ...state
            }
        }
        default:
            return state;
    }
}
