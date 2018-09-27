import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { RentalModule } from './rental/rental.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';


const routes: Routes = [
  { path: '', redirectTo: '/rentals', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
    ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false}
    ),
    RentalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
