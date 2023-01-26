import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";

import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import * as fromApp from '../store/app.reducer';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
    isAuthenticated = false;
    private userSub: Subscription;

    constructor(
        private dataStorageService: DataStorageService,
        private authService: AuthService,
        private store: Store<fromApp.AppState>
    ) {}

    ngOnInit(): void {
        this.userSub = this.store.select('auth').subscribe(authState => {
            const user = authState.user;
            this.isAuthenticated = !!user;
            console.log(!user);
            console.log(!!user);
        })
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }

    onLogout() {
        this.authService.logout();
    }

    onSaveRecipes() {
        this.dataStorageService.storeRecipes();
    }

    onFetchRecipes() {
        this.dataStorageService.fetchRecipes().subscribe();
    }
}
