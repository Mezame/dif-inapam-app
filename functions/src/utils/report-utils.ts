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
