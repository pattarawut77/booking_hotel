import { Component, effect, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Booking } from '../booking';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
  ],
  styles: [
    `
      .booking-form {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 2rem;
      }
      .mat-mdc-radio-button ~ .mat-mdc-radio-button {
        margin-left: 16px;
      }
      .mat-mdc-form-field {
        width: 100%;
      }
    `,
  ],
  template: `
    <form
      class="booking-form"
      autocomplete="off"
      [formGroup]="bookingForm"
      (submit)="submitForm()"
    >
      <mat-form-field>
        <mat-label>Customer Name</mat-label>
        <input matInput placeholder="Customer Name" formControlName="customerName" required />
        <mat-error *ngIf="customerName.invalid">
          Customer name must be at least 3 characters long.
        </mat-error>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Room Type</mat-label>
        <input
          matInput
          placeholder="Room Type"
          formControlName="roomType"
          required
        />
        <mat-error *ngIf="roomType.invalid">
          Room type must be at least 3 characters long.
        </mat-error>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Check-in Date</mat-label>
        <input
          matInput
          type="date"
          formControlName="checkinDate"
          required
        />
        <mat-error *ngIf="checkinDate.invalid">
          Check-in date is required.
        </mat-error>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Check-out Date</mat-label>
        <input
          matInput
          type="date"
          formControlName="checkoutDate"
          required
        />
        <mat-error *ngIf="checkoutDate.invalid">
          Check-out date is required.
        </mat-error>
      </mat-form-field>

      <mat-radio-group formControlName="status" aria-label="Select Booking Status">
        <mat-radio-button name="status" value="confirmed" required>Confirmed</mat-radio-button>
        <mat-radio-button name="status" value="pending">Pending</mat-radio-button>
        <mat-radio-button name="status" value="cancelled">Cancelled</mat-radio-button>
      </mat-radio-group>
      
      <button
        mat-raised-button
        color="primary"
        type="submit"
        [disabled]="bookingForm.invalid"
      >
        Add Booking
      </button>
    </form>
  `,
})
export class BookingFormComponent {
  @Input() initialState: Booking | undefined;

  @Output() formValuesChanged = new EventEmitter<Booking>();
  @Output() formSubmitted = new EventEmitter<Booking>();

  bookingForm = this.formBuilder.group({
    customerName: ['', [Validators.required, Validators.minLength(3)]],
    roomType: ['', [Validators.required, Validators.minLength(3)]],
    checkinDate: ['', [Validators.required]],
    checkoutDate: ['', [Validators.required]],
    status: ['confirmed', [Validators.required]],
  });

  constructor(private formBuilder: FormBuilder) {
    // Automatically set initial values if any
    effect(() => {
      if (this.initialState) {
        this.bookingForm.setValue({
          customerName: this.initialState.customerName || '',
          roomType: this.initialState.roomType || '',
          checkinDate: this.initialState.checkinDate || '',
          checkoutDate: this.initialState.checkoutDate || '',
          status: this.initialState.status || 'confirmed',
        });
      }
    });
  }

  get customerName() {
    return this.bookingForm.get('customerName')!;
  }
  get roomType() {
    return this.bookingForm.get('roomType')!;
  }
  get checkinDate() {
    return this.bookingForm.get('checkinDate')!;
  }
  get checkoutDate() {
    return this.bookingForm.get('checkoutDate')!;
  }
  get status() {
    return this.bookingForm.get('status')!;
  }

  submitForm() {
    this.formSubmitted.emit(this.bookingForm.value as Booking);
  }
}
