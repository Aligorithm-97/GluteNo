import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ProductCardComponent } from "../product-card/product-card.component";
import { NgxPaginationModule } from "ngx-pagination";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";

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
  ],
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit {
  products = Array.from({ length: 20 }, (_, index) => ({
    title: `Bread Product ${index + 1}`,
    subtitle: "Bakery",
    image: "assets/white.png",
    altText: "Photo of Bread Product",
    description:
      index % 2 === 0
        ? "A delicious gluten-free bread option"
        : "Traditional bread with gluten",
    isGlutenFree: index % 2 === 0,
  }));

  filteredProducts = [...this.products];
  page: number = 1;
  searchTerm: string = "";

  ngOnInit() {
    window.addEventListener("filterProducts", ((event: CustomEvent) => {
      this.filterByGluten(event.detail);
    }) as EventListener);

    window.addEventListener("searchProducts", ((event: CustomEvent) => {
      this.handleSearch(event.detail);
    }) as EventListener);
  }

  filterByGluten(filterType: "all" | "gluten-free" | "with-gluten") {
    switch (filterType) {
      case "all":
        this.filteredProducts = [...this.products];
        break;
      case "gluten-free":
        this.filteredProducts = this.products.filter(
          (product) => product.isGlutenFree
        );
        break;
      case "with-gluten":
        this.filteredProducts = this.products.filter(
          (product) => !product.isGlutenFree
        );
        break;
    }
    this.page = 1;
  }

  handleSearch(searchTerm: string) {
    if (!searchTerm.trim()) {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    this.page = 1;
  }
}
