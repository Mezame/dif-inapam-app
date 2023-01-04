export interface Report {
  date: string;
  cardsStats: {
    newRecord: number;
    replacement: number;
    change: number;
    cancel: number;
  };
  cardCodesRange: string[];
  sexStats: { male: number; female: number };
  metadata?: {
    id?: string;
    timestamp?: string;
  };
}

export const defaultReport = {
  date: '',
  cardsStats: {
    newRecord: 0,
    replacement: 0,
    change: 0,
    cancel: 0,
  },
  cardCodesRange: ['', ''],
  sexStats: { male: 0, female: 0 },
  metadata: {
    id: '',
  },
} as Readonly<Report>;