import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from '@mini-ecommerce/shared-services-api';

/**
 * Represents the side bar component of the mini ecommerce application.
 */
@Component({
  selector: 'mini-ecommerce-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  /**
   * The list of categories available for filtering products.
   */
  categories: string[] = [];

  /**
   * The currently selected category for filtering products.
   */
  selectedCategory: string | null = null;

  /**
   * Indicates whether the sidebar is open or closed.
   */
  isSidebarOpen = false;

  /**
   * Event emitter for when a category is selected.
   */
  @Output() categorySelected = new EventEmitter<string>();

  /**
   * Creates an instance of SideBarComponent.
   * @param _productService The product service used to fetch categories.
   */
  constructor(private _productService: ProductService) {}

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * Fetches the categories from the product service.
   */
  ngOnInit(): void {
    this._productService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  /**
   * Filters products by the specified category.
   * @param category The category to filter by.
   */
  filterByCategory(category: string): void {
    console.log(`Filter products by category: ${category}`);
    this.selectedCategory = category;
    this.categorySelected.emit(category);
  }

  /**
   * Toggles the sidebar between open and closed states.
   */
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
