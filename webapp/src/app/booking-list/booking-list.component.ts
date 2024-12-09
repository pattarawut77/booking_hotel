import { Component, OnInit, WritableSignal } from '@angular/core';
import { Booking } from '../booking';
import { BookingService } from '../booking.service';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-bookings-list',
  standalone: true,
  imports: [RouterModule, MatTableModule, MatButtonModule, MatCardModule],
  styles: [
    `
      table {
        width: 100%;

        button:first-of-type {
          margin-right: 1rem;
        }
      }
    `,
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Bookings List</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <table mat-table [dataSource]="bookings$()">
          <ng-container matColumnDef="col-customerName">
            <th mat-header-cell *matHeaderCellDef>Customer Name</th>
            <td mat-cell *matCellDef="let element">{{ element.customerName }}</td>
          </ng-container>
          <ng-container matColumnDef="col-roomType">
            <th mat-header-cell *matHeaderCellDef>Room Type</th>
            <td mat-cell *matCellDef="let element">{{ element.roomType }}</td>
          </ng-container>
          <ng-container matColumnDef="col-checkinDate">
            <th mat-header-cell *matHeaderCellDef>Check-in Date</th>
            <td mat-cell *matCellDef="let element">{{ element.checkinDate }}</td>
          </ng-container>
          <ng-container matColumnDef="col-checkoutDate">
            <th mat-header-cell *matHeaderCellDef>Check-out Date</th>
            <td mat-cell *matCellDef="let element">{{ element.checkoutDate }}</td>
          </ng-container>
          <ng-container matColumnDef="col-status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let element">{{ element.status }}</td>
          </ng-container>
          <ng-container matColumnDef="col-action">
            <th mat-header-cell *matHeaderCellDef>Action</th>
            <td mat-cell *matCellDef="let element">
              <button mat-raised-button [routerLink]="['edit/', element._id]">
                Edit
              </button>
              <button
                  mat-raised-button
                  color="warn"
                  (click)="deleteBooking(element._id || '')"
              >
                Delete
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" [routerLink]="['new']">
          Add a New Booking
        </button>
      </mat-card-actions>
    </mat-card>
  `,
})
export class BookingsListComponent implements OnInit {
  bookings$ = {} as WritableSignal<Booking[]>;  // Use Booking instead of Employee
  displayedColumns: string[] = [
    'col-customerName',
    'col-roomType',
    'col-checkinDate',
    'col-checkoutDate',
    'col-status',
    'col-action',
  ];

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.fetchBookings();
  }

  // Method to delete a booking
  deleteBooking(id: string): void {
    this.bookingService.deleteBooking(id).subscribe({
      next: () => this.fetchBookings(),
    });
  }

  // Fetch all bookings from the service
  private fetchBookings(): void {
    this.bookings$ = this.bookingService.bookings$;
    this.bookingService.getBookings();
  }
}
