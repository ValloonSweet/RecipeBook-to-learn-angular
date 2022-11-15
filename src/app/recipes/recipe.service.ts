import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        {name: 'Garlic Butter Chicken', description: 'Tender, juicy chicken bathed in a rich', imagePath: 'https://img.jamieoliver.com/jamieoliver/recipe-database/oldImages/large/1571_2_1437661403.jpg?tr=w-800,h-1066'},
        {name: 'Hambuger', description: 'Oli fried hambuger rich', imagePath: 'https://img.jamieoliver.com/home/wp-content/uploads/features-import/2015/10/HPear_Halloween_Feature-1024x683.jpg'},
        {name: 'Garlic Oeal Chicken', description: 'Fucking, juicy chicken bathed in a rich', imagePath: 'https://img.jamieoliver.com/home/wp-content/uploads/features-import/2018/11/JO_Xmas_Hasselbacks_630x420.jpg'},
    ];

    getRecipes() {
        return this.recipes.slice(); // return new array, copy of array
    }
}