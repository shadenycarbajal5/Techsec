import { Injectable, signal } from '@angular/core';

export type Product = { id: string; name: string; sku: string; category: string; description: string; price: number; stock: number; minStock: number; icon: string };
export type CartLine = { product: Product; quantity: number };
export type Quote = { code: string; date: string; total: number; status: 'Pendiente' | 'Aceptada' | 'Rechazada'; lines: CartLine[] };
export type Order = { code: string; date: string; customer: string; total: number; status: 'Recibido' | 'Preparando en almacén' | 'Listo para recojo' };
export type Appointment = { code: string; service: string; date: string; time: string; address: string; technician: string; status: 'Solicitada' | 'Confirmada' | 'Técnico en ruta' | 'En progreso' | 'Completada' };

const products: Product[] = [
  { id:'p1', name:'Cámara IP Hikvision 4MP', sku:'CAM-001', category:'Cámaras', description:'Vigilancia IP con visión nocturna.', price:189.90, stock:14, minStock:5, icon:'pi-video' },
  { id:'p2', name:'Cámara PTZ 360° Dahua', sku:'CAM-002', category:'Cámaras', description:'Control motorizado para interiores y exteriores.', price:349, stock:3, minStock:5, icon:'pi-video' },
  { id:'p3', name:'Tablero Eléctrico 12 Polos', sku:'ELE-001', category:'Equipos Eléctricos', description:'Tablero seguro para instalaciones residenciales.', price:129.50, stock:8, minStock:5, icon:'pi-bolt' },
  { id:'p4', name:'Cable THHN 2.5mm x 100m', sku:'ELE-002', category:'Equipos Eléctricos', description:'Conductor de cobre para instalación eléctrica.', price:89, stock:2, minStock:5, icon:'pi-bolt' },
  { id:'p5', name:'DVR 8 Canales 4K', sku:'ACC-001', category:'Accesorios', description:'Grabador digital compatible con cámaras IP.', price:259, stock:6, minStock:5, icon:'pi-server' },
  { id:'p6', name:'Disco Duro Seagate 2TB', sku:'ACC-002', category:'Accesorios', description:'Almacenamiento para sistemas de vigilancia.', price:119, stock:11, minStock:5, icon:'pi-database' }
];

@Injectable({ providedIn: 'root' })
export class DemoDataService {
  private key = 'techsec_demo';
  state = signal(this.load());
  private load() { try { return JSON.parse(localStorage.getItem(this.key) || 'null') || { products, cart: [], quotes: [], orders: [{code:'PED-2026-001',date:'16/07/2026',customer:'Juan Pérez',total:378.90,status:'Preparando en almacén'}], appointments: [] }; } catch { return { products, cart: [], quotes: [], orders: [], appointments: [] }; } }
  private save(next: any) { this.state.set(next); localStorage.setItem(this.key, JSON.stringify(next)); }
  addCart(product: Product) { const s=this.state(); const cart=[...s.cart]; const line=cart.find((x:CartLine)=>x.product.id===product.id); line ? line.quantity++ : cart.push({product,quantity:1}); this.save({...s,cart}); }
  changeCart(id: string, quantity: number) { const s=this.state(); this.save({...s,cart:s.cart.map((x:CartLine)=>x.product.id===id?{...x,quantity}:x).filter((x:CartLine)=>x.quantity>0)}); }
  createQuote() { const s=this.state(); if(!s.cart.length) return; const total=s.cart.reduce((n:number,x:CartLine)=>n+x.product.price*x.quantity,0); const quote: Quote={code:`COT-2026-${String(s.quotes.length+1).padStart(3,'0')}`,date:new Date().toLocaleDateString('es-PE'),total,status:'Pendiente',lines:s.cart}; this.save({...s,quotes:[quote,...s.quotes],cart:[]}); }
  createAppointment(data: Omit<Appointment,'code'|'technician'|'status'>) { const s=this.state(); this.save({...s,appointments:[{...data,code:`CIT-2026-${String(s.appointments.length+1).padStart(3,'0')}`,technician:'Por asignar',status:'Solicitada'},...s.appointments]}); }
  updateOrder(code:string,status:Order['status']) { const s=this.state(); this.save({...s,orders:s.orders.map((o:Order)=>o.code===code?{...o,status}:o)}); }
}
