// src/app/page/client/my-appointments/my-appointments.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration } from '../../../api/api-configuration';
import { apiAppointmentGetAll } from '../../../api/fn/operations/apiAppointmentGetAll';
import { ResponseAppointmentGetAll } from '../../../api/models/response-appointment-get-all';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-my-appointments',
  imports: [CommonModule],
  templateUrl: './my-appointments.html',
  styleUrl: './my-appointments.css'
})
export class MyAppointments {
  private http = inject(HttpClient);
  private apiConfig = inject(ApiConfiguration);
  private authService = inject(AuthService);

  appointments = signal<ResponseAppointmentGetAll[]>([]);
  loading = signal(true);

  statusLabel: Record<string, string> = {
    RECIBIDO: 'Recibido',
    EN_DIAGNOSTICO: 'En diagnóstico',
    TECNICO_EN_RUTA: 'Técnico en ruta',
    EN_PROGRESO: 'En progreso',
    COMPLETADO: 'Completada'
  };

  constructor() {
    this.load();
  }

  load() {
    this.loading.set(true);
    const userId = this.authService.currentUser()?.id;
    apiAppointmentGetAll(this.http, this.apiConfig).subscribe({
      next: (data) => {
        this.appointments.set(data.filter(a => a.client?.id === userId));
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
}