import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration } from '../../../api/api-configuration';
import { apiProductGetAll } from '../../../api/fn/operations/apiProductGetAll';
import { ResponseProductGetAll } from '../../../api/models/response-product-get-all';
import { CartService } from '../../../observable/cart/cart.service';
import { MessageService } from 'primeng/api';

// PrimeNG components
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-catalog',
  imports: [
    CommonModule,
    FormsModule,
    InputText,
    Button
  ],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css'
})
export class Catalog {
  private http = inject(HttpClient);
  private apiConfig = inject(ApiConfiguration);
  private cartService = inject(CartService);
  private messageService = inject(MessageService);

  // States
  products = signal<ResponseProductGetAll[]>([]);
  searchQuery = signal('');
  selectedCategory = signal<string>('TODOS');
  loading = signal(true);

  // Categories list
  categories = ['TODOS', 'Cámaras', 'Equipos Eléctricos', 'Accesorios'];

  constructor() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading.set(true);
    apiProductGetAll(this.http, this.apiConfig).subscribe({
      next: (data) => {
        this.products.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load products', err);
        this.loading.set(false);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar el catálogo de productos.'
        });
      }
    });
  }

  // Filtered products list
  filteredProducts = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const cat = this.selectedCategory();
    
    return this.products().filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(query) || 
                            (product.description && product.description.toLowerCase().includes(query));
      
      const matchesCategory = cat === 'TODOS' || 
                              (product.category && product.category.name === cat);
      
      return matchesSearch && matchesCategory;
    });
  });

  addToCart(product: ResponseProductGetAll) {
    if (product.stock <= 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Sin Stock',
        detail: `El producto ${product.name} no cuenta con stock disponible.`
      });
      return;
    }
    
    this.cartService.addItem(product, 1);
    this.messageService.add({
      severity: 'success',
      summary: 'Agregado',
      detail: `${product.name} ha sido agregado al carrito de cotización.`
    });
  }

  selectCategory(category: string) {
    this.selectedCategory.set(category);
  }
}
