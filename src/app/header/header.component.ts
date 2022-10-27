import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    @Output() changeView = new EventEmitter<string>();
    view = 'recipes';

    onViewChange(view: string) {
        this.view = view;
        this.changeView.emit(view);
    }
}