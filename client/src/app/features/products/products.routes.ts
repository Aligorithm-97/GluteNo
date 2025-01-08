import { Routes } from "@angular/router";
import { ProductListComponent } from "../../shared/components/product-list/product-list.component";
import { ProductDetailComponent } from "../../shared/components/product-detail/product-detail.component";

export const PRODUCTS_ROUTES: Routes = [
  { path: "", component: ProductListComponent },
  { path: "product/:id", component: ProductDetailComponent },
];
