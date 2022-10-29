import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @Output() addIngredient = new EventEmitter<Ingredient>();

  @ViewChild('amountInput')
  amountInput: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  onAddIngredient(nameInput: HTMLInputElement) {
    console.log(nameInput.value);
    console.log(this.amountInput.nativeElement.value);
    this.addIngredient.emit({
      name: nameInput.value,
      amount: this.amountInput.nativeElement.value
    })
  }

}
