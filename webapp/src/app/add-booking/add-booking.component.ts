import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookingFormComponent } from '../booking-form/booking-form.component';
import { Booking } from '../booking';  // Import the Booking interface
import { BookingService } from '../booking.service';  // Import the BookingService
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-booking',
  standalone: true,
  imports: [BookingFormComponent, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Add a New Booking</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <app-booking-form
            (formSubmitted)="addBooking($event)"
        ></app-booking-form>
      </mat-card-content>
    </mat-card>
  `,
  styles: ``,
})
export class AddBookingComponent {
  constructor(
      private router: Router,
      private bookingService: BookingService  // Use BookingService
  ) {}

  addBooking(booking: Booking) {
    this.bookingService.createBooking(booking).subscribe({
      next: () => {
        this.router.navigate(['/bookings']);  // Redirect to booking list after adding
      },
      error: (error) => {
        alert('Failed to create booking');
        console.error(error);
      },
    });
    this.bookingService.getBookings();  // Refresh the bookings list
  }
}
