import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "./recipe.service";
import { Observable, map, take, tap } from "rxjs";
import { Recipe } from "./recipe.model";

import { Store } from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from './store/recipe.actions';
import { Actions, ofType } from "@ngrx/effects";

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {
    constructor(
        private store: Store<fromApp.AppState>,
        private actions$: Actions
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('recipes').pipe(
            map(recipeState => recipeState.recipes),
            tap(recipes => {
                if(recipes.length === 0) {
                    console.log('before resolver fetch recipes')
                    return this.store.dispatch(new RecipesActions.FetchRecipes());
                } else {
                    return recipes;
                }
            }),
            take(1)
        )
    }
}
