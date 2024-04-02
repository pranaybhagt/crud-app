import { TestBed } from '@angular/core/testing';

import { BookigServiceService } from './bookig-service.service';

describe('BookigServiceService', () => {
  let service: BookigServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookigServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
