import { Routes } from "@angular/router";
import { ProductListComponent } from "./components/product-list/product-list.component";
import { AdminPanelComponent } from "./components/admin-panel/admin-panel.component";

export const routes: Routes = [
  { path: "", component: ProductListComponent },
  { path: "admin", component: AdminPanelComponent },
];
