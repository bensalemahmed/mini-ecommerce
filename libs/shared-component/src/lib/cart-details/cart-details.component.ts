import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'libs/shared-services-api/src/lib/models/products';

/**
 * Represents the Cart Details component.
 */
@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss'],
})
export class CartDetailsComponent implements OnInit {
  activeIndex = 0;
  cartItems: Product[] = [];
  loading = true;
  fields = {
    cardnumber: '',
    cardholder: '',
    exp: '',
    cvc: '',
  };
  valid = false;
  items: any[] = [
    { label: 'View Products', command: () => this.updateActiveIndex(0) },
    { label: 'Cart Details', command: () => this.updateActiveIndex(1) },
    { label: 'Payment', command: () => this.updateActiveIndex(2) },
  ];

  form: FormGroup;

  /**
   * Constructs a new instance of the CartDetailsComponent.
   * @param cdr - The ChangeDetectorRef used for change detection.
   * @param formBuilder - The FormBuilder used for creating the form.
   */
  constructor(
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      cardNumber: ['', Validators.required],
      expiryDate: ['', Validators.required],
      cvv: ['', Validators.required],
    });
  }

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
    this.fetchCartItems();
  }

  /**
   * Fetches the cart items from local storage.
   */
  fetchCartItems(): void {
    const storedItems = localStorage.getItem('cart');
    this.cartItems = storedItems ? JSON.parse(storedItems) : [];
    this.loading = false;
  }

  /**
   * Updates the active index of the tab view.
   * @param index - The index to set as active.
   */
  updateActiveIndex(index: number): void {
    this.activeIndex = index;
  }

  /**
   * Moves to the previous step in the tab view.
   */
  prevStep(): void {
    this.activeIndex -= 1;
  }

  /**
   * Moves to the next step in the tab view.
   */
  nextStep(): void {
    this.activeIndex += 1;
  }

  /**
   * Removes a product from the cart.
   * @param product - The product to remove.
   */
  removeFromCart(product: Product): void {
    this.cartItems = this.cartItems.filter((item) => item.id !== product.id);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cdr.detectChanges();
  }

  /**
   * Checks if a product is in the cart.
   * @param productId - The ID of the product to check.
   * @returns True if the product is in the cart, false otherwise.
   */
  isInCart(productId: number): boolean {
    return this.cartItems.some((item) => item.id === productId);
  }

  /**
   * Calculates the total price of all items in the cart.
   * @returns The total price of all items in the cart.
   */
  calculateTotalPrice(): number {
    return +this.cartItems
      .reduce((total, item) => total + item.price, 0)
      .toFixed(2);
  }

  /**
   * Submits the payment form.
   */
  submitPaymentForm(): void {
    console.log('Payment form submitted!');
  }

  /**
   * Formats the card number for display.
   * @param number - The card number to format.
   * @returns The formatted card number.
   */
  formatCardNumber(number: string): string {
    return number
      .replace(/[^0-9]/gi, '')
      .slice(0, 16)
      .replace(/(.{4})/g, '$1 ')
      .trim();
  }

  /**
   * Formats the expiration date for display.
   * @param number - The expiration date to format.
   * @returns The formatted expiration date.
   */
  formatExp(number: string): string {
    return number
      .replace(/[^0-9]/gi, '')
      .slice(0, 4)
      .replace(/(.{2})/, '$1/')
      .trim();
  }

  /**
   * Handles the change event for the card number input.
   * @param value - The new value of the card number input.
   */
  onCardNumberChange(value: string): void {
    this.form.controls['cardNumber'].setValue(value);
  }

  /**
   * Handles the change event for the expiration date input.
   * @param value - The new value of the expiration date input.
   */
  onExpirationDateChange(value: string): void {
    this.form.controls['expiryDate'].setValue(value);
  }

  /**
   * Handles the change event for the CVV input.
   * @param value - The new value of the CVV input.
   */
  onCvvChange(value: string): void {
    this.form.controls['cvv'].setValue(value);
  }

  /**
   * Adjusts the quantity of a product in the cart.
   * @param product - The product to adjust the quantity for.
   * @param increment - True to increment the quantity, false to decrement.
   */
  adjustQuantity(product: Product, increment: boolean): void {
    const cartItem = this.cartItems.find((item) => item.id === product.id);

    if (cartItem) {
      cartItem.quantity = increment
        ? (cartItem.quantity ?? 0) + 1
        : (cartItem.quantity ?? 1) - 1;
      this.cartItems = this.cartItems.filter(
        (item) => item.quantity && item.quantity > 0
      );

      localStorage.setItem('cart', JSON.stringify(this.cartItems));
      this.cdr.detectChanges();
    }
  }

  /**
   * Adds a product to the cart.
   * @param product - The product to add to the cart.
   */
  addToCart(product: Product): void {
    if (!this.isInCart(product.id)) {
      product.quantity = 1;
      this.cartItems.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cdr.detectChanges();
  }
}
