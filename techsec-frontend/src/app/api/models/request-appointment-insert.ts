export interface RequestAppointmentInsert {
  clientId?: number;
  serviceType: 'INSTALACION' | 'SOPORTE' | 'DIAGNOSTICO';
  date: string;
  timeSlot: 'MANANA' | 'TARDE';
  serviceAddress: string;
  isAtEstablishment: boolean;
  technicianId?: number;
  notes?: string;
}
