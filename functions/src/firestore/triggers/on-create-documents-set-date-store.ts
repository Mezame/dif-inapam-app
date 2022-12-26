import * as functions from 'firebase-functions';
import { setDateStore } from '../database/set-date-store';
import { DateStore, Document, getDateStore } from '../../utils/document-utils';
import { getDocuments } from '../database/get-documents';

export async function onCreateDocumentsSetDateStore(
  snapshot: functions.firestore.QueryDocumentSnapshot,
  _context: functions.EventContext<{
    id: string;
  }>
) {
  try {
    const document = snapshot.data();
    const documentCreateDate = new Date(document.createDate) as Date;
    const documentYear = documentCreateDate.getFullYear().toString() as string;
    const documentMonthNumber = (
      documentCreateDate.getMonth() + 1
    ).toString() as string;
    const documents = (await getDocuments()) as Document[];
    let oldDocuments = documents.filter(
      (oldDocument) => oldDocument.cardCode != document.cardCode
    ) as Document[];
    oldDocuments =
      oldDocuments.length >= 1 ? oldDocuments : (null as unknown as Document[]);

    if (!oldDocuments) {
      const documentMonthWord = documentCreateDate.toLocaleDateString('es-MX', {
        month: 'long',
      }) as string;
      const dateStore = {
        months: {
          [documentYear]: {
            numbers: [documentMonthNumber],
            words: [documentMonthWord],
          },
        },
        years: [documentYear],
      };

      await setDateStore(dateStore);

      return;
    }
    const dateStore = getDateStore(oldDocuments) as DateStore;

    if (dateStore.months[documentYear].numbers.includes(documentMonthNumber)) {
      functions.logger.info(
        'document month and year already exist in dateStore'
      );
      
      return;
    }

    await setDateStore(dateStore);

    return;
  } catch (error) {
    functions.logger.error(error);

    return;
  }
}
