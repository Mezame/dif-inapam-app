export interface DateStore {
  months: {
    [x: string]: { numbers: string[]; words: string[] };
  };
  years: string[];
}
