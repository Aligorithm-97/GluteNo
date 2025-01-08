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
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AuthService } from "../../../core/services/auth.service";
import { LogoComponent } from "../logo/logo.component";

@Component({
  selector: "app-admin-login",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    LogoComponent,
  ],
  template: `
    <div class="login-container">
      <mat-card class="login-card">
        <div class="login-header">
          <app-logo></app-logo>
          <h2>Admin Panel</h2>
        </div>

        <mat-card-content>
          <form
            [formGroup]="loginForm"
            (ngSubmit)="onSubmit()"
            class="login-form"
          >
            <mat-form-field appearance="outline">
              <mat-label>Username</mat-label>
              <input
                matInput
                formControlName="username"
                type="text"
                placeholder="Enter your username"
              />
              <mat-icon matPrefix>person</mat-icon>
              <mat-error
                *ngIf="loginForm.get('username')?.hasError('required')"
              >
                Username is required
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Password</mat-label>
              <input
                matInput
                formControlName="password"
                [type]="hidePassword ? 'password' : 'text'"
                placeholder="Enter your password"
              />
              <mat-icon matPrefix>lock</mat-icon>
              <button
                mat-icon-button
                matSuffix
                (click)="hidePassword = !hidePassword"
                type="button"
              >
                <mat-icon>{{
                  hidePassword ? "visibility_off" : "visibility"
                }}</mat-icon>
              </button>
              <mat-error
                *ngIf="loginForm.get('password')?.hasError('required')"
              >
                Password is required
              </mat-error>
            </mat-form-field>

            <button
              mat-raised-button
              color="primary"
              type="submit"
              [disabled]="loginForm.invalid"
              class="login-button"
            >
              <mat-icon>login</mat-icon>
              Login
            </button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .login-container {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--background-color);
        padding: 16px;
      }

      .login-card {
        width: 100%;
        max-width: 400px;
        background-color: var(--surface-color);
        border-radius: 12px;
        box-shadow: 0 4px 20px var(--shadow-color);
      }

      .login-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 32px 16px 16px;
        gap: 16px;
      }

      .login-header h2 {
        margin: 0;
        color: var(--text-color);
        font-weight: 500;
        font-size: 24px;
      }

      .login-form {
        display: flex;
        flex-direction: column;
        gap: 24px;
        padding: 24px;
      }

      mat-form-field {
        width: 100%;
      }

      ::ng-deep .mat-mdc-form-field-icon-prefix {
        padding-right: 12px;
        color: var(--secondary-text-color);
      }

      .login-button {
        height: 48px;
        font-size: 16px;
        font-weight: 500;
        margin-top: 16px;
      }

      .login-button mat-icon {
        margin-right: 8px;
      }

      @media (max-width: 480px) {
        .login-card {
          max-width: 100%;
        }

        .login-form {
          padding: 16px;
          gap: 16px;
        }

        .login-header {
          padding: 24px 16px 8px;
        }
      }
    `,
  ],
})
export class AdminLoginComponent {
  loginForm: FormGroup;
  hidePassword = true;

  // Sabit kullanıcı adı ve şifre (gerçek uygulamada bu bilgiler güvenli bir şekilde saklanmalıdır)
  private readonly ADMIN_USERNAME = "admin";
  private readonly ADMIN_PASSWORD = "admin123";

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      if (
        username === this.ADMIN_USERNAME &&
        password === this.ADMIN_PASSWORD
      ) {
        this.authService.login();
        this.snackBar.open("Login successful!", "Close", {
          duration: 3000,
          horizontalPosition: "end",
          verticalPosition: "top",
        });
        this.router.navigate(["/admin/panel"]);
      } else {
        this.snackBar.open("Invalid username or password!", "Close", {
          duration: 3000,
          horizontalPosition: "end",
          verticalPosition: "top",
        });
      }
    }
  }
}
