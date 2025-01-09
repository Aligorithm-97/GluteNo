import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { Router } from "@angular/router";

@Component({
  selector: "app-product-card",
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule],
  template: `
    <mat-card
      class="product-card"
      appearance="outlined"
      (click)="navigateToDetail()"
    >
      <img
        mat-card-image
        [src]="product.image"
        [alt]="product.title"
        class="product-image"
      />
      <mat-card-header>
        <mat-card-title>{{ product.title }}</mat-card-title>
        <mat-card-subtitle>{{ product.subtitle }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <p>{{ product.description }}</p>
        <mat-chip-listbox>
          <mat-chip
            [color]="!product.isGlutenFree ? 'warn' : 'accent'"
            selected
          >
            {{ !product.isGlutenFree ? "Contains Gluten" : "Gluten-Free" }}
          </mat-chip>
        </mat-chip-listbox>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ["./product-card.component.css"],
})
export class ProductCardComponent {
  @Input() product: any;

  constructor(private router: Router) {}

  navigateToDetail() {
    this.router.navigate(["/product", this.product.id]);
  }
}
