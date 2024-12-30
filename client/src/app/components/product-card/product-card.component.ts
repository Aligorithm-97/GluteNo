import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
@Component({
  selector: "app-product-card",
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.css"],
})
export class ProductCardComponent {
  @Input() product: any;
}
