import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Document } from '@features/documents/document.interface';
import { EMPTY, mergeMap, Observable, of } from 'rxjs';
import { DocumentStoreService } from '../store/document-store.service';

@Injectable({
  providedIn: 'any',
})
export class DocumentDetailResolverService implements Resolve<Document> {
  constructor(
    private documentStoreService: DocumentStoreService,
    private router: Router
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<Document> {
    const cardCode = route.paramMap.get('cardCode');

    if (!cardCode) return EMPTY;

    return this.documentStoreService.getDocumentByCardCode(cardCode).pipe(
      mergeMap((document) => {
        if (document?.cardCode) {
          return of(document);
        } else {
          this.router.navigate(['/home/oficios']);

          return EMPTY;
        }
      })
    );
  }
}
