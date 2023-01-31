import { Actions, createEffect, ofType } from "@ngrx/effects";

import * as RecipeActions from '../store/recipe.actions';
import { switchMap, tap, map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "../recipe.model";
import { Injectable } from "@angular/core";

@Injectable()
export class RecipeEffects {
    BASE_URL = 'https://ng-recipes-backend-2c7b1-default-rtdb.europe-west1.firebasedatabase.app';

    constructor(
        private actions$: Actions,
        private http: HttpClient
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

}
