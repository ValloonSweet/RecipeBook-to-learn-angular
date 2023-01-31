import { Actions, createEffect, ofType } from "@ngrx/effects";

import * as RecipeActions from '../store/recipe.actions';
import { switchMap, tap, map, withLatestFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "../recipe.model";
import { Injectable } from "@angular/core";
import * as fromApp from '../../store/app.reducer';
import { Store } from "@ngrx/store";

@Injectable()
export class RecipeEffects {
    BASE_URL = 'https://ng-recipes-backend-2c7b1-default-rtdb.europe-west1.firebasedatabase.app';

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromApp.AppState>
    ) {}

    fetchRecipes$ = createEffect(() => this.actions$.pipe(
        ofType(RecipeActions.FETCH_RECIPES),
        switchMap(() => {
            return this.http
                .get<Recipe[]>(`${this.BASE_URL}/recipes.json`)
        }),
        map(recipes => {
            return recipes.map(recipe => {
                return {
                    ...recipe,
                    ingredients: recipe.ingredients ? recipe.ingredients : []
                };
            })
        }),
        map(recipes => {
            return new RecipeActions.SetRecipes(recipes);
        })
    ));

    storeRecipes$ = createEffect(() => this.actions$.pipe(
        ofType(RecipeActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData, recipesState]) => {
            return this.http.put(`${this.BASE_URL}/recipes.json`, recipesState.recipes)
        })
    ), {dispatch: false})

}
