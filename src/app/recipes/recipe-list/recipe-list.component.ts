import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    {name: 'Garlic Butter Chicken', description: 'Tender, juicy chicken bathed in a rich', imagePath: 'https://images.app.goo.gl/xzZPBjeiCsYjHg5L7'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
