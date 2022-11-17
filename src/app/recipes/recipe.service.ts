import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.sevice";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        {   
            name: 'Garlic Butter Chicken', 
            description: 'Tender, juicy chicken bathed in a rich', 
            imagePath: 'https://img.jamieoliver.com/jamieoliver/recipe-database/oldImages/large/1571_2_1437661403.jpg?tr=w-800,h-1066', 
            ingredients: [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20)
            ]
        },
        {
            name: 'Hambuger', 
            description: 'Oli fried hambuger rich', 
            imagePath: 'https://img.jamieoliver.com/home/wp-content/uploads/features-import/2015/10/HPear_Halloween_Feature-1024x683.jpg', 
            ingredients: [
                new Ingredient('Buns', 2),
                new Ingredient('Meat', 3)
            ]
        },
        {name: 'Garlic Oeal Chicken', description: 'Fucking, juicy chicken bathed in a rich', imagePath: 'https://img.jamieoliver.com/home/wp-content/uploads/features-import/2018/11/JO_Xmas_Hasselbacks_630x420.jpg', ingredients: []},
    ];

    constructor(private slService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice(); // return new array, copy of array
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }
}