import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode: boolean = true;
    isLoading: boolean = false;
    error: string = null;

    constructor(private authService: AuthService, private router: Router) {}

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
            authObs = this.authService.login(email, password)
        } else {
            authObs = this.authService.signup(email, password)
        }

        authObs.subscribe({
            next: resData => {
                console.log(resData);
                this.isLoading = false;
                this.router.navigate(['/recipes'])
            },
            error: errorMsg => {
                console.log(errorMsg);
                this.error = errorMsg;
                this.isLoading = false;
            }
        })
        f.reset();
    }

    onHandleError() {
        this.error = null;
    }
}
