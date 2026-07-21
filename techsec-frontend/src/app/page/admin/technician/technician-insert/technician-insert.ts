// src/app/page/admin/technician/technician-insert/technician-insert.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration } from '../../../../api/api-configuration';
import { apiTechnicianInsert } from '../../../../api/fn/operations/apiTechnicianInsert';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-technician-insert',
  imports: [CommonModule, FormsModule],
  templateUrl: './technician-insert.html',
  styleUrl: './technician-insert.css'
})
export class TechnicianInsert {
  private http = inject(HttpClient);
  private apiConfig = inject(ApiConfiguration);
  private router = inject(Router);
  private messageService = inject(MessageService);

  name = signal('');
  document = signal('');
  phone = signal('');
  specialty = signal('');
  saving = signal(false);

  submit() {
    if (!this.name().trim() || !this.document().trim() || !this.phone().trim()) {
      this.messageService.add({ severity: 'warn', summary: 'Faltan datos', detail: 'Completa nombre, documento y teléfono.' });
      return;
    }

    this.saving.set(true);
    apiTechnicianInsert(this.http, this.apiConfig, {
      name: this.name(),
      document: this.document(),
      phone: this.phone(),
      specialty: this.specialty() || undefined
    }).subscribe({
      next: () => {
        this.saving.set(false);
        this.messageService.add({ severity: 'success', summary: 'Técnico registrado' });
        this.router.navigate(['/admin/technician/technician-list']);
      },
      error: () => {
        this.saving.set(false);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo registrar el técnico.' });
      }
    });
  }
}