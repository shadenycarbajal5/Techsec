// src/app/page/client/my-quotes/my-quotes.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration } from '../../../api/api-configuration';
import { apiQuoteGetAll } from '../../../api/fn/operations/apiQuoteGetAll';
import { ResponseQuoteGetAll } from '../../../api/models/response-quote-get-all';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-my-quotes',
  imports: [CommonModule],
  templateUrl: './my-quotes.html',
  styleUrl: './my-quotes.css'
})
export class MyQuotes {
  private http = inject(HttpClient);
  private apiConfig = inject(ApiConfiguration);
  private authService = inject(AuthService);

  quotes = signal<ResponseQuoteGetAll[]>([]);
  loading = signal(true);

  constructor() {
    this.load();
  }

  load() {
    this.loading.set(true);
    const userId = this.authService.currentUser()?.id;
    apiQuoteGetAll(this.http, this.apiConfig).subscribe({
      next: (data) => {
        this.quotes.set(data.filter(q => q.client?.id === userId));
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
}