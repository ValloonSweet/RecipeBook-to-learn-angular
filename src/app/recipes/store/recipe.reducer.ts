import * as RecipeActions from './recipe.actions';
import { Recipe } from "../recipe.model";

export interface State {
    recipes: Recipe[]
}

const initialState: State = {
    recipes: []
}

export function recipeReducer (state = initialState, action: RecipeActions.RecipesActions) {
    switch(action.type) {
        case RecipeActions.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            }
        case RecipeActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            }
        case RecipeActions.UPDATE_RECIPE:
            const updatedRecipes = state.recipes.map(recipe => recipe);
            updatedRecipes[action.payload.index] = action.payload.recipe;
            return {
                ...state,
                recipes: updatedRecipes
            }
        case RecipeActions.DELETE_RECIPE:
            const deletedRecipes = state.recipes.filter((_, index) => index != action.payload);
            return {
                ...state,
                recipes: deletedRecipes
            }
        default:
            return state;
    }
}
