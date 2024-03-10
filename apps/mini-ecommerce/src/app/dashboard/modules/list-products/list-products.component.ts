import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductDetailsComponent } from '@mini-ecommerce/shared-component';
import {
  CategoryService,
  ProductService,
} from '@mini-ecommerce/shared-services-api';
import { Product } from 'libs/shared-services-api/src/lib/models/products';
import { DialogService } from 'primeng/dynamicdialog';
import { of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

/**
 * Component for listing and filtering products.
 */
@Component({
  selector: 'mini-ecommerce-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements OnInit {
  /**
   * Array of all products.
   */
  products: Product[] = [];

  /**
   * Array of products after filtering and sorting.
   */
  sortedProducts: Product[] = [];

  /**
   * Object to track whether to show full descriptions for each product.
   */
  showFullDescriptions: { [key: number]: boolean } = {};

  /**
   * The selected sort option ('asc' or 'desc').
   */
  selectedSortOption: string = 'asc';

  /**
   * The selected category for filtering products.
   */
  selectedCategory: string | null = null;

  /**
   * The search form group.
   */
  searchForm: FormGroup = this.fb.group({
    search: [''],
  });

  /**
   * The search value entered by the user.
   */
  searchValue: string = '';

  constructor(
    private _productService: ProductService,
    private cdr: ChangeDetectorRef,
    private _categoryService: CategoryService,
    private dialogService: DialogService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Subscribe to changes in the selected category
    this._categoryService.selectedCategory$.subscribe((category) => {
      this.selectedCategory = category;
      this.initializeProducts();
    });

    // Subscribe to changes in the search input value
    this.searchForm
      .get('search')
      ?.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((value) => {
          this.searchValue = value;
          this.filterProducts();
          return of(null);
        })
      )
      .subscribe();
  }

  /**
   * Initializes the list of products based on the selected category.
   */
  initializeProducts(): void {
    if (this.selectedCategory === null) {
      // Get all products
      this._productService.getProducts().subscribe((data) => {
        this.products = data || [];
        this.sortedProducts = [...this.products];
        this.filterProducts();
      });
    } else {
      // Get products by category
      this._productService
        .getProductsByCategory(this.selectedCategory)
        .subscribe((data) => {
          this.products = data || [];
          this.sortedProducts = [...this.products];
          this.filterProducts();
        });
    }
  }

  /**
   * Filters the products based on the selected category and search value.
   */
  filterProducts() {
    let filteredProducts = this.products;

    if (this.selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === this.selectedCategory
      );
    }

    if (this.searchValue) {
      const searchLowerCase = this.searchValue.toLowerCase();
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchLowerCase)
      );
    }

    this.sortFilteredProducts(filteredProducts);
  }

  /**
   * Sorts the filtered products based on the selected sort option.
   * @param filteredProducts The filtered products to be sorted.
   */
  sortFilteredProducts(filteredProducts: Product[]) {
    if (this.selectedSortOption === 'asc') {
      this.sortedProducts = [...filteredProducts].sort(
        (a, b) => a.price - b.price
      );
    } else if (this.selectedSortOption === 'desc') {
      this.sortedProducts = [...filteredProducts].sort(
        (a, b) => b.price - a.price
      );
    } else {
      this.sortedProducts = [...filteredProducts];
    }
  }

  /**
   * Shows the full description for a product.
   * @param productId The ID of the product.
   */
  showFullDescription(productId: number): void {
    this.showFullDescriptions[productId] = true;
  }

  /**
   * Hides the full description for a product.
   * @param productId The ID of the product.
   */
  hideFullDescription(productId: number): void {
    this.showFullDescriptions[productId] = false;
  }

  /**
   * Checks if the full description is visible for a product.
   * @param productId The ID of the product.
   * @returns True if the full description is visible, false otherwise.
   */
  isFullDescriptionVisible(productId: number): boolean {
    return this.showFullDescriptions[productId];
  }

  /**
   * Opens the product details dialog.
   * @param product The product to view details for.
   */
  viewProductDetails(product: any) {
    const ref = this.dialogService.open(ProductDetailsComponent, {
      header: 'Product Details',
      width: '70%',
      data: {
        product,
      },
    });
  }

  /**
   * Adds a product to the cart.
   * @param product The product to add to the cart.
   */
  addToCart(product: Product): void {
    let cartItems: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');

    if (!this.isInCart(product.id)) {
      cartItems.push(product);
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
    this.cdr.detectChanges();
  }

  /**
   * Removes a product from the cart.
   * @param product The product to remove from the cart.
   */
  removeFromCart(product: Product): void {
    let cartItems: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const index = cartItems.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      cartItems.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cartItems));
      this.cdr.detectChanges();
    }
  }

  /**
   * Checks if a product is already in the cart.
   * @param productId The ID of the product.
   * @returns True if the product is in the cart, false otherwise.
   */
  isInCart(productId: number): boolean {
    let cartItems: Product[] =
      JSON.parse(localStorage.getItem('cart') || '[]') || [];
    return cartItems.some((item) => item.id === productId);
  }

  /**
   * Sorts the products based on the selected sort option.
   */
  sortProducts(): void {
    this.filterProducts();
  }
}
