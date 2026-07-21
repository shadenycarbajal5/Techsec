// src/app/page/admin/product/product-insert/product-insert.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration } from '../../../../api/api-configuration';
import { apiCategoryGetAll } from '../../../../api/fn/operations/apiCategoryGetAll';
import { apiProductInsert } from '../../../../api/fn/operations/apiProductInsert';
import { ResponseCategoryGetAll } from '../../../../api/models/response-category-get-all';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-insert',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-insert.html',
  styleUrl: './product-insert.css'
})
export class ProductInsert {
  private http = inject(HttpClient);
  private apiConfig = inject(ApiConfiguration);
  private router = inject(Router);
  private messageService = inject(MessageService);

  categories = signal<ResponseCategoryGetAll[]>([]);
  saving = signal(false);

  name = signal('');
  categoryId = signal<number | null>(null);
  description = signal('');
  specifications = signal('');
  price = signal<number | null>(null);
  stock = signal<number | null>(null);
  minStockAlert = signal<number>(5);

  constructor() {
    apiCategoryGetAll(this.http, this.apiConfig).subscribe({
      next: (data) => this.categories.set(data)
    });
  }

  submit() {
    if (!this.name().trim() || !this.categoryId() || this.price() === null || this.stock() === null) {
      this.messageService.add({ severity: 'warn', summary: 'Faltan datos', detail: 'Completa nombre, categoría, precio y stock.' });
      return;
    }

    this.saving.set(true);
    apiProductInsert(this.http, this.apiConfig, {
      name: this.name(),
      categoryId: this.categoryId()!,
      description: this.description() || undefined,
      specifications: this.specifications() || undefined,
      price: this.price()!,
      stock: this.stock()!,
      minStockAlert: this.minStockAlert()
    }).subscribe({
      next: () => {
        this.saving.set(false);
        this.messageService.add({ severity: 'success', summary: 'Producto creado' });
        this.router.navigate(['/admin/product/product-list']);
      },
      error: () => {
        this.saving.set(false);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el producto.' });
      }
    });
  }
}