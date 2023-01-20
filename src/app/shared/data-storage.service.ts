import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { map, tap } from "rxjs";



@Injectable({providedIn: 'root'})
export class DataStorageService {
    BASE_URL = 'https://ng-recipes-backend-2c7b1-default-rtdb.europe-west1.firebasedatabase.app';

    constructor(
        private http: HttpClient,
        private recipeService: RecipeService
    ) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        console.log('stored recipes: ', recipes)
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
                    this.recipeService.setRecipes(recipes);
                })
            )
    }
}
