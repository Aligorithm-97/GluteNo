import { Component, OnInit, OnDestroy } from "@angular/core";
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
import { Subject, Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

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
        <app-product-card
          *ngFor="
            let product of filteredProducts
              | paginate : { itemsPerPage: 12, currentPage: page }
          "
          [product]="product"
        ></app-product-card>
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
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  page: number = 1;
  loading: boolean = true;

  private searchSubject = new Subject<string>();
  private searchSubscription: Subscription;

  constructor(private apiService: ApiService) {
    this.searchSubscription = this.searchSubject
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((searchTerm) => {
        this.performSearch(searchTerm);
      });
  }

  ngOnInit() {
    this.loadProducts();

    window.addEventListener("filterProducts", ((event: CustomEvent) => {
      this.filterByGluten(event.detail);
    }) as EventListener);

    window.addEventListener("searchProducts", ((event: CustomEvent) => {
      this.searchSubject.next(event.detail);
    }) as EventListener);
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
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
        this.apiService.getProducts().subscribe({
          next: (products) => {
            this.filteredProducts = products.filter(
              (product) => product.isGlutenFree
            );
            this.loading = false;
          },
          error: (error) => {
            console.error("Error loading gluten-free products:", error);
            this.loading = false;
          },
        });
        break;
      case "with-gluten":
        this.apiService.getProducts().subscribe({
          next: (products) => {
            this.filteredProducts = products.filter(
              (product) => !product.isGlutenFree
            );
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

  private performSearch(searchTerm: string) {
    this.loading = true;
    if (!searchTerm.trim()) {
      this.loadProducts();
    } else {
      this.apiService.getProducts().subscribe({
        next: (products) => {
          this.filteredProducts = products.filter(
            (product) =>
              product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              product.subtitle
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              product.description
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase())
          );
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
