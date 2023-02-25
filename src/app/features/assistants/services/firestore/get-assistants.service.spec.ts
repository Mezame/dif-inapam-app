import { TestBed } from '@angular/core/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '@environments/environment';
import { Assistant } from '@features/assistants/assistant.interface';
import { of } from 'rxjs';
import { GetAssistantsService } from './get-assistants.service';

describe('GetAssistantsService', () => {
  let getAssistantsService: jasmine.SpyObj<GetAssistantsService>;

  beforeEach(() => {
    const getAssistantsServiceSpy = jasmine.createSpyObj(
      'GetAssistantsService',
      ['getAssistants']
    );

    TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
      ],
      providers: [
        { provide: GetAssistantsService, useValue: getAssistantsServiceSpy },
      ],
    });

    getAssistantsService = TestBed.inject(
      GetAssistantsService
    ) as jasmine.SpyObj<GetAssistantsService>;
  });

  it('should be created', () => {
    expect(getAssistantsService).toBeTruthy();
  });

  describe('#getAssistants', () => {
    let expectedAssistants: Assistant[];

    beforeEach(() => {
      expectedAssistants = [
        {
          name: 'Efrain López',
          email: 'assistant1@difinapam.mx',
          metadata: { id: '1', timestamp: '' },
        },
        {
          name: 'Sara González',
          email: 'assistant2@difinapam.mx',
          metadata: { id: '2', timestamp: '' },
        },
      ];
    });

    it('should return assistants', () => {
      getAssistantsService.getAssistants.and.returnValue(
        of(expectedAssistants)
      );

      getAssistantsService.getAssistants().subscribe({
        next: (assistants) =>
          expect(assistants.length)
            .withContext('should have array with at least one assistant')
            .toBeGreaterThan(0),
        error: () => fail,
      });
    });

    it('should be OK returning no assistants', () => {
      getAssistantsService.getAssistants.and.returnValue(of([]));

      getAssistantsService.getAssistants().subscribe({
        next: (assistants) =>
          expect(assistants.length)
            .withContext('should have empty assistants array')
            .toEqual(0),
        error: () => fail,
      });
    });
  });
});
