import { Actions, ofType, createEffect } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap, throwError } from "rxjs";

import * as AuthActions from './auth.actions';
import { AuthResponseData, AuthService } from "../auth.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../user.model";


@Injectable()
export class AuthEffects {

    constructor(
        private action$: Actions,
        private http: HttpClient,
        private router: Router,
        private authService: AuthService
    ) {}

    private handleAuthResponse = (resData: AuthResponseData) => {
        const expirationDate = new Date(
            new Date().getTime() + +resData.expiresIn * 1000
        )
        const user = new User(
            resData.email, resData.localId, resData.idToken, expirationDate
        )
        localStorage.setItem('userData', JSON.stringify(user));

        return new AuthActions.AuthenticateSuccess({
            email: resData.email,
            userId: resData.localId,
            token: resData.idToken,
            expirationDate,
            isRedirect: true
        })
    }

    authLogin$ = createEffect(() => this.action$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http
                .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyChJt77hzApIO_BdFEcTbYN5Zes5GTDmcg', {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }).pipe(
                    tap(resData => this.authService.setLogoutTimer(+resData.expiresIn * 1000)),
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
                    tap(resData => this.authService.setLogoutTimer(+resData.expiresIn * 1000)),
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
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap((action: AuthActions.AuthenticateSuccess) => {
            if(action.payload.isRedirect) {
                this.router.navigate(['/']);
            }
        })
    ), {dispatch: false})

    autoLogin$ = createEffect(() => this.action$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(() => {
            const userData: {
                email: string;
                id: string;
                _token: string;
                _tokenExpirationDate: string
            } = JSON.parse(localStorage.getItem('userData'));
            if(!userData) return {
                type: 'Dummy'
            };

            const loadedUser = new User(
                userData.email,
                userData.id,
                userData._token,
                new Date(userData._tokenExpirationDate)
            );

            if(loadedUser.token) {
                const expirationDuration =
                    new Date(userData._tokenExpirationDate).getTime() -
                    new Date().getTime();
                this.authService.setLogoutTimer(expirationDuration);

                return new AuthActions.AuthenticateSuccess({
                    email: loadedUser.email,
                    userId: loadedUser.id,
                    token: loadedUser.token,
                    expirationDate: new Date(userData._tokenExpirationDate),
                    isRedirect: false
                });
            }

            return {
                type: 'Dummy'
            };
        })
    ))

    authLogout$ = createEffect(() => this.action$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
            this.authService.clearLogoutTimer();
            localStorage.removeItem('userData')
            this.router.navigate(['/auth']);
        })
    ), {dispatch: false});

}
