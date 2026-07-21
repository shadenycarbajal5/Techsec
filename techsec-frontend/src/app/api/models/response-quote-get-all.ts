import { ResponseProductGetAll } from './response-product-get-all';
import { ResponseUserGetAll } from './response-user-get-all';

export interface ResponseQuoteDetailGetAll {
  id: number;
  product: ResponseProductGetAll;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface ResponseQuoteGetAll {
  id: number;
  client: ResponseUserGetAll;
  details: ResponseQuoteDetailGetAll[];
  total: number;
  createdAt: string;
  notes?: string;
}
