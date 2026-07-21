import { ResponseUserGetAll } from './response-user-get-all';
import { ResponseTechnicianGetAll } from './response-technician-get-all';

export interface ResponseAppointmentStatusHistoryGetAll {
  id: number;
  status: 'RECIBIDO' | 'EN_DIAGNOSTICO' | 'TECNICO_EN_RUTA' | 'EN_PROGRESO' | 'COMPLETADO';
  updatedAt: string;
  comment?: string;
}

export interface ResponseAppointmentFileGetAll {
  id: number;
  appointmentId: number;
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
}

export interface ResponseAppointmentGetAll {
  id: number;
  client: ResponseUserGetAll;
  serviceType: 'INSTALACION' | 'SOPORTE' | 'DIAGNOSTICO';
  date: string;
  timeSlot: 'MANANA' | 'TARDE';
  serviceAddress: string;
  isAtEstablishment: boolean;
  technician?: ResponseTechnicianGetAll;
  statusHistory: ResponseAppointmentStatusHistoryGetAll[];
  files: ResponseAppointmentFileGetAll[];
  currentStatus: 'RECIBIDO' | 'EN_DIAGNOSTICO' | 'TECNICO_EN_RUTA' | 'EN_PROGRESO' | 'COMPLETADO';
  notes?: string;
  createdAt: string;
}
