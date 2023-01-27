import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

export const ADD_INGREDIENT = '[Shopping List] ADD_INGREDIENT';
export const ADD_INGREDIENTS = '[Shopping List] ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = '[Shopping List] UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = '[Shopping List] DELETE_INGREDIENT';
export const START_EDIT = '[Shopping List] START_EDIT';
export const STOP_EDIT = '[Shopping List] STOP_EDIT';

export class AddIngredient implements Action {
    constructor(public payload: Ingredient) {}
    readonly type = ADD_INGREDIENT;
}

export class AddIngredients implements Action {
    constructor(public payload: Ingredient[]) {}
    readonly type = ADD_INGREDIENTS;
}

export class UpdateIngredient implements Action {
    constructor(public payload: Ingredient) {}
    readonly type = UPDATE_INGREDIENT;
}

export class DeleteIngredient implements Action {
    constructor() {}
    readonly type = DELETE_INGREDIENT;
}

export class StartEdit implements Action {
    constructor(public payload: number) {}
    readonly type = START_EDIT;
}

export class StopEdit implements Action {
    constructor() {}
    readonly type = STOP_EDIT;
}

export type ShoppingListActions =
    AddIngredient |
    AddIngredients |
    UpdateIngredient |
    DeleteIngredient |
    StartEdit |
    StopEdit;
