// src/app/page/login/login.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  activeTab = signal<'login' | 'register'>('login');
  username = signal('');
  password = signal('');
  loading = signal(false);

  quickLogin(role: 'cliente' | 'admin') {
    this.username.set(role === 'admin' ? 'admin@demo.com' : 'cliente@demo.com');
    this.password.set('demo123');
    this.onSubmit();
  }

  onSubmit() {
    if (!this.username() || !this.password()) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor complete todos los campos.' });
      return;
    }

    this.loading.set(true);
    this.authService.login({ username: this.username(), password: this.password() }).subscribe({
      next: (res) => {
        this.loading.set(false);
        this.messageService.add({ severity: 'success', summary: 'Bienvenido', detail: `Sesión iniciada como ${res.user.name}` });
        this.router.navigate([res.user.role === 'ADMIN' ? '/admin/dashboard' : '/client/catalog']);
      },
      error: () => {
        this.loading.set(false);
        this.messageService.add({ severity: 'error', summary: 'Error de Autenticación', detail: 'Credenciales inválidas o servidor no responde.' });
      }
    });
  }
}