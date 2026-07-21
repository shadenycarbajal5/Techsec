// src/app/page/admin/order-management/order-management.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration } from '../../../api/api-configuration';
import { apiOrderGetAll } from '../../../api/fn/operations/apiOrderGetAll';
import { ResponseOrderGetAll } from '../../../api/models/response-order-get-all';

@Component({
  selector: 'app-order-management',
  imports: [CommonModule],
  templateUrl: './order-management.html',
  styleUrl: './order-management.css'
})
export class OrderManagement {
  private http = inject(HttpClient);
  private apiConfig = inject(ApiConfiguration);

  orders = signal<ResponseOrderGetAll[]>([]);
  loading = signal(true);

  constructor() {
    this.load();
  }

  load() {
    this.loading.set(true);
    apiOrderGetAll(this.http, this.apiConfig).subscribe({
      next: (data) => { this.orders.set(data); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }
}