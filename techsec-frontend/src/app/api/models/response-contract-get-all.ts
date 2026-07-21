import { ResponseAppointmentGetAll } from './response-appointment-get-all';

export interface ResponseContractGetAll {
  id: number;
  appointment: ResponseAppointmentGetAll;
  contractNumber: string;
  terms: string;
  wordFileUrl?: string;
  createdAt: string;
}
