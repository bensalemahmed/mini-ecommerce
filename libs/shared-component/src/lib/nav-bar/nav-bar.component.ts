import { Component } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { CartDetailsComponent } from '../cart-details/cart-details.component';

/**
 * Represents the navigation bar component for the mini ecommerce application.
 */
@Component({
  selector: 'mini-ecommerce-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  /**
   * Creates an instance of NavBarComponent.
   * @param dialogService - The dialog service used to open the cart modal.
   */
  constructor(private dialogService: DialogService) {}

  /**
   * Opens the cart modal dialog.
   */
  openCartModal(): void {
    const ref = this.dialogService.open(CartDetailsComponent, {
      header: 'Cart Details',
      width: '70%',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
    });
  }

  /**
   * Gets the number of items in the cart.
   * @returns The number of items in the cart.
   */
  getCartItemCount(): number {
    let cartItems: any[] = JSON.parse(localStorage.getItem('cart') || '[]');
    return cartItems.length;
  }
}
