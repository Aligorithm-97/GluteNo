import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Product } from "../../shared/interfaces/product.interface";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  // Ürünleri getir
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}products`);
  }

  // Ürün detayı getir
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}products/${id}`);
  }

  // Yeni ürün ekle
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}products`, product);
  }

  // Ürün güncelle
  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}products/${id}`, product);
  }

  // Ürün sil
  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}products/${id}`);
  }

  // Gluten içermeyen ürünleri getir
  getGlutenFreeProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.baseUrl}products?isGlutenFree=true`
    );
  }

  // Gluten içeren ürünleri getir
  getGlutenProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.baseUrl}products?isGlutenFree=false`
    );
  }

  // Ürün ara
  searchProducts(term: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}products?search=${term}`);
  }
}
