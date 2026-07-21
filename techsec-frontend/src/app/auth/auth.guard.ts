import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  const role = authService.getUserRole();
  const url = state.url;

  if (url.startsWith('/admin') && role !== 'ADMIN') {
    console.warn(`Acceso denegado: rol ${role} no tiene permisos para ${url}`);
    // Redirect to login or unauthorized page
    router.navigate(['/login']);
    return false;
  }

  if (url.startsWith('/client') && role !== 'CLIENTE') {
    console.warn(`Acceso denegado: rol ${role} no tiene permisos para ${url}`);
    router.navigate(['/login']);
    return false;
  }

  return true;
};

// Evita que un usuario ya autenticado vea la pantalla de login (esto causaba
// que el sidebar y el login se mostraran mezclados al entrar a /login con sesión activa)
export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    const role = authService.getUserRole();
    router.navigate([role === 'ADMIN' ? '/admin/dashboard' : '/client/catalog']);
    return false;
  }

  return true;
};
