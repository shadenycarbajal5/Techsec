// src/app/page/admin/quote-management/quote-management.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration } from '../../../api/api-configuration';
import { apiQuoteGetAll } from '../../../api/fn/operations/apiQuoteGetAll';
import { ResponseQuoteGetAll } from '../../../api/models/response-quote-get-all';

@Component({
  selector: 'app-quote-management',
  imports: [CommonModule],
  templateUrl: './quote-management.html',
  styleUrl: './quote-management.css'
})
export class QuoteManagement {
  private http = inject(HttpClient);
  private apiConfig = inject(ApiConfiguration);

  quotes = signal<ResponseQuoteGetAll[]>([]);
  loading = signal(true);

  constructor() {
    this.load();
  }

  load() {
    this.loading.set(true);
    apiQuoteGetAll(this.http, this.apiConfig).subscribe({
      next: (data) => { this.quotes.set(data); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }
}