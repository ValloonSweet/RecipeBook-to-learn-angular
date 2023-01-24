import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert.component/alert.component";
import { LoadingSpinnerComponent } from "./loading-spinners/loading-spinner.component";
import { DropdownDirective } from "./dropdown.directive";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        AlertComponent,
        LoadingSpinnerComponent,
        DropdownDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AlertComponent,
        DropdownDirective,
        LoadingSpinnerComponent,
        CommonModule
    ]
})
export class SharedModule {}
