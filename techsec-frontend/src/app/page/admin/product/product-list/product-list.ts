// src/app/page/admin/product/product-list/product-list.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration } from '../../../../api/api-configuration';
import { apiProductGetAll } from '../../../../api/fn/operations/apiProductGetAll';
import { ResponseProductGetAll } from '../../../../api/models/response-product-get-all';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList {
  private http = inject(HttpClient);
  private apiConfig = inject(ApiConfiguration);

  products = signal<ResponseProductGetAll[]>([]);
  loading = signal(true);

  constructor() {
    this.load();
  }

  load() {
    this.loading.set(true);
    apiProductGetAll(this.http, this.apiConfig).subscribe({
      next: (data) => { this.products.set(data); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }
}