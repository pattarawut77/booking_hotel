import { Component, OnInit, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingFormComponent } from '../booking-form/booking-form.component';
import { Booking } from '../booking';
import { BookingService } from '../booking.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-edit-booking',
  standalone: true,
  imports: [BookingFormComponent, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Edit an Booking</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <app-booking-form
            [initialState]="booking()"
            (formSubmitted)="editBooking($event)"
        ></app-booking-form>
      </mat-card-content>
    </mat-card>
  `,
  styles: ``,
})
export class EditBookingComponent implements OnInit {
  booking = {} as WritableSignal<Booking>;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private bookingService: BookingService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }

    this.bookingService.getBooking(id!);
    this.booking = this.bookingService.booking$;
  }

  editBooking(booking: Booking) {
    this.bookingService
        .updateBooking(this.booking()._id || '', booking)
        .subscribe({
          next: () => {
            this.router.navigate(['/']);
          },
          error: (error) => {
            alert('Failed to update booking');
            console.error(error);
          },
        });
  }
}