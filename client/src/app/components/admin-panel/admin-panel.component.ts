import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCheckboxModule } from "@angular/material/checkbox";
@Component({
  selector: "app-admin-panel",
  templateUrl: "./admin-panel.component.html",
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatCheckboxModule],
})
export class AdminPanelComponent {
  product = { name: "", description: "", isGlutenFree: false };
  onSubmit() {
    console.log("Product Added:", this.product);
  }
}
