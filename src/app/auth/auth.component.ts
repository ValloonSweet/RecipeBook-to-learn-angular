import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";

import { AuthResponseData, AuthService } from "./auth.service";
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
    isLoginMode: boolean = true;
    isLoading: boolean = false;
    error: string = null;

    constructor(
        private authService: AuthService,
        private router: Router,
        private store: Store<fromApp.AppState>
    ) {}

    ngOnInit(): void {
        this.store.select('auth').subscribe({
            next: authState => {
                this.isLoading = authState.loading;
                this.error = authState.authError;
            }
        })
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(f: NgForm) {
        if(!f.valid) {
            return;
        }

        const { email, password } = f.value;

        let authObs: Observable<AuthResponseData>;

        this.isLoading = true;
        if(this.isLoginMode) {
            // authObs = this.authService.login(email, password)
            this.store.dispatch(new AuthActions.LoginStart({
                email, password
            }))
        } else {
            this.store.dispatch(new AuthActions.SignupStart({
                email, password
            }))
        }

        // authObs.subscribe({
        //     next: resData => {
        //         console.log(resData);
        //         this.isLoading = false;
        //         this.router.navigate(['/recipes'])
        //     },
        //     error: errorMsg => {
        //         console.log(errorMsg);
        //         this.error = errorMsg;
        //         this.isLoading = false;
        //     }
        // })
        f.reset();
    }

    onHandleError() {
        this.error = null;
    }
}
