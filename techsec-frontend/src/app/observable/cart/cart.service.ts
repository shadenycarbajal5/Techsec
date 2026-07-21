// src/app/observable/cart/cart.service.ts
import { Injectable, inject, signal, computed } from '@angular/core';
import { DemoDataService } from '../demo-data/demo-data.service';
import { ResponseProductGetAll } from '../../api/models/response-product-get-all';

export interface CartItem {
  product: ResponseProductGetAll;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private demo = inject(DemoDataService);
  private itemsSignal = signal<CartItem[]>(this.load());

  items = this.itemsSignal.asReadonly();
  totalCount = computed(() => this.itemsSignal().reduce((acc, i) => acc + i.quantity, 0));
  totalAmount = computed(() => this.itemsSignal().reduce((acc, i) => acc + i.product.price * i.quantity, 0));

  private load(): CartItem[] {
    const saved = localStorage.getItem('techsec_cart');
    if (!saved) return [];
    try { return JSON.parse(saved); } catch { return []; }
  }

  private save(items: CartItem[]) {
    this.itemsSignal.set(items);
    localStorage.setItem('techsec_cart', JSON.stringify(items));
  }

  getItems(): CartItem[] {
    return this.itemsSignal();
  }

  addItem(product: ResponseProductGetAll, quantity: number = 1) {
    const demoProduct = { id: String(product.id), name: product.name, sku: `PROD-${product.id}`, category: product.category?.name || 'Accesorios', description: product.description || '', price: product.price, stock: product.stock, minStock: product.minStockAlert, icon: product.category?.name === 'Cámaras' ? 'pi-video' : 'pi-box' };
    for (let i = 0; i < quantity; i++) this.demo.addCart(demoProduct);

    const current = [...this.itemsSignal()];
    const idx = current.findIndex(i => i.product.id === product.id);
    if (idx > -1) current[idx] = { ...current[idx], quantity: current[idx].quantity + quantity };
    else current.push({ product, quantity });

    this.save(current);
  }

  removeItem(productId: number) {
    this.save(this.itemsSignal().filter(i => i.product.id !== productId));
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) { this.removeItem(productId); return; }
    this.save(this.itemsSignal().map(i => i.product.id === productId ? { ...i, quantity } : i));
  }

  clear() {
    this.save([]);
  }

  getTotalCount(): number {
    return this.totalCount();
  }

  getTotalAmount(): number {
    return this.totalAmount();
  }
}