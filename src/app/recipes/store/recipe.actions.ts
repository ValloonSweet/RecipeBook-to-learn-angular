import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const SET_RECIPES = '[Recipe] Set Recipes';
export const ADD_RECIPE = '[Recipe] Add Recipe';
export const UPDATE_RECIPE = '[Recipe] Update Recipe';
export const DELETE_RECIPE = '[Recipe] Delete Recipe';

export const FETCH_RECIPES = '[Recipe] Fetch Recipes';
export const STORE_RECIPES = '[Recipe] Store Recipes';

export class SetRecipes implements Action {
    readonly type = SET_RECIPES;
    constructor(public payload: Recipe[]) {}
}

export class AddRecipe implements Action {
    readonly type = ADD_RECIPE;
    constructor(public payload: Recipe) {}
}

export class UpdateRecipe implements Action {
    readonly type = UPDATE_RECIPE;
    constructor(public payload: {index: number, recipe: Recipe}) {}
}

export class DeleteRecipe implements Action {
    readonly type = DELETE_RECIPE;
    constructor(public payload: number) {}
}

export class FetchRecipes implements Action {
    readonly type = FETCH_RECIPES;
}

export class StoreRecipes implements Action {
    readonly type = STORE_RECIPES;
}

export type RecipesActions =
    SetRecipes |
    AddRecipe |
    DeleteRecipe |
    UpdateRecipe |
    FetchRecipes;
