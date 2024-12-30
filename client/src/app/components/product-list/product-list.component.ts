import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { ProductCardComponent } from "../product-card/product-card.component";
import { NgxPaginationModule } from "ngx-pagination";
import { MatCardModule } from "@angular/material/card";
@Component({
  selector: "app-product-list",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    ProductCardComponent,
    SearchBarComponent,
    MatCardModule,
  ],
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent {
  products = [];
  page: number = 1;
  handleSearch(searchTerm: string) {
    console.log("Search Term:", searchTerm);
  }
}
