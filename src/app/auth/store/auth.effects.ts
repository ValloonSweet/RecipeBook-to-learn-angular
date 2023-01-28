import { Actions, ofType, createEffect } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap, throwError } from "rxjs";

import * as AuthActions from './auth.actions';
import { AuthResponseData } from "../auth.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";


@Injectable()
export class AuthEffects {

    private handleAuthResponse = (resData: AuthResponseData) => {
        const expirationDate = new Date(
            new Date().getTime() + +resData.expiresIn * 1000
        )
        return new AuthActions.AuthenticateSuccess({
            email: resData.email,
            userId: resData.localId,
            token: resData.idToken,
            expirationDate
        })
    }

    authLogin$ = createEffect(() => this.action$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {2
            return this.http
                .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyChJt77hzApIO_BdFEcTbYN5Zes5GTDmcg', {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }).pipe(
                    map(resData => this.handleAuthResponse(resData)),
                    catchError(errorRes => {
                        let errorMessage = 'An unknown error occurred!';
                        if(!errorRes.error || !errorRes.error.error) {
                            return of(new AuthActions.AuthenticateFail(errorMessage))
                        }

                        switch(errorRes.error.error.message) {
                            case 'EMAIL_NOT_FOUND':
                                errorMessage = 'This email does not exist';
                                break;
                            case 'INVALID_PASSWORD':
                                errorMessage = 'Password is incorrect';
                                break;
                            case 'USER_DISABLED':
                                errorMessage = 'You has been disabled';
                                break;
                        }

                        return of(new AuthActions.AuthenticateFail(errorMessage));
                    })
                )
        })
    ))

    authSignup$ = createEffect(() => this.action$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((authData: AuthActions.SignupStart) => {
            return this.http
                .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyChJt77hzApIO_BdFEcTbYN5Zes5GTDmcg', {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }).pipe(
                    map(resData => this.handleAuthResponse(resData)),
                    catchError(errorRes => {
                        let errorMessage = 'An unknown error occurred!';
                        if(!errorRes.error || !errorRes.error.error) {
                            return throwError(() => new Error(errorMessage))
                        }

                        switch(errorRes.error.error.message) {
                            case 'EMAIL_EXISTS':
                                errorMessage = 'This email exists already';
                                break;
                        }

                        return of(new AuthActions.SignupFail(errorMessage));
                    })
                )
        })
    ))

    authRedirect$ = createEffect(() => this.action$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS, AuthActions.LOGOUT),
        tap(() => {
            this.router.navigate(['/'])
        })
    ), {dispatch: false})

    constructor(
        private action$: Actions,
        private http: HttpClient,
        private router: Router
    ) {}
}
