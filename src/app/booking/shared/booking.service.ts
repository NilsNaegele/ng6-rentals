import { Injectable } from '@angular/core';
import { RentalInMemoryService } from '../../rental-in-memory.service';
import { Rental } from '../../rental/shared/rental.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private rentalService: RentalInMemoryService) { }


  addBooking(rental: Rental): Observable<any> {
    return this.rentalService.updateRental(rental);
  }


}
