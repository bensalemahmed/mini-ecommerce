import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Represents a bank card component.
 */
@Component({
  selector: 'mini-ecommerce-bank-card',
  templateUrl: './bank-card.component.html',
  styleUrls: ['./bank-card.component.scss'],
})
export class BankCardComponent {
  /**
   * The card number input value.
   */
  @Input() cardNumber: string = '**** **** **** ****';

  /**
   * The expiration date input value.
   */
  @Input() expirationDate: string = 'MM/YY';

  /**
   * The CVV input value.
   */
  @Input() cvv: string = '***';

  /**
   * Event emitted when the card number changes.
   */
  @Output() cardNumberChange: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Event emitted when the expiration date changes.
   */
  @Output() expirationDateChange: EventEmitter<string> =
    new EventEmitter<string>();

  /**
   * Event emitted when the CVV changes.
   */
  @Output() cvvChange: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Handles the change event of the card number input.
   * @param event - The change event object.
   */
  onCardNumberChange(event: any): void {
    this.cardNumber = event.target.value;
    this.cardNumberChange.emit(this.cardNumber);
  }

  /**
   * Handles the change event of the expiration date input.
   * @param event - The change event object.
   */
  onExpirationDateChange(event: any): void {
    this.expirationDate = event.target.value;
    this.expirationDateChange.emit(this.expirationDate);
  }

  /**
   * Handles the change event of the CVV input.
   * @param event - The change event object.
   */
  onCvvChange(event: any): void {
    this.cvv = event.target.value;
    this.cvvChange.emit(this.cvv);
  }
}
