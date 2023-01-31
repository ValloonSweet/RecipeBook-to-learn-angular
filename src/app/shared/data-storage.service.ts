import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs";
import { Store } from "@ngrx/store";

import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import * as fromApp from '../store/app.reducer';
import * as RecipeActions from '../recipes/store/recipe.actions';



@Injectable({providedIn: 'root'})
export class DataStorageService {
    BASE_URL = 'https://ng-recipes-backend-2c7b1-default-rtdb.europe-west1.firebasedatabase.app';

    constructor(
        private http: HttpClient,
        private recipeService: RecipeService,
        private store: Store<fromApp.AppState>
    ) {
    }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http
            .put(`${this.BASE_URL}/recipes.json`, recipes)
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchRecipes() {
        return this.http
            .get<Recipe[]>(`${this.BASE_URL}/recipes.json`)
            .pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        return {
                            ...recipe,
                            ingredients: recipe.ingredients ? recipe.ingredients : []
                        };
                    })
                }),
                tap(recipes => {
                    this.store.dispatch(new RecipeActions.SetRecipes(recipes));
                })
            )
    }
}
