import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Rental } from './rental.model';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private rentalURL = '/api/v1/rentals';

  constructor(private http: HttpClient) {}

  public getRentalById(rentalId: string): Observable<any> {
    return this.http.get(`${this.rentalURL}/${rentalId}`);
  }

  public getRentals(): Observable<any> {
    return this.http.get(this.rentalURL);
  }

}
