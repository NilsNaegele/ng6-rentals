import { TestBed } from '@angular/core/testing';

import { RentalInMemoryService } from './rental-in-memory.service';

describe('RentalInMemoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RentalInMemoryService = TestBed.get(RentalInMemoryService);
    expect(service).toBeTruthy();
  });
});
