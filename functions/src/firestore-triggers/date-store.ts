export interface DateStore {
  months: {
    [key: string]: { numbers: string[]; words: string[] };
  };
  years: string[];
}
