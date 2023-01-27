import { Actions, ofType, createEffect } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";

import * as AuthActions from './auth.actions';
import { AuthResponseData } from "../auth.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";


@Injectable()
export class AuthEffects {

    authLogin$ = createEffect(() => this.action$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http
                .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyChJt77hzApIO_BdFEcTbYN5Zes5GTDmcg', {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }).pipe(
                    map(resData => {
                        const expirationDate = new Date(
                            new Date().getTime() + +resData.expiresIn * 1000
                        )
                        return new AuthActions.Login({
                            email: resData.email,
                            userId: resData.localId,
                            token: resData.idToken,
                            expirationDate
                        })
                    }),
                    catchError(error => {
                        // ...
                        return of();
                    })
                )
        })
    ))

    authSuccess$ = createEffect(() => this.action$.pipe(
        ofType(AuthActions.LOGIN),
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
