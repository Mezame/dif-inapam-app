import { TestBed } from '@angular/core/testing';

import { DeleteAssistantsService } from './delete-assistants.service';

describe('DeleteAssistantsService', () => {
  let service: DeleteAssistantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: DeleteAssistantsService, useValue: {} }],
    });
    service = TestBed.inject(DeleteAssistantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
