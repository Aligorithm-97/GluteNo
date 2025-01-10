import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ApiService } from "../../../core/services/api.service";
import { Product } from "../../interfaces/product.interface";

@Component({
  selector: "app-product-detail",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <div class="product-detail-container">
      <div *ngIf="loading" class="loading-spinner">
        <mat-spinner diameter="40"></mat-spinner>
      </div>

      <mat-card *ngIf="!loading" class="product-detail-card">
        <mat-card-header>
          <mat-card-title>{{ product.title }}</mat-card-title>
          <mat-card-subtitle>{{ product.subtitle }}</mat-card-subtitle>
        </mat-card-header>

        <img
          mat-card-image
          [src]="product.image"
          [alt]="product.title"
          class="product-image"
        />

        <mat-card-content>
          <div class="gluten-status">
            <mat-chip-listbox>
              <mat-chip
                [color]="!product.isGlutenFree ? 'warn' : 'accent'"
                selected
              >
                {{ !product.isGlutenFree ? "Contains Gluten" : "Gluten-Free" }}
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
            </ul>
          </div>
        </mat-card-content>

        <mat-card-actions>
          <button mat-button color="primary" (click)="goBack()">
            <mat-icon>arrow_back</mat-icon> Back to Products
          </button>
        </mat-card-actions>
      </mat-card>

      <div *ngIf="error" class="error-message">
        <p>{{ error }}</p>
        <button mat-button color="primary" (click)="goBack()">
          <mat-icon>arrow_back</mat-icon> Back to Products
        </button>
      </div>
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

      .loading-spinner {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 300px;
      }

      .error-message {
        text-align: center;
        color: var(--warn-color);
        padding: 20px;
      }
    `,
  ],
})
export class ProductDetailComponent implements OnInit {
  productId: string = "";
  product!: Product;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get("id") || "";
    this.loadProduct();
  }

  loadProduct() {
    this.loading = true;
    this.error = null;

    this.apiService.getProductById(this.productId).subscribe({
      next: (product) => {
        this.product = product;
        this.loading = false;
      },
      error: (error) => {
        console.error("Error loading product:", error);
        this.error = "Product not found or an error occurred.";
        this.loading = false;
      },
    });
  }

  goBack() {
    this.router.navigate(["/"]); // Ana sayfaya dön
  }
}
