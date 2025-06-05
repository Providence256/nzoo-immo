import { Pipe, PipeTransform } from '@angular/core';
import { ConfirmationToken } from '@stripe/stripe-js';

@Pipe({
  name: 'payment',
  standalone: true,
})
export class PaymentPipe implements PipeTransform {
  transform(
    value: ConfirmationToken['payment_method_preview'],
    ...args: unknown[]
  ): unknown {
    if (value?.card) {
      const { brand, exp_month, exp_year, last4 } = value.card;

      const upperBrand = (brand || 'Card').toUpperCase();
      const masked = '**** **** ****';
      const formattedMonth = String(exp_month).padStart(2, '0');
      const formattedYear = String(exp_year).slice(-2);

      return ` ${upperBrand} ${masked} ${last4}, Exp: ${formattedMonth}/${formattedYear}`;
    } else {
      return 'Unknown Payment details';
    }
  }
}
