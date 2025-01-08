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
              <mat-form-field appearance="outline">
                <mat-label>Description</mat-label>
                <input
                  matInput
                  formControlName="description"
                  placeholder="Enter product description"
                />
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
        padding: 16px;
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
        gap: 20px;
        padding: 20px;
      }

      .form-row {
        width: 100%;
      }

      .mat-mdc-form-field {
        width: 100%;
      }

      /* Description alanı için özel stiller */
      ::ng-deep .description-field {
        width: 100% !important;
      }

      ::ng-deep .description-field .mat-mdc-form-field-flex {
        background-color: var(--surface-color) !important;
        border: 1px solid var(--border-color) !important;
        border-radius: 8px !important;
        padding: 0 !important;
      }

      ::ng-deep .description-field .mat-mdc-text-field-wrapper {
        padding: 0 !important;
      }

      ::ng-deep .description-field .mat-mdc-form-field-infix {
        padding: 0 !important;
        border: none !important;
      }

      ::ng-deep .description-field textarea.mat-mdc-input-element {
        padding: 16px !important;
        min-height: 120px !important;
        max-height: 200px !important;
        resize: none !important;
        margin: 0 !important;
        border: none !important;
        background: transparent !important;
        font-size: 15px !important;
        line-height: 1.5 !important;
        color: var(--text-color) !important;
        box-sizing: border-box !important;
        width: 100% !important;
        overflow-y: auto !important;
      }

      ::ng-deep .description-field .mdc-notched-outline {
        display: none !important;
      }

      /* Form alanları için genel stiller */
      .form-row {
        margin-bottom: 24px !important;
        width: 100% !important;
      }

      .mat-mdc-form-field {
        width: 100% !important;
        display: block !important;
      }

      @media (max-width: 768px) {
        ::ng-deep .description-field textarea.mat-mdc-input-element {
          min-height: 100px !important;
          max-height: 150px !important;
          font-size: 14px !important;
          padding: 12px !important;
        }
      }

      @media (max-width: 480px) {
        ::ng-deep .description-field textarea.mat-mdc-input-element {
          min-height: 80px !important;
          max-height: 120px !important;
          font-size: 14px !important;
          padding: 10px !important;
        }
      }

      /* Diğer form alanları için stiller */
      ::ng-deep
        .mat-mdc-form-field-appearance-outline
        .mat-mdc-form-field-flex {
        background-color: var(--surface-color) !important;
        border: 1px solid var(--border-color) !important;
        border-radius: 8px !important;
      }

      ::ng-deep .mat-mdc-form-field-appearance-outline .mdc-notched-outline {
        display: none !important;
      }

      /* Image upload alanı için stiller */
      .image-upload {
        margin: 24px 0 !important;
      }

      .upload-container {
        width: 100% !important;
        height: 200px !important;
        border: 2px dashed var(--border-color) !important;
        border-radius: 8px !important;
        cursor: pointer !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        transition: all 0.3s ease !important;
        background-color: var(--background-color) !important;
        overflow: hidden !important;
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
        margin: 24px 0 !important;
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

      @media (max-width: 768px) {
        .admin-container {
          padding: 12px;
        }

        .product-form {
          padding: 16px;
          gap: 16px;
        }

        .upload-container {
          height: 160px;
        }

        ::ng-deep .mat-mdc-form-field textarea.mat-mdc-input-element {
          min-height: 80px !important;
        }
      }

      @media (max-width: 480px) {
        .admin-container {
          padding: 8px;
        }

        .product-form {
          padding: 12px;
          gap: 12px;
        }

        .form-actions {
          flex-direction: column;
        }

        .form-actions button {
          width: 100%;
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
