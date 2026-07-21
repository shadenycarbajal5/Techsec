// src/app/page/client/cart/cart.ts
import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartItem as CartLine, CartService } from '../../../observable/cart/cart.service';
import { AuthService } from '../../../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration } from '../../../api/api-configuration';
import { apiQuoteInsert } from '../../../api/fn/operations/apiQuoteInsert';
import { RequestQuoteInsert } from '../../../api/models/request-quote-insert';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
  private cartService = inject(CartService);
  private router = inject(Router);
  private authService = inject(AuthService);
  private http = inject(HttpClient);
  private apiConfig = inject(ApiConfiguration);
  private messageService = inject(MessageService);

  lines = this.cartService.items;
  total = computed(() => this.lines().reduce((n: number, x: CartLine) => n + x.product.price * x.quantity, 0));
  sending = false;

  change(productId: number, q: number) {
    this.cartService.updateQuantity(productId, q);
  }

  private buildQuoteBody(): RequestQuoteInsert {
    const user = this.authService.currentUser();
    const clientId = typeof user?.id === 'number' ? user.id : undefined;

    return {
      clientId,
      details: this.lines().map(l => ({ productId: l.product.id, quantity: l.quantity })),
      notes: 'Cotización generada desde el carrito.'
    };
  }

  quote() {
    if (!this.lines().length) {
      this.messageService.add({ severity: 'warn', summary: 'Carrito vacío', detail: 'Agrega productos antes de enviar tu cotización.' });
      return;
    }

    this.sending = true;
    apiQuoteInsert(this.http, this.apiConfig, this.buildQuoteBody()).subscribe({
      next: () => {
        this.sending = false;
        this.cartService.clear();
        this.messageService.add({ severity: 'success', summary: 'Cotización enviada', detail: 'Tu solicitud fue registrada.' });
        this.router.navigate(['/client/my-quotes']);
      },
      error: () => {
        this.sending = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo enviar la cotización.' });
      }
    });
  }
}