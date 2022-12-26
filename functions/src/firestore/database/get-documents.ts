import * as functions from 'firebase-functions';
import { firestore } from '../../init';
import { Document } from '../../utils/document-utils';

export async function getDocuments(): Promise<Document[]> {
  try {
    const documents: Document[] = [];
    const collRef = firestore.collection('documents');
    const docRefs = await collRef.listDocuments();
    const docSnaps = await firestore.getAll(...docRefs);
    for (const docSnap of docSnaps) {
      if (docSnap.exists) {
        documents[documents.length] = docSnap.data() as Document;
      }
    }

    if (documents) {
      functions.logger.info('get documents successfuly');

      return documents;
    } else {
      functions.logger.info('could not get documents');

      return null as unknown as Document[];
    }
  } catch (error) {
    functions.logger.error(error);

    return null as unknown as Document[];
  }
}
