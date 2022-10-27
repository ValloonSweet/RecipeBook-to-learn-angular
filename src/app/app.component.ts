import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  view = 'recipes';

  onChangeView(view: string) {
    this.view = view;
  }


  name = 'ximing';
}
