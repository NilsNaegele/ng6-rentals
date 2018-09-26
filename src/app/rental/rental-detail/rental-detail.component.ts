import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { RentalInMemoryService } from '../../rental-in-memory.service';
import { Rental } from '../shared/rental.model';

@Component({
  selector: 'app-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.scss']
})
export class RentalDetailComponent implements OnInit {
  rental: Rental;

  constructor(private route: ActivatedRoute,
              private rentalService: RentalInMemoryService,
              private location: Location) { }

  ngOnInit() {
    this.getRental();
  }

  getRental(): void  {
    const id = this.route.snapshot.paramMap.get('rentalId');
    this.rentalService.getRental(id).subscribe(rental => this.rental = rental);
  }

  goBack(): void {
    this.location.back();
  }

}
