import * as functions from 'firebase-functions';

let onWriteDocuments: any;

export const helloWorld = functions.https.onRequest((_request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true });
  response.send('Hello from Firebase!');
});

exports.functions = functions.firestore
  .document('documents/{id}')
  .onWrite(async (change, context) => {

    //const document = change.after.exists ? change.after.data() : null;

    onWriteDocuments =
      onWriteDocuments ||
      await (
        await import('./firestore-triggers/on-write-documents-set-date-store')
      ).default(change, context);
  });
