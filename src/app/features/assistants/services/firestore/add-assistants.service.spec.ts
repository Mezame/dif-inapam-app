import { TestBed } from '@angular/core/testing';

import { AddAssistantsService } from './add-assistants.service';

describe('AddAssistantsService', () => {
  let service: AddAssistantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AddAssistantsService, useValue: {} }],
    });
    service = TestBed.inject(AddAssistantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
