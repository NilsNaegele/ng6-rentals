import { Component, OnDestroy } from '@angular/core';
import { JwtService } from './common/services/jwt.service';
import { NewUserService } from './common/services/new-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'ng6-rentals';

  constructor(private jwtService: JwtService,
              private newUserService: NewUserService) {}

  ngOnDestroy() {
    this.jwtService.destroyToken();
    this.newUserService.destroynewUsersId();
  }
}
