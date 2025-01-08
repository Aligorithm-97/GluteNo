import { Routes } from "@angular/router";
import { AdminLoginComponent } from "../../shared/components/admin-login/admin-login.component";
import { AdminPanelComponent } from "../../shared/components/admin-panel/admin-panel.component";
import { authGuard } from "../../core/guards/auth.guard";

export const ADMIN_ROUTES: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: AdminLoginComponent },
  {
    path: "panel",
    component: AdminPanelComponent,
    canActivate: [authGuard],
  },
];
