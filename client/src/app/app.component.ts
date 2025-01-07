import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { LogoComponent } from "./shared/components/logo/logo.component";
import { ThemeService } from "./core/services/theme.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    LogoComponent,
  ],
  providers: [ThemeService],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {
  searchTerm: string = "";
  isDarkTheme: boolean = false;
  activeFilter: "all" | "gluten-free" | "with-gluten" = "all";

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.isDarkTheme$.subscribe(
      (isDark) => (this.isDarkTheme = isDark)
    );
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  filterProducts(filterType: "all" | "gluten-free" | "with-gluten") {
    this.activeFilter = filterType;
    const event = new CustomEvent("filterProducts", {
      detail: filterType,
      bubbles: true,
    });
    window.dispatchEvent(event);
  }

  handleSearch(term: string) {
    const event = new CustomEvent("searchProducts", {
      detail: term,
      bubbles: true,
    });
    window.dispatchEvent(event);
  }
}
