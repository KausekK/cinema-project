import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PaymentInfo } from '../../common/payment-info';
import { CheckoutService } from '../../services/checkout.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CinemaValidators } from '../../validators/cinema-validators';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { DataService } from '../../services/shared/data.service';
import { SeatsService } from '../../services/seats.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;

  stripe: Stripe | null = null; 
  cardElement: any;
  displayError: any;
  totalPrice: number =  0 
  isDisabled: boolean = false;
  showId: number = 0;
  selectedSeatsNumbers: number [] = [];

  constructor(private checkoutService: CheckoutService, 
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private seatsService: SeatsService
  ) {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2), CinemaValidators.notOnlyWhitespace]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2), CinemaValidators.notOnlyWhitespace]),
        email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      })
    });
  }

  async ngOnInit(): Promise<void> {
    // Zainicjalizuj Stripe asynchronicznie
    this.stripe = await loadStripe(environment.stripePublishableKey);
    if (this.stripe) {
      this.setupStripePaymentForm();
    } else {
      console.error("Stripe couldn't be initialized.");
    }
    this.dataService.totalPrice$.subscribe(price => (this.totalPrice = price));
    this.dataService.selectedSeatsNumbers$.subscribe(seats => (this.selectedSeatsNumbers = seats));
    this.dataService.showId$.subscribe(id => (this.showId = id))

   
  }

  setupStripePaymentForm() {
    if (!this.stripe) {
      console.error("Stripe is not initialized.");
      return;
    }

    // Pobierz elementy Stripe
    const elements = this.stripe.elements();

    // Utwórz element karty
    this.cardElement = elements.create('card', {hidePostalCode: true});
    this.cardElement.mount('#card-element');

    // Obsługa błędów związanych z płatnością
    this.cardElement.on('change', (event: any) => {
      this.displayError = document.getElementById('card-errors');

      if (event.complete) {
        this.displayError.textContent = "";
      } else if (event.error) {
        this.displayError.textContent = event.error.message;
      }
    });
  }

  onSubmit() {
    if (!this.stripe || !this.cardElement) {
      console.error('Stripe or Card Element is not initialized');
      return;
    }

    const paymentInfo: PaymentInfo = {
      amount: Math.round(this.totalPrice * 100), 
      currency: 'PLN',
      receiptEmail: this.checkoutFormGroup.get('customer.email')?.value
    };

    this.isDisabled = true;
    this.checkoutService.createPaymentIntent(paymentInfo).subscribe(
      (paymentIntentResponse) => {
        this.stripe!.confirmCardPayment(paymentIntentResponse.client_secret,
          {
            payment_method: {
              card: this.cardElement,
              billing_details: {
                name: `${this.checkoutFormGroup.get('customer.firstName')?.value} ${this.checkoutFormGroup.get('customer.lastName')?.value}`,
                email: this.checkoutFormGroup.get('customer.email')?.value
              }
            }
          }).then((result: any) => {
            if (result.error) {
              alert(`There was an error: ${result.error.message}`);
              this.isDisabled = false;
            } else {
              console.log("Payment successful");
              alert("Payment was successful. Enjoy your movie!");
              // Możesz dodać tutaj dodatkową logikę, np. zapisanie zamówienia w bazie danych
              this.reserveSeats();

            }
          });
      },
      error => {
        console.error('Error creating payment intent', error);
        this.isDisabled = false;
      }
    );
  }

  reserveSeats(): void {
    this.seatsService.addAvailableSeats(this.showId, this.selectedSeatsNumbers).subscribe(
      response => {
        console.log('Seats added successfully');
      },
      error => {
        console.error('Error adding seats');
      }
    );
  }
  get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }
}
