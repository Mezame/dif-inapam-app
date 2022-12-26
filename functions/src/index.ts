import * as functions from 'firebase-functions';
import { onCreateDocumentsSetDateStore } from './firestore/triggers/on-create-documents-set-date-store';
import { onCreateDocumentsSetReports } from './firestore/triggers/on-create-documents-set-reports';

let onCreateDocuments: [PromiseSettledResult<void>, PromiseSettledResult<void>];

export const helloWorld = functions.https.onRequest((_request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true });
  response.send('Hello from Firebase!');
});

exports.functions = functions.firestore
  .document('documents/{id}')
  .onCreate(async (snapshot, context) => {
    onCreateDocuments =
      (await Promise.allSettled([
        await onCreateDocumentsSetDateStore(snapshot, context),
        await onCreateDocumentsSetReports(snapshot, context),
      ])) || onCreateDocuments;
  });
