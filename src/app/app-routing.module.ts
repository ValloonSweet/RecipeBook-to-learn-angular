import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full'},
    {
        path: 'recipes',
        loadChildren: () => import('./recipes/recipes.module')
                        .then(m => m.RecipesModule)
    },
    {
        path: "shopping-list",
        loadChildren: () =>
            import("./shopping-list/shopping-list.module").then(
                m => m.ShoppingListModule
            )
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./auth/auth.module').then(
                m => m.AuthModule
            )
    }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
