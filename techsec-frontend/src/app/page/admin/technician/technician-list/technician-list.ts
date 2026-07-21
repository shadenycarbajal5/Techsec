// src/app/page/admin/technician/technician-list/technician-list.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration } from '../../../../api/api-configuration';
import { apiTechnicianGetAll } from '../../../../api/fn/operations/apiTechnicianGetAll';
import { ResponseTechnicianGetAll } from '../../../../api/models/response-technician-get-all';

@Component({
  selector: 'app-technician-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './technician-list.html',
  styleUrl: './technician-list.css'
})
export class TechnicianList {
  private http = inject(HttpClient);
  private apiConfig = inject(ApiConfiguration);

  technicians = signal<ResponseTechnicianGetAll[]>([]);
  loading = signal(true);

  constructor() {
    this.load();
  }

  load() {
    this.loading.set(true);
    apiTechnicianGetAll(this.http, this.apiConfig).subscribe({
      next: (data) => { this.technicians.set(data); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }
}