// src/app/page/client/schedule-appointment/schedule-appointment.ts
import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration } from '../../../api/api-configuration';
import { apiAppointmentInsert } from '../../../api/fn/operations/apiAppointmentInsert';
import { apiAppointmentGetAvailability } from '../../../api/fn/operations/apiAppointmentGetAvailability';
import { RequestAppointmentInsert } from '../../../api/models/request-appointment-insert';
import { AuthService } from '../../../auth/auth.service';
import { MessageService } from 'primeng/api';

type Service = { name: string; type: 'INSTALACION' | 'SOPORTE' | 'DIAGNOSTICO' };
type LocationType = 'establecimiento' | 'otra';

const STORE_ADDRESS = 'Jr. Los Sauces 245, San Juan de Lurigancho, Lima';
const MONTH_NAMES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const WEEKDAYS = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];

@Component({
  selector: 'app-schedule-appointment',
  imports: [CommonModule, FormsModule],
  templateUrl: './schedule-appointment.html',
  styleUrl: './schedule-appointment.css'
})
export class ScheduleAppointment {
  private http = inject(HttpClient);
  private apiConfig = inject(ApiConfiguration);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  services: Service[] = [
    { name: 'Formateo', type: 'SOPORTE' },
    { name: 'Instalación de Programas', type: 'SOPORTE' },
    { name: 'Antivirus', type: 'SOPORTE' },
    { name: 'Actualización', type: 'SOPORTE' },
    { name: 'Detección de Fallas', type: 'DIAGNOSTICO' },
    { name: 'Reseteos', type: 'DIAGNOSTICO' },
    { name: 'Pantallas', type: 'DIAGNOSTICO' },
    { name: 'Teclados', type: 'DIAGNOSTICO' },
    { name: 'Cargadores', type: 'DIAGNOSTICO' },
    { name: 'Instalación de Cámaras', type: 'INSTALACION' },
    { name: 'Soporte Técnico', type: 'SOPORTE' }
  ];

  weekdays = WEEKDAYS;
  monthLabel = signal('');
  calDays = signal<Array<{ day: number; date: Date; open: boolean } | null>>([]);

  selectedService = signal<Service | null>(null);
  selectedDate = signal<Date | null>(null);
  selectedBlock = signal<'MANANA' | 'TARDE' | null>(null);
  selectedLocation = signal<LocationType | null>(null);
  address = signal('');
  description = signal('');
  sending = signal(false);

  loadingAvailability = signal(false);
  mananaDisponible = signal(false);
  tardeDisponible = signal(false);
  availabilityChecked = signal(false);

  storeAddress = STORE_ADDRESS;
  today = new Date();
  private viewDate = new Date(this.today.getFullYear(), this.today.getMonth(), 1);

  canGoPrevMonth = computed(() => {
    return !(this.viewDate.getFullYear() === this.today.getFullYear() && this.viewDate.getMonth() === this.today.getMonth());
  });

  constructor() {
    this.renderCalendar();
  }

  private isPastDay(date: Date): boolean {
    const t = new Date(); t.setHours(0, 0, 0, 0);
    return date < t;
  }

  private isDayOpen(date: Date): boolean {
    return date.getDay() !== 0 && !this.isPastDay(date); // domingo cerrado
  }

  private sameDay(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }

  isSelected(date: Date): boolean {
    const sel = this.selectedDate();
    return !!sel && this.sameDay(sel, date);
  }

  renderCalendar() {
    this.monthLabel.set(MONTH_NAMES[this.viewDate.getMonth()] + ' ' + this.viewDate.getFullYear());
    const firstDay = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 1);
    const startOffset = firstDay.getDay();
    const daysInMonth = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 0).getDate();
    const cells: Array<{ day: number; date: Date; open: boolean } | null> = [];
    for (let i = 0; i < startOffset; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), d);
      cells.push({ day: d, date, open: this.isDayOpen(date) });
    }
    this.calDays.set(cells);
  }

  changeMonth(delta: number) {
    if (delta < 0 && !this.canGoPrevMonth()) return;
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + delta, 1);
    this.renderCalendar();
  }

  selectDay(cell: { day: number; date: Date; open: boolean } | null) {
    if (!cell || !cell.open) return;
    this.selectedDate.set(cell.date);
    this.selectedBlock.set(null);
    this.checkAvailability(cell.date);
  }

  private checkAvailability(date: Date) {
    this.loadingAvailability.set(true);
    this.availabilityChecked.set(false);
    const iso = date.toISOString().slice(0, 10);
    apiAppointmentGetAvailability(this.http, this.apiConfig, iso).subscribe({
      next: (res) => {
        this.mananaDisponible.set(!!res?.mananaDisponible);
        this.tardeDisponible.set(!!res?.tardeDisponible);
        this.loadingAvailability.set(false);
        this.availabilityChecked.set(true);
      },
      error: () => {
        // Si el backend no responde, asumimos ambos bloques disponibles para no bloquear el flujo
        this.mananaDisponible.set(true);
        this.tardeDisponible.set(true);
        this.loadingAvailability.set(false);
        this.availabilityChecked.set(true);
      }
    });
  }

  selectService(service: Service) {
    this.selectedService.set(service);
  }

  selectBlock(block: 'MANANA' | 'TARDE') {
    const available = block === 'MANANA' ? this.mananaDisponible() : this.tardeDisponible();
    if (!available) return;
    this.selectedBlock.set(block);
  }

  selectLocation(type: LocationType) {
    this.selectedLocation.set(type);
    if (type === 'establecimiento') this.address.set(this.storeAddress);
    else if (this.address() === this.storeAddress) this.address.set('');
  }

  formattedSelectedDate = computed(() => {
    const d = this.selectedDate();
    if (!d) return '';
    return d.toLocaleDateString('es-PE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  });

  submit() {
    const service = this.selectedService();
    const date = this.selectedDate();
    const block = this.selectedBlock();
    const location = this.selectedLocation();
    const address = this.address().trim();

    if (!service || !date || !block || !location || !address) {
      this.messageService.add({ severity: 'warn', summary: 'Faltan datos', detail: 'Completa servicio, fecha, horario y lugar del servicio.' });
      return;
    }

    const user = this.authService.currentUser();
    const body: RequestAppointmentInsert = {
      clientId: typeof user?.id === 'number' ? user.id : undefined,
      serviceType: service.type,
      date: date.toISOString().slice(0, 10),
      timeSlot: block,
      serviceAddress: address,
      isAtEstablishment: location === 'establecimiento',
      notes: this.description() || undefined
    };

    this.sending.set(true);
    apiAppointmentInsert(this.http, this.apiConfig, body).subscribe({
      next: () => {
        this.sending.set(false);
        this.messageService.add({ severity: 'success', summary: 'Cita registrada', detail: 'Tu solicitud fue enviada correctamente.' });
        this.router.navigate(['/client/my-appointments']);
      },
      error: () => {
        this.sending.set(false);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo registrar la cita.' });
      }
    });
  }
}
