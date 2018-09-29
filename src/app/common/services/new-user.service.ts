import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewUserService {

  getnewUsersId() {
    return window.localStorage['newUsersId'];
  }

  savenewUsersId(id: number) {
    window.localStorage['newUsersId'] = id;
  }

  destroynewUsersId(): void {
    window.localStorage.removeItem('newUsersId');
  }
}
