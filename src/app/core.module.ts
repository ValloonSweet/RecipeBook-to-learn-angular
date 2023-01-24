import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { ShoppingListService } from "./shopping-list/shopping-list.sevice";

@NgModule({
    providers: [
        ShoppingListService,
        {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptorService,
        multi: true
        }
    ]
})
export class CoreModule {}
