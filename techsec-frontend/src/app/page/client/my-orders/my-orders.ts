// src/app/page/client/my-orders/my-orders.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration } from '../../../api/api-configuration';
import { apiOrderGetAll } from '../../../api/fn/operations/apiOrderGetAll';
import { ResponseOrderGetAll } from '../../../api/models/response-order-get-all';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-my-orders',
  imports: [CommonModule],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.css'
})
export class MyOrders {
  private http = inject(HttpClient);
  private apiConfig = inject(ApiConfiguration);
  private authService = inject(AuthService);

  orders = signal<ResponseOrderGetAll[]>([]);
  loading = signal(true);
  steps: ResponseOrderGetAll['currentStatus'][] = ['RECIBIDO', 'PREPARANDO_ALMACEN', 'LISTO_RECOJO'];
  stepLabel: Record<string, string> = { RECIBIDO: 'Recibido', PREPARANDO_ALMACEN: 'Preparando en almacén', LISTO_RECOJO: 'Listo para recojo' };

  constructor() {
    this.load();
  }

  load() {
    this.loading.set(true);
    const userId = this.authService.currentUser()?.id;
    apiOrderGetAll(this.http, this.apiConfig).subscribe({
      next: (data) => {
        this.orders.set(data.filter(o => o.client?.id === userId));
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  stepIndex(o: ResponseOrderGetAll) {
    return this.steps.indexOf(o.currentStatus);
  }
}