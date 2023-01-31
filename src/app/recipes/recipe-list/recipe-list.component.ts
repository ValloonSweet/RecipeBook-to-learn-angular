import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[];
  subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.store.select('recipes')
      .pipe(
        map(recipeState => recipeState.recipes)
      )
      .subscribe({
        next: (recipes) => {
          this.recipes = recipes;
        }
      })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onNewRecipe () {
    this.router.navigate(['new'], {relativeTo: this.route})
  }
}
