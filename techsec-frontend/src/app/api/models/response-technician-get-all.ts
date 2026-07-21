export interface ResponseTechnicianGetAll {
  id: number;
  name: string;
  document: string;
  phone: string;
  specialty?: string;
  active: boolean;
}
