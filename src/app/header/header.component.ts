import { Component, OnDestroy, OnInit } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
    isAuthenticated = false;
    private userSub: Subscription;

    constructor(
        private dataStorageService: DataStorageService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.userSub = this.authService.user.subscribe(user => {
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
