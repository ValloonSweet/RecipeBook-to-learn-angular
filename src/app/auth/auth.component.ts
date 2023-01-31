import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
    isLoginMode: boolean = true;
    isLoading: boolean = false;
    error: string = null;
    private storeSub: Subscription;

    constructor(
        private store: Store<fromApp.AppState>
    ) {}

    ngOnInit(): void {
        this.storeSub = this.store.select('auth').subscribe({
            next: authState => {
                this.isLoading = authState.loading;
                this.error = authState.authError;
            }
        })
    }

    ngOnDestroy(): void {
        this.storeSub.unsubscribe();
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(f: NgForm) {
        if(!f.valid) {
            return;
        }
        const { email, password } = f.value;
        this.isLoading = true;
        if(this.isLoginMode) {
            this.store.dispatch(new AuthActions.LoginStart({
                email, password
            }))
        } else {
            this.store.dispatch(new AuthActions.SignupStart({
                email, password
            }))
        }

        f.reset();
    }

    onHandleError() {
        this.store.dispatch(new AuthActions.ClearError());
    }
}
