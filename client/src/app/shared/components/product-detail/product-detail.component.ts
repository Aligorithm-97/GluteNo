import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-product-detail",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
  ],
  template: `
    <div class="product-detail-container">
      <mat-card class="product-detail-card">
        <mat-card-header>
          <mat-card-title>{{ product.title }}</mat-card-title>
          <mat-card-subtitle>{{ product.subtitle }}</mat-card-subtitle>
        </mat-card-header>

        <img
          mat-card-image
          [src]="product.image"
          [alt]="product.altText"
          class="product-image"
        />

        <mat-card-content>
          <div class="gluten-status">
            <mat-chip-listbox>
              <mat-chip
                [color]="product.isGlutenFree ? 'accent' : 'warn'"
                selected
              >
                {{ product.isGlutenFree ? "Gluten-Free" : "Contains Gluten" }}
              </mat-chip>
            </mat-chip-listbox>
          </div>

          <div class="product-description">
            <h3>Description</h3>
            <p>{{ product.description }}</p>
          </div>

          <div class="product-details">
            <h3>Product Details</h3>
            <ul>
              <li>Category: {{ product.subtitle }}</li>
              <li>
                Allergens:
                {{ product.isGlutenFree ? "No gluten" : "Contains gluten" }}
              </li>
              <li>Product ID: {{ productId }}</li>
            </ul>
          </div>
        </mat-card-content>

        <mat-card-actions>
          <button mat-button color="primary" (click)="goBack()">
            <mat-icon>arrow_back</mat-icon> Back to Products
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .product-detail-container {
        padding: 20px;
        max-width: 800px;
        margin: 0 auto;
      }

      .product-detail-card {
        margin-bottom: 20px;
      }

      .product-image {
        max-height: 400px;
        object-fit: cover;
      }

      .gluten-status {
        margin: 20px 0;
      }

      .product-description,
      .product-details {
        margin: 20px 0;
      }

      .product-details ul {
        list-style: none;
        padding: 0;
      }

      .product-details li {
        margin: 10px 0;
        color: var(--secondary-text-color);
      }

      mat-card-actions {
        padding: 16px;
      }

      button mat-icon {
        margin-right: 8px;
      }
    `,
  ],
})
export class ProductDetailComponent implements OnInit {
  productId: string = "";
  product: any = {};

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get("id") || "";
    // Burada gerçek bir API'den ürün detaylarını çekebilirsiniz
    this.product = {
      title: `Bread Product ${this.productId}`,
      subtitle: "Bakery",
      image: "assets/white.png",
      altText: "Photo of Bread Product",
      description:
        Number(this.productId) % 2 === 0
          ? "A delicious gluten-free bread option made with the finest ingredients. Perfect for those with gluten sensitivity or celiac disease."
          : "Traditional bread made with premium wheat flour. Contains gluten and is perfect for those who can enjoy regular bread products.",
      isGlutenFree: Number(this.productId) % 2 === 0,
    };
  }

  goBack() {
    window.history.back();
  }
}
