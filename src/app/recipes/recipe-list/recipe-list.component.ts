import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  
  recipes: Recipe[] = [
    {name: 'Garlic Butter Chicken', description: 'Tender, juicy chicken bathed in a rich', imagePath: 'https://img.jamieoliver.com/jamieoliver/recipe-database/oldImages/large/1571_2_1437661403.jpg?tr=w-800,h-1066'},
    {name: 'Hambuger', description: 'Oli fried hambuger rich', imagePath: 'https://img.jamieoliver.com/home/wp-content/uploads/features-import/2015/10/HPear_Halloween_Feature-1024x683.jpg'},
    {name: 'Garlic Oeal Chicken', description: 'Fucking, juicy chicken bathed in a rich', imagePath: 'https://img.jamieoliver.com/home/wp-content/uploads/features-import/2018/11/JO_Xmas_Hasselbacks_630x420.jpg'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

}
