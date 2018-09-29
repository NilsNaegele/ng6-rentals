import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { NewUserService } from './common/services/new-user.service';
import { Rental } from './rental/shared/rental.model';
import { JwtService } from './common/services/jwt.service';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './auth/shared/user.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthInMemoryService {

  private usersURL = 'api/users';

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  constructor(private http: HttpClient,
              private jwtService: JwtService,
              private newUserService: NewUserService,
              private router: Router) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersURL)
      .pipe(
        tap(rentals => console.log('fetched users')),
        catchError(this.handleError('getRenatls', []))
      );
  }


  getUser(id: string): Observable<User> {
    const url = `${this.usersURL}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(() => console.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<User[]>(`${this.usersURL}/?name=${term}`).pipe(
      tap(() => console.log(`found users matching "${term}"`)),
      catchError(this.handleError<User[]>('searchUsers', []))
    );
  }

  registerUser(newUser: User): Observable<User> {
    return this.http.post<Rental>(this.usersURL, newUser, httpOptions).pipe(
      tap((user: User) => console.log(`added user w/id=${user.id}`)),
      catchError(this.handleError<User>(`addUser`))
    );
  }

  deleteUser(user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.usersURL}/${id}`;
    return this.http.delete<User>(url, httpOptions).pipe(
      tap(() => console.log(`deleted user id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(this.usersURL, user, httpOptions).pipe(
      tap(() => console.log(`updated user id=${user.id}`)),
      catchError(this.handleError<any>(`updateUser`))
    );
  }

  isAuthenticated(): boolean {
    const token = this.jwtService.getToken();
    if (token) {
      return true;
    }
    return false;
  }

  logout() {
    this.jwtService.destroyToken();
    this.newUserService.destroynewUsersId();
    this.router.navigate(['/login']);
  }

}
