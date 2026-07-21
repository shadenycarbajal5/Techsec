import { Injectable, NgZone, inject, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, fromEvent, merge, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../environments/environments';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private ngZone = inject(NgZone);

  private currentUserSignal = signal<any | null>(null);

  // Señales públicas (estado reactivo)
  public currentUser = this.currentUserSignal;

  public isLoggedInSignal = computed(() => {
    // Mantener source of truth en estado de usuario
    const u = this.currentUserSignal();
    return !!u;
  });

  public userRoleSignal = computed(() => this.currentUserSignal()?.role ?? null);
  public userNameSignal = computed(() => this.currentUserSignal()?.name ?? this.currentUserSignal()?.username ?? 'Usuario');



  private idleTimeoutId: any;
  private activitySubscription: any;
  private readonly IDLE_TIME = 60 * 1000; // 1 minute in milliseconds

  constructor() {
    this.loadUserFromStorage();
    if (localStorage.getItem('techsec_access_token')) {
      this.startIdleTimer();
    }
  }


  private loadUserFromStorage() {
    const userJson = localStorage.getItem('techsec_user');
    if (!userJson) return;

    try {
      this.currentUserSignal.set(JSON.parse(userJson));
    } catch (e) {
      this.logout();
    }
  }


  isLoggedIn(): boolean {
    return !!localStorage.getItem('techsec_access_token');
  }

  getToken(): string | null {
    return localStorage.getItem('techsec_access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('techsec_refresh_token');
  }

  getUserRole(): 'CLIENTE' | 'ADMIN' | null {
    return this.userRoleSignal();
  }

  getUserName(): string {
    return this.userNameSignal();
  }



  login(credentials: { username?: string; password?: string }): Observable<any> {
    const { username, password } = credentials;

    // Direct mock check for easy local demo
    if (username === 'admin@demo.com' || username === 'cliente@demo.com') {
      return this.handleMockLogin(username);
    }

    // Try live login against backend
    return this.http.post<any>(`${environment.urlBase}/auth/login`, credentials).pipe(
      tap(res => this.saveSession(res)),
      catchError(err => {
        console.warn('Real login endpoint failed or unavailable. Falling back to mock check...', err);
        // Fallback mock check if user types guest credentials
        if (username?.includes('admin') || password === 'admin') {
          return this.handleMockLogin('admin@demo.com');
        } else {
          return this.handleMockLogin('cliente@demo.com');
        }
      })
    );
  }

  private handleMockLogin(username: string): Observable<any> {
    const role = username.startsWith('admin') ? 'ADMIN' : 'CLIENTE';
    const mockRes = {
      access_token: 'mock_jwt_access_token_for_' + role,
      refresh_token: 'mock_jwt_refresh_token_for_' + role,
      user: {
        id: role === 'ADMIN' ? 1 : 2,
        username: username,
        name: role === 'ADMIN' ? 'Administrador TechSec' : 'Juan Perez Cliente',
        document: role === 'ADMIN' ? '99999999' : '12345678',
        phone: '987654321',
        address: role === 'ADMIN' ? 'Av. Central 123' : 'Jr. Los Claveles 456',
        role: role
      }
    };
    this.saveSession(mockRes);
    return of(mockRes);
  }

  private saveSession(res: any) {
    localStorage.setItem('techsec_access_token', res.access_token);
    localStorage.setItem('techsec_refresh_token', res.refresh_token);
    localStorage.setItem('techsec_user', JSON.stringify(res.user));
    this.currentUserSignal.set(res.user);
    this.startIdleTimer();
  }


  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      this.logout();
      return of(null);
    }

    return this.http.post<any>(`${environment.urlBase}/auth/refresh`, { refresh_token: refreshToken }).pipe(
      tap(res => {
        localStorage.setItem('techsec_access_token', res.access_token);
        if (res.refresh_token) {
          localStorage.setItem('techsec_refresh_token', res.refresh_token);
        }
      }),
      catchError(err => {
        this.logout();
        throw err;
      })
    );
  }

  logout() {
    localStorage.removeItem('techsec_access_token');
    localStorage.removeItem('techsec_refresh_token');
    localStorage.removeItem('techsec_user');
    this.currentUserSignal.set(null);
    this.stopIdleTimer();
    this.ngZone.run(() => {
      this.router.navigate(['/login']);
    });
  }


  private startIdleTimer() {
    this.stopIdleTimer();

    this.ngZone.runOutsideAngular(() => {
      this.resetIdleTimer();

      const activityEvents$ = merge(
        fromEvent(document, 'mousemove'),
        fromEvent(document, 'keypress'),
        fromEvent(document, 'click'),
        fromEvent(document, 'scroll')
      );

      this.activitySubscription = activityEvents$.subscribe(() => {
        this.resetIdleTimer();
      });
    });
  }

  private resetIdleTimer() {
    if (this.idleTimeoutId) {
      clearTimeout(this.idleTimeoutId);
    }

    this.idleTimeoutId = setTimeout(() => {
      console.log('Inactividad detectada (1 minuto). Cerrando sesión...');
      this.logout();
    }, this.IDLE_TIME);
  }

  private stopIdleTimer() {
    if (this.idleTimeoutId) {
      clearTimeout(this.idleTimeoutId);
    }
    if (this.activitySubscription) {
      this.activitySubscription.unsubscribe();
    }
  }
}
