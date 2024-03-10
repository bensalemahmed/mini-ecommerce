import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Product } from './models/products';
import { Category } from './models/categorise';
import { LoaderService } from '@mini-ecommerce/shared-services-security';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private API_BASE_PATH = 'https://fakestoreapi.com';

  constructor(
    private httpClient: HttpClient,
    private loaderService: LoaderService
  ) {}

  /**
   * Handles the error and returns an Observable that emits an error message.
   * @param error - The error object.
   * @returns An Observable that emits an error message.
   */
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }

  /**
   * Returns the default HttpHeaders for API requests.
   * @returns The default HttpHeaders.
   */
  private getDefaultHeaders(): HttpHeaders {
    return new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );
  }

  /**
   * Handles the loader service and returns the provided Observable.
   * @param observable - The Observable to handle.
   * @returns The provided Observable.
   */
  private handleLoader<T>(observable: Observable<T>): Observable<T> {
    this.loaderService.showLoader();
    return observable.pipe(
      catchError((error) => this.handleError(error)),
      finalize(() => this.loaderService.hideLoader())
    );
  }

  /**
   * Retrieves all products.
   * @returns An Observable that emits an array of Product objects.
   */
  getProducts(): Observable<Product[]> {
    const headers = this.getDefaultHeaders();
    return this.handleLoader(
      this.httpClient.get<Product[]>(`${this.API_BASE_PATH}/products`, {
        headers,
      })
    );
  }

  /**
   * Retrieves a product by its ID.
   * @param id - The ID of the product.
   * @returns An Observable that emits a Product object.
   */
  getProductById(id: number): Observable<Product> {
    const headers = this.getDefaultHeaders();
    return this.handleLoader(
      this.httpClient.get<Product>(`${this.API_BASE_PATH}/products/${id}`, {
        headers,
      })
    );
  }

  /**
   * Retrieves all categories.
   * @returns An Observable that emits an array of Category objects.
   */
  getCategories(): Observable<Category[]> {
    const headers = this.getDefaultHeaders();
    return this.handleLoader(
      this.httpClient.get<Category[]>(
        `${this.API_BASE_PATH}/products/categories`,
        { headers }
      )
    );
  }

  /**
   * Retrieves products by category.
   * @param category - The category of the products.
   * @returns An Observable that emits an array of Product objects.
   */
  getProductsByCategory(category: string): Observable<Product[]> {
    const headers = this.getDefaultHeaders();
    return this.handleLoader(
      this.httpClient.get<Product[]>(
        `${this.API_BASE_PATH}/products/category/${category}`,
        {
          headers,
        }
      )
    );
  }

  /**
   * Retrieves carts by user ID.
   * @param userId - The ID of the user.
   * @returns An Observable that emits an array of cart objects.
   */
  getCartsByUserId(userId: number): Observable<any[]> {
    const headers = this.getDefaultHeaders();
    const params = new HttpParams().set('userId', userId.toString());
    return this.handleLoader(
      this.httpClient.get<any[]>(`${this.API_BASE_PATH}/carts`, {
        headers,
        params,
      })
    );
  }

  /**
   * Retrieves limited products.
   * @param limit - The maximum number of products to retrieve.
   * @returns An Observable that emits an array of Product objects.
   */
  getLimitedProducts(limit: number): Observable<Product[]> {
    const headers = this.getDefaultHeaders();
    const params = new HttpParams().set('limit', limit.toString());
    return this.handleLoader(
      this.httpClient.get<Product[]>(`${this.API_BASE_PATH}/products`, {
        headers,
        params,
      })
    );
  }

  /**
   * Adds a new product.
   * @param product - The product to add.
   * @returns An Observable that emits the added Product object.
   */
  addProduct(product: Product): Observable<Product> {
    const headers = this.getDefaultHeaders();
    return this.handleLoader(
      this.httpClient.post<Product>(`${this.API_BASE_PATH}/products`, product, {
        headers,
      })
    );
  }

  /**
   * Updates a product by its ID.
   * @param id - The ID of the product to update.
   * @param product - The updated product data.
   * @returns An Observable that emits the updated Product object.
   */
  updateProduct(id: number, product: Product): Observable<Product> {
    const headers = this.getDefaultHeaders();
    return this.handleLoader(
      this.httpClient.put<Product>(
        `${this.API_BASE_PATH}/products/${id}`,
        product,
        {
          headers,
        }
      )
    );
  }

  /**
   * Patches a product by its ID.
   * @param id - The ID of the product to patch.
   * @param product - The partial product data to patch.
   * @returns An Observable that emits the patched Product object.
   */
  patchProduct(id: number, product: Partial<Product>): Observable<Product> {
    const headers = this.getDefaultHeaders();
    return this.handleLoader(
      this.httpClient.patch<Product>(
        `${this.API_BASE_PATH}/products/${id}`,
        product,
        {
          headers,
        }
      )
    );
  }

  /**
   * Deletes a product by its ID.
   * @param id - The ID of the product to delete.
   * @returns An Observable that emits the deletion result.
   */
  deleteProduct(id: number): Observable<any> {
    const headers = this.getDefaultHeaders();
    return this.handleLoader(
      this.httpClient.delete<any>(`${this.API_BASE_PATH}/products/${id}`, {
        headers,
      })
    );
  }
}
