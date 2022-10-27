import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  constructor() { }

  @Output() selectRecipe = new EventEmitter<void>();
  
  onSelected() {
    this.selectRecipe.emit();
  }

  ngOnInit(): void {
  }

}
