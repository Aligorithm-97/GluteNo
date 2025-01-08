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
  ],
  template: `
    <div class="login-container">
      <mat-card class="login-card">
        <mat-card-header>
          <mat-card-title>Admin Login</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <form
            [formGroup]="loginForm"
            (ngSubmit)="onSubmit()"
            class="login-form"
          >
            <mat-form-field appearance="outline">
              <mat-label>Username</mat-label>
              <input matInput formControlName="username" type="text" />
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
              />
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
            >
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
        height: 100vh;
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
      }

      .login-form {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 20px 0;
      }

      mat-card-header {
        margin-bottom: 16px;
      }

      mat-card-title {
        color: var(--text-color);
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
        this.router.navigate(["/admin"]);
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
