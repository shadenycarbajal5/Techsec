// src/app/page/admin/appointment-agenda/appointment-agenda.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration } from '../../../api/api-configuration';
import { apiAppointmentGetAll } from '../../../api/fn/operations/apiAppointmentGetAll';
import { ResponseAppointmentGetAll } from '../../../api/models/response-appointment-get-all';

@Component({
  selector: 'app-appointment-agenda',
  imports: [CommonModule],
  templateUrl: './appointment-agenda.html',
  styleUrl: './appointment-agenda.css'
})
export class AppointmentAgenda {
  private http = inject(HttpClient);
  private apiConfig = inject(ApiConfiguration);

  appointments = signal<ResponseAppointmentGetAll[]>([]);
  loading = signal(true);

  constructor() {
    this.load();
  }

  load() {
    this.loading.set(true);
    apiAppointmentGetAll(this.http, this.apiConfig).subscribe({
      next: (data) => { this.appointments.set(data); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }
}