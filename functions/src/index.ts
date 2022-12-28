import * as functions from 'firebase-functions';
import { onCreateAssistantCreateUser } from './firestore/triggers/on-create-assistant-create-user';
import { onCreateDocumentSetDateStore } from './firestore/triggers/on-create-document-set-date-store';
import { onCreateDocumentSetUpdateReport } from './firestore/triggers/on-create-document-set-update-report';
import { onDeleteAssistantDeleteUser } from './firestore/triggers/on-delete-assistant-delete-user';
import { onDeleteDocumentUpdateReport } from './firestore/triggers/on-delete-document-update-report';
import { onUpdateDocumentUpdateReport } from './firestore/triggers/on-update-document-update-report';

let onCreateDocument: PromiseSettledResult<void>[];
let onUpdateDocument: PromiseSettledResult<void>[];
let onDeleteDocument: PromiseSettledResult<void>[];
let onCreateAssistant: PromiseSettledResult<void>[];
let onDeleteAssistant: PromiseSettledResult<void>[];

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

exports.onDeleteDocument = functions.firestore
  .document('documents/{id}')
  .onDelete(async (snapshot, context) => {
    onDeleteDocument =
      (await Promise.allSettled([
        await onDeleteDocumentUpdateReport(snapshot, context),
      ])) || onDeleteDocument;

    return;
  });

exports.onCreateAssistant = functions.firestore
  .document('assistants/{id}')
  .onCreate(async (snapshot, context) => {
    onCreateAssistant =
      (await Promise.allSettled([
        await onCreateAssistantCreateUser(snapshot, context),
      ])) || onCreateAssistant;

    return;
  });

exports.onDeleteAssistant = functions.firestore
  .document('assistants/{id}')
  .onDelete(async (snapshot, context) => {
    onDeleteAssistant =
      (await Promise.allSettled([
        await onDeleteAssistantDeleteUser(snapshot, context),
      ])) || onDeleteAssistant;

    return;
  });
