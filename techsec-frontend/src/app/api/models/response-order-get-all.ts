import { ResponseProductGetAll } from './response-product-get-all';
import { ResponseUserGetAll } from './response-user-get-all';

export interface ResponseOrderDetailGetAll {
  id: number;
  product: ResponseProductGetAll;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface ResponseOrderStatusHistoryGetAll {
  id: number;
  status: 'RECIBIDO' | 'PREPARANDO_ALMACEN' | 'LISTO_RECOJO';
  updatedAt: string;
  comment?: string;
}

export interface ResponseOrderGetAll {
  id: number;
  client: ResponseUserGetAll;
  details: ResponseOrderDetailGetAll[];
  statusHistory: ResponseOrderStatusHistoryGetAll[];
  currentStatus: 'RECIBIDO' | 'PREPARANDO_ALMACEN' | 'LISTO_RECOJO';
  total: number;
  shippingAddress: string;
  createdAt: string;
}
