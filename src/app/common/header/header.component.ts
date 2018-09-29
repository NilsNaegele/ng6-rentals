import { Component, OnInit } from '@angular/core';

import { AuthInMemoryService } from '../../auth-in-memory.service';
import { User } from '../../auth/shared/user.model';
import { NewUserService } from './../services/new-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User;

  constructor(public authInMemoryService: AuthInMemoryService,
              private newUserService: NewUserService) { }

  ngOnInit() {
    const isAuthenticated = this.authInMemoryService.isAuthenticated();
    if (isAuthenticated) {
      const id = this.newUserService.getnewUsersId();
      if (id) {
      this.authInMemoryService.getUser(id).subscribe(
        (user) => {
          if (user) {
          this.user = user;
          }
        });
    }
    }
  }

  logout() {
    this.authInMemoryService.logout();
  }

}
