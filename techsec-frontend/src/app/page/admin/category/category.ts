// src/app/page/admin/category/category.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration } from '../../../api/api-configuration';
import { apiCategoryGetAll } from '../../../api/fn/operations/apiCategoryGetAll';
import { apiCategoryInsert } from '../../../api/fn/operations/apiCategoryInsert';
import { ResponseCategoryGetAll } from '../../../api/models/response-category-get-all';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-category',
  imports: [CommonModule, FormsModule],
  templateUrl: './category.html',
  styleUrl: './category.css'
})
export class Category {
  private http = inject(HttpClient);
  private apiConfig = inject(ApiConfiguration);
  private messageService = inject(MessageService);

  categories = signal<ResponseCategoryGetAll[]>([]);
  loading = signal(true);
  saving = signal(false);
  name = signal('');
  description = signal('');

  constructor() {
    this.load();
  }

  load() {
    this.loading.set(true);
    apiCategoryGetAll(this.http, this.apiConfig).subscribe({
      next: (data) => { this.categories.set(data); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }

  save() {
    if (!this.name().trim()) return;
    this.saving.set(true);
    apiCategoryInsert(this.http, this.apiConfig, { name: this.name(), description: this.description() || undefined }).subscribe({
      next: () => {
        this.saving.set(false);
        this.name.set('');
        this.description.set('');
        this.messageService.add({ severity: 'success', summary: 'Categoría creada' });
        this.load();
      },
      error: () => {
        this.saving.set(false);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear la categoría.' });
      }
    });
  }
}