import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  login() {
    this.isAuthenticatedSubject.next(true);
    localStorage.setItem("isAuthenticated", "true");
  }

  logout() {
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem("isAuthenticated");
  }

  isAuthenticated(): boolean {
    return localStorage.getItem("isAuthenticated") === "true";
  }
}
