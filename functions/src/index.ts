import * as functions from 'firebase-functions';
import { Document } from './firestore-triggers/document';

let onWriteDocuments: any;

export const helloWorld = functions.https.onRequest((_request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true });
  response.send('Hello from Firebase!');
});

exports.functions = functions.firestore
  .document('documents/{id}')
  .onWrite(async (change, context) => {
    const isOnCreate = !change.before.exists && change.after.exists;
    //const isOnUpdate = change.before.exists && change.after.exists;
    const isOnDelete = change.before.exists && !change.after.exists;
    //const document = change.after.exists ? change.after.data() : null;
    const oldDocument = change.before.data() as Document;
    const oldDocumentCreateDate = new Date(oldDocument?.createDate);
    const oldDocumentMonth = oldDocumentCreateDate.getMonth() + 1;

    if (isOnCreate || (isOnDelete && oldDocumentMonth == 1)) {
      onWriteDocuments =
        onWriteDocuments ||
        (await (
          await import('./firestore-triggers/on-write-documents-set-date-store')
        ).default(change, context));
    }
  });
