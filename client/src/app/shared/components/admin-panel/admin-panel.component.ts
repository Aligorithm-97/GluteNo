import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { AuthService } from "../../../core/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin-panel",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatSnackBarModule,
    MatTooltipModule,
  ],
  providers: [AuthService],
  template: `
    <div class="admin-container">
      <mat-card class="admin-card">
        <mat-card-header>
          <mat-card-title>Add New Product</mat-card-title>
          <mat-card-subtitle
            >Fill in the product details below</mat-card-subtitle
          >
          <button
            mat-icon-button
            class="logout-button"
            (click)="logout()"
            matTooltip="Logout"
          >
            <mat-icon>logout</mat-icon>
          </button>
        </mat-card-header>

        <mat-card-content>
          <form
            [formGroup]="productForm"
            (ngSubmit)="onSubmit()"
            class="product-form"
          >
            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Product Name</mat-label>
                <input
                  matInput
                  formControlName="name"
                  placeholder="Enter product name"
                />
                <mat-error
                  *ngIf="productForm.get('name')?.hasError('required')"
                >
                  Product name is required
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Category</mat-label>
                <mat-select formControlName="category">
                  <mat-option value="bread">Bread</mat-option>
                  <mat-option value="pastry">Pastry</mat-option>
                  <mat-option value="snacks">Snacks</mat-option>
                  <mat-option value="desserts">Desserts</mat-option>
                </mat-select>
                <mat-error
                  *ngIf="productForm.get('category')?.hasError('required')"
                >
                  Category is required
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Description</mat-label>
                <textarea
                  matInput
                  formControlName="description"
                  rows="4"
                  placeholder="Enter product description"
                ></textarea>
                <mat-error
                  *ngIf="productForm.get('description')?.hasError('required')"
                >
                  Description is required
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-row image-upload">
              <div
                class="upload-container"
                (click)="fileInput.click()"
                [class.has-image]="imagePreview"
              >
                <input
                  #fileInput
                  type="file"
                  (change)="onImageSelected($event)"
                  accept="image/*"
                  hidden
                />
                <div class="upload-content" *ngIf="!imagePreview">
                  <mat-icon>cloud_upload</mat-icon>
                  <span>Click to upload product image</span>
                </div>
                <img
                  *ngIf="imagePreview"
                  [src]="imagePreview"
                  alt="Product preview"
                />
              </div>
            </div>

            <div class="form-row checkbox-row">
              <mat-checkbox formControlName="isGlutenFree" color="primary">
                Gluten Free Product
              </mat-checkbox>
            </div>

            <div class="form-actions">
              <button mat-button type="button" (click)="resetForm()">
                Reset
              </button>
              <button
                mat-raised-button
                color="primary"
                type="submit"
                [disabled]="productForm.invalid"
              >
                Add Product
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .admin-container {
        padding: 24px;
        max-width: 800px;
        margin: 0 auto;
      }

      .admin-card {
        background-color: var(--surface-color);
        border: 1px solid var(--border-color);
      }

      .product-form {
        display: flex;
        flex-direction: column;
        gap: 24px;
        padding: 24px;
      }

      .form-row {
        width: 100%;
      }

      .mat-mdc-form-field {
        width: 100%;
      }

      .image-upload {
        margin: 12px 0;
      }

      .upload-container {
        width: 100%;
        height: 200px;
        border: 2px dashed var(--border-color);
        border-radius: 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        background-color: var(--background-color);
        overflow: hidden;
      }

      .upload-container:hover {
        border-color: var(--primary-color);
        background-color: var(--button-hover);
      }

      .upload-container.has-image {
        border-style: solid;
      }

      .upload-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        color: var(--secondary-text-color);
      }

      .upload-content mat-icon {
        font-size: 48px;
        width: 48px;
        height: 48px;
      }

      .upload-container img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }

      .checkbox-row {
        margin: 12px 0;
      }

      .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        margin-top: 12px;
      }

      .logout-button {
        position: absolute;
        right: 16px;
        top: 16px;
      }

      @media (max-width: 600px) {
        .admin-container {
          padding: 16px;
        }

        .product-form {
          padding: 16px;
          gap: 16px;
        }

        .upload-container {
          height: 160px;
        }
      }
    `,
  ],
})
export class AdminPanelComponent {
  productForm: FormGroup;
  imagePreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ["", Validators.required],
      category: ["", Validators.required],
      description: ["", Validators.required],
      isGlutenFree: [false],
      image: [null],
    });
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.productForm.patchValue({ image: file });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      console.log("Product data:", this.productForm.value);
      this.snackBar.open("Product added successfully!", "Close", {
        duration: 3000,
        horizontalPosition: "end",
        verticalPosition: "top",
      });
      this.resetForm();
    }
  }

  resetForm() {
    this.productForm.reset();
    this.imagePreview = null;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/admin/login"]);
  }
}
