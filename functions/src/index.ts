import * as functions from 'firebase-functions';
import { onCreateDocumentSetDateStore } from './firestore/triggers/on-create-document-set-date-store';
import { onCreateDocumentSetUpdateReport } from './firestore/triggers/on-create-document-set-update-report';
import { onUpdateDocumentUpdateReport } from './firestore/triggers/on-update-document-update-report';

let onCreateDocument: PromiseSettledResult<void>[];
let onUpdateDocument: PromiseSettledResult<void>[];

export const helloWorld = functions.https.onRequest((_request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true });
  response.send('Hello from Firebase!');
});

exports.onCreateDocument = functions.firestore
  .document('documents/{id}')
  .onCreate(async (snapshot, context) => {
    onCreateDocument =
      (await Promise.allSettled([
        await onCreateDocumentSetDateStore(snapshot, context),
        await onCreateDocumentSetUpdateReport(snapshot, context),
      ])) || onCreateDocument;

    return;
  });

exports.onUpdateDocument = functions.firestore
  .document('documents/{id}')
  .onUpdate(async (change, context) => {
    onUpdateDocument =
      (await Promise.allSettled([
        await onUpdateDocumentUpdateReport(change, context),
      ])) || onUpdateDocument;

    return;
  });
