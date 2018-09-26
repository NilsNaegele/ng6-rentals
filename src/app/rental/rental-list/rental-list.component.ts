import { Component, OnInit } from '@angular/core';
import { Rental } from '../shared/rental.model';
import { RentalInMemoryService } from '../../rental-in-memory.service';
import { RentalService } from '../shared/rental.service';

@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.scss']
})
export class RentalListComponent implements OnInit {

  rentals: Rental[] = [];

  constructor(private rentalService: RentalInMemoryService) { }


  getRentals(): void {
    this.rentalService.getRentals().subscribe(rentals => this.rentals = rentals);
  }

  ngOnInit() {
    this.getRentals();
  }

}
