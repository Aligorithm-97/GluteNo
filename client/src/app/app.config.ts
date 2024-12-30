import { ApplicationConfig } from "@angular/core";
import { provideHttpClient } from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { importProvidersFrom } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

import { routes } from "./app.routes";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    provideRouter(routes),
    importProvidersFrom(
      FormsModule,
      ReactiveFormsModule,
      NgxPaginationModule,
      MatCardModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule,
      CommonModule,
      MatFormFieldModule
    ),
  ],
};
