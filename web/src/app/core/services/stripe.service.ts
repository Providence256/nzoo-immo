import { Injectable } from '@angular/core';
import {
  loadStripe,
  Stripe,
  StripeCardElement,
  StripeElements,
  StripePaymentElement,
} from '@stripe/stripe-js';
import { environment } from '../../../environments/environment';
import { PaymentApiService } from '../api/payment-api.service';
import { catchError, firstValueFrom, map } from 'rxjs';
import { BookingApiService } from '../api/booking-api.service';
import { BookingData } from '../models/booking-data.model';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private stripePromise?: Promise<Stripe | null>;
  private stripe: Stripe | null = null;
  private elements?: StripeElements;
  private cardElement: StripeCardElement | null = null;
  private paymentElement?: StripePaymentElement;

  constructor(
    private paymentApiService: PaymentApiService,
    private bookingServiceApi: BookingApiService
  ) {
    this.stripePromise = loadStripe(environment.stripePublicKey);
  }

  getStripeInstance() {
    return this.stripePromise;
  }

  async initializeElements(clientSecret: string) {
    if (!this.elements) {
      const stripe = await this.getStripeInstance();
      if (stripe) {
        this.elements = stripe.elements({
          clientSecret: clientSecret,
        });
      } else {
        throw new Error('Stripe failed to load');
      }
    }

    return this.elements;
  }

  async checkAvalabilityAndPricing(data: any) {
    try {
      const response = await firstValueFrom(
        this.bookingServiceApi.checkAvalaibility(data).pipe(
          map((response) => response),
          catchError((error) => {
            console.log('Error checking availability:', error);
            throw error;
          })
        )
      );
      return response;
    } catch (error) {
      console.log('Error in checking availability');
      throw error;
    }
  }

  async createPaymentElement(clientSecret: string) {
    if (!this.paymentElement) {
      const elements = await this.initializeElements(clientSecret);
      if (elements) {
        this.paymentElement = elements.create('payment');
      } else {
        throw new Error('Stripe Elements failed to initialize');
      }
    }

    return this.paymentElement;
  }

  async createBookingWithPaymentIntent(data: any) {
    try {
      const response = await firstValueFrom(
        this.paymentApiService.createPaymentIntent(data).pipe(
          map((response) => response),
          catchError((error) => {
            console.log('Error creating booking with payment intent:', error);
            throw error;
          })
        )
      );
      return response;
    } catch (error) {
      console.log('Error in Creating Booking with Payment');
      throw error;
    }
  }

  async createConfirmationToken(clientSecret: string) {
    const stripe = await this.getStripeInstance();
    const elements = await this.initializeElements(clientSecret);
    const result = await elements.submit();

    if (result.error) throw new Error(result.error.message);
    if (stripe) {
      return await stripe.createConfirmationToken({ elements });
    } else {
      throw new Error('Stripe not available');
    }
  }

  async createBookingAndPay(data: any) {
    try {
      const response = await firstValueFrom(
        this.paymentApiService.createBookingAndPay(data).pipe(
          map((response) => response),
          catchError((error) => {
            console.error(
              'Error creating booking and processing payment:',
              error
            );
            throw new Error(
              `Booking and payment failed: ${error.message || 'Unknown error'}`
            );
          })
        )
      );
      return response;
    } catch (error) {
      console.error('Error in createBookingAndPay:', error);
      throw error;
    }
  }

  async createBookingAndProcessPayment(bookingData: BookingData) {
    try {
      const result = await this.createBookingWithPaymentIntent(bookingData);
      if (result && result.clientSecret) {
        const elements = await this.initializeElements(result.clientSecret);
        const paymentElement = await this.createPaymentElement(
          result.clientSecret
        );

        //this.stripe = await this.getStripeInstance();

        return {
          clientSecret: result.clientSecret,
          paymentElement,
          elements,
          booking: result,
        };
      } else {
        throw new Error('Invalid response from payment API');
      }
    } catch (error) {
      console.error('Error in creating booking and processing payment:', error);
      throw error;
    }
  }

  disposeElements() {
    this.elements = undefined;
    this.paymentElement = undefined;
  }
}
