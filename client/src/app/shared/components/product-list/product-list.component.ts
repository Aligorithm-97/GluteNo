import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ProductCardComponent } from "../product-card/product-card.component";
import { NgxPaginationModule } from "ngx-pagination";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { ApiService } from "../../../core/services/api.service";
import { Product } from "../../interfaces/product.interface";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: "app-product-list",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    ProductCardComponent,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <div class="product-list-container">
      <div *ngIf="loading" class="loading-spinner">
        <mat-spinner diameter="40"></mat-spinner>
      </div>

      <div *ngIf="!loading" class="products-grid">
        <div
          *ngFor="
            let product of filteredProducts
              | paginate : { itemsPerPage: 12, currentPage: page }
          "
        >
          <app-product-card [product]="product"></app-product-card>
        </div>
      </div>

      <div
        *ngIf="!loading && filteredProducts.length === 0"
        class="no-products"
      >
        <p>No products found.</p>
      </div>

      <div
        *ngIf="!loading && filteredProducts.length > 0"
        class="pagination-container"
      >
        <pagination-controls
          (pageChange)="page = $event"
          previousLabel="Previous"
          nextLabel="Next"
        >
        </pagination-controls>
      </div>
    </div>
  `,
  styles: [
    `
      .loading-spinner {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 300px;
      }

      .no-products {
        text-align: center;
        padding: 32px;
        color: var(--secondary-text-color);
      }
    `,
  ],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  page: number = 1;
  loading: boolean = true;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadProducts();

    window.addEventListener("filterProducts", ((event: CustomEvent) => {
      this.filterByGluten(event.detail);
    }) as EventListener);

    window.addEventListener("searchProducts", ((event: CustomEvent) => {
      this.handleSearch(event.detail);
    }) as EventListener);
  }

  loadProducts() {
    this.loading = true;
    this.apiService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = products;
        this.loading = false;
      },
      error: (error) => {
        console.error("Error loading products:", error);
        this.loading = false;
      },
    });
  }

  filterByGluten(filterType: "all" | "gluten-free" | "with-gluten") {
    this.loading = true;
    switch (filterType) {
      case "all":
        this.apiService.getProducts().subscribe({
          next: (products) => {
            this.filteredProducts = products;
            this.loading = false;
          },
          error: (error) => {
            console.error("Error loading all products:", error);
            this.loading = false;
          },
        });
        break;
      case "gluten-free":
        this.apiService.getGlutenFreeProducts().subscribe({
          next: (products) => {
            this.filteredProducts = products;
            this.loading = false;
          },
          error: (error) => {
            console.error("Error loading gluten-free products:", error);
            this.loading = false;
          },
        });
        break;
      case "with-gluten":
        this.apiService.getGlutenProducts().subscribe({
          next: (products) => {
            this.filteredProducts = products;
            this.loading = false;
          },
          error: (error) => {
            console.error("Error loading products with gluten:", error);
            this.loading = false;
          },
        });
        break;
    }
    this.page = 1;
  }

  handleSearch(searchTerm: string) {
    this.loading = true;
    if (!searchTerm.trim()) {
      this.loadProducts();
    } else {
      this.apiService.searchProducts(searchTerm).subscribe({
        next: (products) => {
          this.filteredProducts = products;
          this.loading = false;
        },
        error: (error) => {
          console.error("Error searching products:", error);
          this.loading = false;
        },
      });
    }
    this.page = 1;
  }
}
