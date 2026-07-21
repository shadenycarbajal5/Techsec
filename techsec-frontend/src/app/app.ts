import { Component, inject, signal, computed, ViewChild } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { CartService } from './observable/cart/cart.service';

// PrimeNG components
import { Toast } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Menu } from 'primeng/menu';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    Toast,
    ConfirmDialog,
    Menu,
    Avatar
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  authService = inject(AuthService);
  cartService = inject(CartService);
  router = inject(Router);

  isLoggedIn = computed(() => this.authService.isLoggedInSignal());
  userRole = computed(() => this.authService.getUserRole());
  userName = computed(() => this.authService.getUserName());

  cartCount = computed(() => this.cartService.getTotalCount());

  @ViewChild('userMenu') userMenu!: Menu;

  userMenuItems: MenuItem[] = [
    {
      label: 'Mi Perfil',
      icon: 'pi pi-user',
      command: () => {
        const role = this.userRole();
        if (role === 'CLIENTE') {
          this.router.navigate(['/client/profile']);
        } else {
          this.router.navigate(['/admin/dashboard']);
        }
      }
    },
    {
      label: 'Cerrar Sesión',
      icon: 'pi pi-sign-out',
      command: () => {
        this.authService.logout();
      }
    }
  ];

  sidebarItems = computed(() => {
    const role = this.userRole();
    if (role === 'ADMIN') {
      return [
        { route: '/admin/dashboard', icon: 'pi pi-chart-bar', text: 'Dashboard' },
        { route: '/admin/category', icon: 'pi pi-tags', text: 'Categorías' },
        { route: '/admin/product/product-list', icon: 'pi pi-box', text: 'Productos' },
        { route: '/admin/quote-management', icon: 'pi pi-file', text: 'Cotizaciones' },
        { route: '/admin/order-management', icon: 'pi pi-shopping-bag', text: 'Pedidos' },
        { route: '/admin/appointment-agenda', icon: 'pi pi-calendar', text: 'Citas / Agenda' },
        { route: '/admin/technician/technician-list', icon: 'pi pi-users', text: 'Técnicos' }
      ];
    } else if (role === 'CLIENTE') {
      return [
        { route: '/client/catalog', icon: 'pi pi-th-large', text: 'Catálogo' },
        { route: '/client/my-quotes', icon: 'pi pi-file', text: 'Mis Cotizaciones' },
        { route: '/client/my-orders', icon: 'pi pi-shopping-bag', text: 'Mis Pedidos' },
        { route: '/client/schedule-appointment', icon: 'pi pi-calendar-plus', text: 'Agendar Cita' },
        { route: '/client/my-appointments', icon: 'pi pi-calendar', text: 'Mis Citas' },
        { route: '/client/profile', icon: 'pi pi-user', text: 'Mi Perfil' }
      ];
    }
    return [];
  });

  toggleMenu(event: Event) {
    this.userMenu.toggle(event);
  }
}
