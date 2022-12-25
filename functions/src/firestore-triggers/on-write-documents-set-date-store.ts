import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as functions from 'firebase-functions';
import { DateStore } from './date-store';
import { Document } from './document';

const app = initializeApp();
const firestore = getFirestore(app);

export default async (
  change: functions.Change<functions.firestore.DocumentSnapshot>,
  _context: functions.EventContext<{
    id: string;
  }>
) => {
  try {
    const documents = await getDocuments();

    if (!documents) {
      const document = change.after.exists ? change.after.data() : null;

      if (document) {
        const documentCreateDate = new Date(document.createDate) as Date;
        const documentYear = documentCreateDate
          .getFullYear()
          .toString() as string;
        const documentMonthNumber = (
          documentCreateDate.getMonth() + 1
        ).toString() as string;
        const documentMonthWord = documentCreateDate.toLocaleDateString(
          'es-MX',
          {
            month: 'long',
          }
        ) as string;
        const dateStore = {
          months: {
            [documentYear]: {
              numbers: [documentMonthNumber],
              words: [documentMonthWord],
            },
          },
          years: [documentYear],
        };

        setDateStore(dateStore);
      }
    } else {
      let dateStore = {} as DateStore;
      let documentsMonths = {} as DateStore['months'];
      const documentsYears = getDocumentsYears(documents);

      documentsYears.forEach((docYear) => {
        const months = getDocumentsMonths(documents, docYear);

        documentsMonths = {
          ...documentsMonths,
          [docYear]: { numbers: months.numbers, words: months.words },
        };
      });

      dateStore = {
        months: documentsMonths,
        years: documentsYears,
      };

      setDateStore(dateStore);
    }
  } catch (error) {
    functions.logger.error(error);

    return;
  }
};

async function getDocuments(): Promise<Document[]> {
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

async function setDateStore(dateStore: DateStore) {
  try {
    const docRef = firestore.doc('documentUtils/dateStore');

    await docRef.set(dateStore);

    functions.logger.info('set dateStore successfully');
  } catch (error) {
    functions.logger.info('could not set dateStore');
  }
}

function getDocumentsYears(documents: Document[]): string[] {
  const years: string[] = [];

  documents.forEach((document) => {
    const documentCreateDate = new Date(document.createDate);
    const documentYear = documentCreateDate.getFullYear().toString();

    if (!years.includes(documentYear)) {
      years[years.length] = documentYear;
    }
  });

  years.sort((a, b) => parseInt(a) - parseInt(b));

  return years;
}

function getDocumentsMonths(
  documents: Document[],
  year: string
): { numbers: string[]; words: string[] } {
  const months: { numbers: string[]; words: string[] } = {
    numbers: [],
    words: [],
  };

  documents.sort((a, b) => Date.parse(a.createDate) - Date.parse(b.createDate));

  documents.forEach((document) => {
    const documentCreateDate = new Date(document.createDate);
    const documentMonthNumber = (documentCreateDate.getMonth() + 1).toString();
    const documentMonthWord = documentCreateDate.toLocaleDateString('es-MX', {
      month: 'long',
    });
    const documentYear = documentCreateDate.getFullYear().toString();

    if (!months.numbers.includes(documentMonthNumber) && year == documentYear) {
      months.numbers[months.numbers.length] = documentMonthNumber;
    }

    if (!months.words.includes(documentMonthWord) && year == documentYear) {
      months.words[months.words.length] = documentMonthWord;
    }
  });

  return months;
}
