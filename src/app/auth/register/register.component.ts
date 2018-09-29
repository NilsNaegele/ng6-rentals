import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthInMemoryService } from '../../auth-in-memory.service';
import { NewUserService } from '../../common/services/new-user.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formData: any = {};
  errors: any[] = [];

  constructor(private userInMemoryService: AuthInMemoryService,
              private newUserService: NewUserService,
              private router: Router) { }

  ngOnInit() {
  }

  register() {
    if (this.formData.password !== this.formData.confirmPassword) {
      this.errors = [`Passwords don't match!`];
      return;
    }
    this.userInMemoryService.registerUser(this.formData).subscribe(
      (user: User) => {
        this.newUserService.savenewUsersId(user.id);
        this.router.navigate(['login', {registered: 'success'}]);
      },
      (errorResponse) => {
              this.errors = errorResponse.error.errors;
      });
  }

}
