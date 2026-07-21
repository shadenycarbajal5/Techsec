import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('./page/login/login').then(m => m.Login)
  },
  
  // Client routes
  {
    path: 'client/catalog',
    canActivate: [authGuard],
    loadComponent: () => import('./page/client/catalog/catalog').then(m => m.Catalog)
  },
  {
    path: 'client/cart',
    canActivate: [authGuard],
    loadComponent: () => import('./page/client/cart/cart').then(m => m.Cart)
  },
  {
    path: 'client/my-quotes',
    canActivate: [authGuard],
    loadComponent: () => import('./page/client/my-quotes/my-quotes').then(m => m.MyQuotes)
  },
  {
    path: 'client/my-orders',
    canActivate: [authGuard],
    loadComponent: () => import('./page/client/my-orders/my-orders').then(m => m.MyOrders)
  },
  {
    path: 'client/schedule-appointment',
    canActivate: [authGuard],
    loadComponent: () => import('./page/client/schedule-appointment/schedule-appointment').then(m => m.ScheduleAppointment)
  },
  {
    path: 'client/my-appointments',
    canActivate: [authGuard],
    loadComponent: () => import('./page/client/my-appointments/my-appointments').then(m => m.MyAppointments)
  },
  {
    path: 'client/profile',
    canActivate: [authGuard],
    loadComponent: () => import('./page/client/profile/profile').then(m => m.Profile)
  },

  // Admin routes
  {
    path: 'admin/dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./page/admin/dashboard/dashboard').then(m => m.Dashboard)
  },
  {
    path: 'admin/category',
    canActivate: [authGuard],
    loadComponent: () => import('./page/admin/category/category').then(m => m.Category)
  },
  {
    path: 'admin/product/product-insert',
    canActivate: [authGuard],
    loadComponent: () => import('./page/admin/product/product-insert/product-insert').then(m => m.ProductInsert)
  },
  {
    path: 'admin/product/product-list',
    canActivate: [authGuard],
    loadComponent: () => import('./page/admin/product/product-list/product-list').then(m => m.ProductList)
  },
  {
    path: 'admin/quote-management',
    canActivate: [authGuard],
    loadComponent: () => import('./page/admin/quote-management/quote-management').then(m => m.QuoteManagement)
  },
  {
    path: 'admin/order-management',
    canActivate: [authGuard],
    loadComponent: () => import('./page/admin/order-management/order-management').then(m => m.OrderManagement)
  },
  {
    path: 'admin/appointment-agenda',
    canActivate: [authGuard],
    loadComponent: () => import('./page/admin/appointment-agenda/appointment-agenda').then(m => m.AppointmentAgenda)
  },
  {
    path: 'admin/technician/technician-insert',
    canActivate: [authGuard],
    loadComponent: () => import('./page/admin/technician/technician-insert/technician-insert').then(m => m.TechnicianInsert)
  },
  {
    path: 'admin/technician/technician-list',
    canActivate: [authGuard],
    loadComponent: () => import('./page/admin/technician/technician-list/technician-list').then(m => m.TechnicianList)
  },

  // Fallback
  { path: '**', redirectTo: 'login' }
];
