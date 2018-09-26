import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Rental } from './rental/shared/rental.model';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class RentalInMemoryService {

  private rentalsURL = 'api/rentals';

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) { }

  getRentals(): Observable<Rental[]> {
    return this.http.get<Rental[]>(this.rentalsURL)
      .pipe(
        tap(rentals => console.log('fetched rentals')),
        catchError(this.handleError('getRenatls', []))
      );
  }

  getRental(id: string): Observable<Rental> {
    const url = `${this.rentalsURL}/${id}`;
    return this.http.get<Rental>(url).pipe(
      tap(() => console.log(`fetched technology id=${id}`)),
      catchError(this.handleError<Rental>(`getRental id=${id}`))
    );
  }

  searchRentals(term: string): Observable<Rental[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Rental[]>(`${this.rentalsURL}/?name=${term}`).pipe(
      tap(() => console.log(`found rentals matching "${term}"`)),
      catchError(this.handleError<Rental[]>('searchRentals', []))
    );
  }

  addRental(rental: Rental): Observable<Rental> {
    return this.http.post<Rental>(this.rentalsURL, rental, httpOptions).pipe(
      tap((rent: Rental) => console.log(`added rental w/id=${rental.id}`)),
      catchError(this.handleError<Rental>(`addRental`))
    );
  }

  deleteRental(rental: Rental | number): Observable<Rental> {
    const id = typeof rental === 'number' ? rental : rental.id;
    const url = `${this.rentalsURL}/${id}`;
    return this.http.delete<Rental>(url, httpOptions).pipe(
      tap(() => console.log(`deleted rental id=${id}`)),
      catchError(this.handleError<Rental>('deleteRental'))
    );
  }

  updateRental(rental: Rental): Observable<any> {
    return this.http.put(this.rentalsURL, rental, httpOptions).pipe(
      tap(() => console.log(`updated rental id=${rental.id}`)),
      catchError(this.handleError<any>(`updateRental`))
    );
  }



}
