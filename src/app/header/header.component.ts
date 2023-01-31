import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";

import { DataStorageService } from "../shared/data-storage.service";
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipesActions from '../recipes/store/recipe.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
    isAuthenticated = false;
    private userSub: Subscription;

    constructor(
        private dataStorageService: DataStorageService,
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
        this.store.dispatch(new AuthActions.Logout());
    }

    onSaveRecipes() {
        this.dataStorageService.storeRecipes();
    }

    onFetchRecipes() {
        this.store.dispatch(new RecipesActions.FetchRecipes());
    }
}
