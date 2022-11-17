import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.sevice';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @Output() addIngredient = new EventEmitter<Ingredient>();

  @ViewChild('amountInput') amountInput: ElementRef;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAddIngredient(nameInput: HTMLInputElement) {
    this.slService.addIngredient({
      name: nameInput.value,
      amount: this.amountInput.nativeElement.value
    })
  }

}
