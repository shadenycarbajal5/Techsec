// src/app/page/admin/dashboard/dashboard.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { ApiConfiguration } from '../../../api/api-configuration';
import { apiProductGetAll } from '../../../api/fn/operations/apiProductGetAll';
import { apiOrderGetAll } from '../../../api/fn/operations/apiOrderGetAll';
import { apiQuoteGetAll } from '../../../api/fn/operations/apiQuoteGetAll';
import { apiAppointmentGetAll } from '../../../api/fn/operations/apiAppointmentGetAll';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  private http = inject(HttpClient);
  private apiConfig = inject(ApiConfiguration);

  loading = signal(true);
  metrics = signal<{ label: string; value: string; change: string; positive: boolean; icon: string }[]>([]);
  lowStockProducts = signal<{ name: string; stock: number }[]>([]);
  todayAppointments = signal<any[]>([]);

  constructor() {
    this.load();
  }

  load() {
    this.loading.set(true);
    forkJoin({
      products: apiProductGetAll(this.http, this.apiConfig),
      orders: apiOrderGetAll(this.http, this.apiConfig),
      quotes: apiQuoteGetAll(this.http, this.apiConfig),
      appointments: apiAppointmentGetAll(this.http, this.apiConfig)
    }).subscribe({
      next: ({ products, orders, quotes, appointments }) => {
        const salesTotal = orders.reduce((acc, o) => acc + o.total, 0);
        const activeOrders = orders.filter(o => o.currentStatus !== 'LISTO_RECOJO').length;
        const lowStock = products.filter(p => p.stock <= p.minStockAlert);
        const today = new Date().toISOString().slice(0, 10);
        const todayAppts = appointments.filter(a => a.date === today);

        this.metrics.set([
          { label: 'Ventas totales', value: `S/ ${salesTotal.toFixed(2)}`, change: `${orders.length} pedidos`, positive: true, icon: 'pi-chart-line' },
          { label: 'Pedidos activos', value: String(activeOrders), change: `${orders.length} en total`, positive: false, icon: 'pi-shopping-bag' },
          { label: 'Stock bajo', value: String(lowStock.length), change: 'Revisar hoy', positive: lowStock.length === 0, icon: 'pi-exclamation-triangle' },
          { label: 'Citas de hoy', value: String(todayAppts.length), change: `${appointments.length} programadas`, positive: true, icon: 'pi-calendar' }
        ]);

        this.lowStockProducts.set(lowStock.map(p => ({ name: p.name, stock: p.stock })));
        this.todayAppointments.set(todayAppts);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
}