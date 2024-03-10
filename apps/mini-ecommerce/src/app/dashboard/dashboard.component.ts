import { Component } from '@angular/core';
import { CategoryService } from '@mini-ecommerce/shared-services-api';

/**
 * Represents the DashboardComponent of the mini-ecommerce application.
 */
@Component({
  selector: 'mini-ecommerce-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(private _categoryService: CategoryService) {}

  /**
   * Represents the selected category.
   */
  selectedCategory: string | null = null;

  /**
   * Handles the event when a category is selected.
   * @param category - The selected category.
   */
  onCategorySelected(category: string): void {
    this.selectedCategory = category;
    this._categoryService.setSelectedCategory(this.selectedCategory);
  }
}
