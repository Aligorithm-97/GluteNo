import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { environment } from "../../../environments/environment";

interface AuthResponse {
  token: string;
  // API'den dönen diğer alanlar varsa eklenebilir
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private baseUrl = environment.apiBaseUrl;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    // Sayfa yenilendiğinde token kontrolü
    const token = localStorage.getItem("token");
    if (token) {
      this.isAuthenticatedSubject.next(true);
    }
  }

  authenticate(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}auth/authenticate`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          if (response.token) {
            localStorage.setItem("token", response.token);
            this.isAuthenticatedSubject.next(true);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem("token");
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem("token") !== null;
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }
}
