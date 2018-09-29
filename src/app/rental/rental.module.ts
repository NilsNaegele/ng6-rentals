import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { NgPipesModule } from 'ngx-pipes';
import { MapModule } from '../common/map/map.module';
import { Daterangepicker } from 'ng2-daterangepicker';
import { RentalComponent } from './rental.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { RentalDetailBookingComponent } from './rental-detail/rental-detail-booking/rental-detail-booking.component';

import { UpperCasePipe } from '../common/pipes/upper-case.pipe';
import { AuthGuard } from '../auth/shared/auth.guard';

const routes: Routes = [
  { path: 'rentals', component: RentalComponent,
  children: [
    { path: '', component: RentalListComponent },
    { path: ':rentalId', component: RentalDetailComponent, canActivate: [AuthGuard] }
  ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MapModule,
    NgPipesModule,
    FormsModule,
    Daterangepicker
  ],
  declarations: [
    RentalComponent,
    RentalListComponent,
    RentalListItemComponent,
    RentalDetailComponent,
    UpperCasePipe,
    RentalDetailBookingComponent
  ]
})
export class RentalModule { }
