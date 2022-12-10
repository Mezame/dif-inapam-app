export interface Assistant {
  name: string;
  email: string;
  metadata?: {
    id?: string;
    createDate?: string;
  };
}
