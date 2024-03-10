import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoaderService } from '@mini-ecommerce/shared-services-security';
import { finalize } from 'rxjs/operators';

/**
 * Service for managing categories.
 */
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  /**
   * Subject that holds the currently selected category.
   */
  private selectedCategorySubject = new BehaviorSubject<string | null>(null);

  /**
   * Observable that emits the currently selected category.
   */
  selectedCategory$: Observable<string | null> =
    this.selectedCategorySubject.asObservable();

  constructor(private loaderService: LoaderService) {}

  /**
   * Handles the loader before and after executing the given observable.
   * @param observable The observable to handle the loader for.
   * @returns The observable with the loader handling.
   */
  private handleLoader<T>(observable: Observable<T>): Observable<T> {
    this.loaderService.showLoader();
    return observable.pipe(finalize(() => this.loaderService.hideLoader()));
  }

  /**
   * Sets the selected category.
   * @param category The category to set as selected.
   */
  setSelectedCategory(category: string): void {
    this.handleLoader(new Observable<void>());
    this.selectedCategorySubject.next(category);
  }

  /**
   * Gets the currently selected category.
   * @returns The currently selected category.
   */
  getSelectedCategory(): string | null {
    return this.selectedCategorySubject.value;
  }
}
