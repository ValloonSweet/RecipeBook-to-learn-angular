import { Action } from "@ngrx/store";

export const LOGIN_START = '[Auth] Login Start';
export const LOGIN = '[Auth] Login';
export const LOGIN_FAIL = '[Auth] Login Fail';
export const SIGNUP_START = '[Auth] Signup Start';
export const SIGNUP_FAIL = '[Auth] Signup Fail';
export const LOGOUT = '[Auth] Logout';

export class Login implements Action {
    readonly type = LOGIN;
    constructor(public payload: {
        email: string;
        userId: string;
        token: string;
        expirationDate: Date
    }) {}
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class LoginStart implements Action {
    readonly type = LOGIN_START;
    constructor(public payload: {email: string; password: string}) {}
}

export class LoginFail implements Action {
    readonly type = LOGIN_FAIL;
    constructor(public payload: string) {}
}

export class SignupStart implements Action {
    readonly type = SIGNUP_START;
    constructor(public payload: {email: string; password: string}) {}
}

export class SignupFail implements Action {
    readonly type = SIGNUP_FAIL;
    constructor(public payload: string) {}
}

export type AuthActions =
    Login |
    LoginStart |
    LoginFail |
    Logout |
    SignupStart |
    SignupFail
    ;
