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
        [alt]="product.altText"
        class="product-image"
      />
      <mat-card-header>
        <mat-card-title>{{ product.title }}</mat-card-title>
        <mat-card-subtitle>{{ product.subtitle }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <p>{{ product.description }}</p>
        <mat-chip-listbox>
          <mat-chip [color]="product.isGlutenFree ? 'accent' : 'warn'" selected>
            {{ product.isGlutenFree ? "Gluten-Free" : "Contains Gluten" }}
          </mat-chip>
        </mat-chip-listbox>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .product-card {
        height: 100%;
        display: flex;
        flex-direction: column;
        transition: transform 0.2s, box-shadow 0.2s;
        cursor: pointer;
      }

      .product-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      .product-image {
        height: 200px;
        object-fit: cover;
      }

      mat-card-content {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      mat-chip-listbox {
        margin-top: 10px;
      }
    `,
  ],
})
export class ProductCardComponent {
  @Input() product: any;

  constructor(private router: Router) {}

  navigateToDetail() {
    // Ürün ID'sini title'dan çıkarıyoruz (gerçek uygulamada ürünün kendi ID'si olacaktır)
    const id = this.product.title.split(" ").pop();
    this.router.navigate(["/product", id]);
  }
}
