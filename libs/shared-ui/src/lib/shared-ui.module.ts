import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankCardComponent } from './bank-card/bank-card.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  imports: [CommonModule],
  exports: [BankCardComponent, SpinnerComponent],
  declarations: [BankCardComponent, SpinnerComponent],
})
export class SharedUiModule {}
