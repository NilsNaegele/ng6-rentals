import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NewUserService } from './../../common/services/new-user.service';
import { AuthInMemoryService } from '../../auth-in-memory.service';
import { User } from '../shared/user.model';
import { JwtService } from '../../common/services/jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User;
  loginForm: FormGroup;
  errors: any[] = [];
  notifyMessage = '';

  constructor(private fb: FormBuilder,
              private userInMemoryService: AuthInMemoryService,
              private jwtService: JwtService,
              private newUserService: NewUserService,
              private router: Router,
              private route: ActivatedRoute) { }

  login() {
    this.user = null;
    this.userInMemoryService.getUsers().subscribe(
      (users) => {
        users.filter(user => {
          if (user.email === this.loginForm.value.email &&
              user.password === this.loginForm.value.password) {
            this.user = user;
          }
        });
        if (this.user) {
          this.jwtService.saveToken('UserAuthenticated');
          this.newUserService.savenewUsersId(this.user.id);
          this.router.navigate(['/rentals']);
        } else {
          this.errors.push('No user exists with these credentials.');
        }
      },
      (errorResponse) => {
        this.errors = errorResponse.errors.error;
      });

  }

  ngOnInit() {
    this.createForm();

    this.route.params.subscribe((params) => {
      if (params['registered'] === 'success') {
        this.notifyMessage = 'You have been successfully registered, you can login now.';
      }
    });
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required,
                   Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      password: ['', [Validators.required]]
    });
  }

  isInvalidInput(fieldName: string): boolean {
    return this.loginForm.controls[fieldName].invalid &&
    (this.loginForm.controls[fieldName].dirty || this.loginForm.controls[fieldName].touched);
  }

  isRequired(fieldName: string): boolean {
    return this.loginForm.controls[fieldName].errors.required;
  }

}
