import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { CommonModule } from "@angular/common";
@Component({
  selector: "app-root",
  imports: [RouterOutlet, MatCardModule, MatButtonModule, CommonModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  // ngOnInit -> get all foods from mongo db
}
