export interface Document {
  createDate: string;
  operationCode: 'NUEVO REG' | 'REPOSICION' | 'CANJE';
  cardCode: string;
  branchOffice: string;
  reviewDocument: string;
  makeCard: string;
  fathersLastname: string;
  mothersLastname: string;
  name: string;
  sex: 'Hombre' | 'Mujer';
  birthdate: string;
  birthplace: string;
  curp: string;
  maritalStatus: 'Casado' | 'Soltero';
  isReviewed?: boolean;
  isCardCanceled?: boolean;
  imageUrl?: string | null;
  metadata?: {
    sortId?: number;
    timestamp?: string;
  };
}

export interface DateStore {
  months: {
    [x: string]: { numbers: string[]; words: string[] };
  };
  years: string[];
}

export function getDocumentsYears(documents: Document[]): string[] {
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

export function getDocumentsMonths(
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

export function getDateStoreYears(documents: Document[]): DateStore['years'] {
  const dateStoreYears = getDocumentsYears(documents) as DateStore['years'];

  return dateStoreYears;
}

export function getDateStoreMonths(documents: Document[]): DateStore['months'] {
  let dateStoreMonths = {} as DateStore['months'];
  const documentsYears = getDocumentsYears(documents);

  documentsYears.forEach((docYear) => {
    const documentsMonths = getDocumentsMonths(documents, docYear);

    dateStoreMonths = {
      ...dateStoreMonths,
      [docYear]: {
        numbers: documentsMonths.numbers,
        words: documentsMonths.words,
      },
    };
  });

  return dateStoreMonths;
}

export function getDateStore(documents: Document[]): DateStore {
  const dateStoreYears = getDocumentsYears(documents) as DateStore['years'];
  const dateStoreMonths = getDateStoreMonths(documents) as DateStore['months'];
  const dateStore = {
    months: dateStoreMonths,
    years: dateStoreYears,
  } as DateStore;

  return dateStore;
}
