// src/app/page/client/profile/profile.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  private authService = inject(AuthService);
  private messageService = inject(MessageService);

  private user = this.authService.currentUser();

  name = signal(this.user?.name ?? '');
  document = signal(this.user?.document ?? '');
  username = signal(this.user?.username ?? '');
  phone = signal(this.user?.phone ?? '');
  address = signal(this.user?.address ?? '');

  save() {
    const current = this.authService.currentUser();
    const updated = {
      ...current,
      name: this.name(),
      document: this.document(),
      username: this.username(),
      phone: this.phone(),
      address: this.address()
    };
    localStorage.setItem('techsec_user', JSON.stringify(updated));
    this.authService.currentUser.set(updated);
    this.messageService.add({ severity: 'success', summary: 'Perfil actualizado', detail: 'Tus datos se guardaron correctamente.' });
  }
}
