import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
@Component({
  selector: "app-search-bar",
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.css"],
})
export class SearchBarComponent {
  searchTerm: string = "";
  @Output() search = new EventEmitter<string>();
  onSearch() {
    this.search.emit(this.searchTerm);
  }
}
