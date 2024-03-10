import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Product } from 'libs/shared-services-api/src/lib/models/products';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

/**
 * Component for displaying product details.
 */
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  /**
   * The product to display.
   */
  @Input() product: any;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private cdr: ChangeDetectorRef
  ) {}

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
    this.product = this.config.data.product;
  }

  /**
   * Returns an array of length equal to the rating of the product.
   * Each element in the array represents a star in the rating.
   * @returns An array of length equal to the rating of the product.
   */
  getRatingArray(): any[] {
    return Array(Math.floor(this.product.rating.rate)).fill(0);
  }

  /**
   * Adds the product to the cart.
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
   * Removes the product from the cart.
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
   * Checks if the product is already in the cart.
   * @param productId The ID of the product to check.
   * @returns True if the product is in the cart, false otherwise.
   */
  isInCart(productId: number): boolean {
    let cartItems: Product[] =
      JSON.parse(localStorage.getItem('cart') || '[]') || [];
    return cartItems.some((item) => item.id === productId);
  }

  /**
   * Closes the dialog.
   */
  close() {
    this.ref.close();
  }
}
