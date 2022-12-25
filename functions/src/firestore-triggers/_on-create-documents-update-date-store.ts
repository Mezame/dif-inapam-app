import { initializeApp } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import * as functions from 'firebase-functions';
import { DateStore } from './date-store';

const app = initializeApp();
const firestore = getFirestore(app);

export default async (
  snap: functions.firestore.QueryDocumentSnapshot,
  _context: functions.EventContext<{
    id: string;
  }>
) => {
  const document = snap.data();
  const documentCreateDate = new Date(document.createDate) as Date;
  const documentYear = documentCreateDate.getFullYear().toString() as string;
  const documentMonthNumber = (
    documentCreateDate.getMonth() + 1
  ).toString() as string;
  const documentMonthWord = documentCreateDate.toLocaleDateString('es-MX', {
    month: 'long',
  }) as string;
  const docRef = firestore.doc('documentUtils/dateStore');
  const dateStore = await getDateStore(docRef);

  if (!dateStore) {
    const dateStore = {
      months: {
        [documentYear]: {
          numbers: [documentMonthNumber],
          words: [documentMonthWord],
        },
      },
      years: [documentYear],
    };

    setDateStore(dateStore, docRef);
  } else {
    let dateStoreYear!: string;
    let dateStoreMonth!: { number: string; word: string };

    if (!dateStore.years.includes(documentYear)) {
      dateStoreYear = documentYear;
    }

    if (!dateStore.months[documentYear].numbers.includes(documentMonthNumber)) {
      dateStoreMonth = { number: documentMonthNumber, word: documentMonthWord };
    }

    updateDateStoreFields({ dateStoreYear, dateStoreMonth }, docRef);
  }
};

async function getDateStore(
  docRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>
): Promise<DateStore> {
  const docSnap = await docRef.get();

  const dateStore = docSnap.data() as DateStore;

  if (dateStore) {
    functions.logger.info('get dateStore successfully');

    return dateStore;
  } else {
    functions.logger.info('could not get dateStore');

    return undefined as unknown as DateStore;
  }
}

async function updateDateStoreFields(
  fields: {
    dateStoreYear: string;
    dateStoreMonth: { number: string; word: string };
  },
  docRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>
) {
  try {
    if (fields.dateStoreYear) {
      await docRef.update('years', FieldValue.arrayUnion(fields.dateStoreYear));

      functions.logger.info('update dateStore years successfully');
    }

    if (fields.dateStoreMonth) {
      await docRef.update('months', {
        [fields.dateStoreYear]: {
          numbers: FieldValue.arrayUnion(fields.dateStoreMonth.number),
          words: FieldValue.arrayUnion(fields.dateStoreMonth.word),
        },
      });

      functions.logger.info('update dateStore months successfully');
    }
  } catch (error) {
    functions.logger.info('could not update dateStore');
  }
}

async function setDateStore(
  dateStore: DateStore,
  docRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>
) {
  try {
    await docRef.set(dateStore);

    functions.logger.info('set dateStore successfully');
  } catch (error) {
    functions.logger.info('could not set dateStore');
  }
}
