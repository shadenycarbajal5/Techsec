import { ResponseCategoryGetAll } from './response-category-get-all';

export interface ResponseProductGetAll {
  id: number;
  name: string;
  category?: ResponseCategoryGetAll;
  description?: string;
  specifications?: string;
  price: number;
  stock: number;
  minStockAlert: number;
  imageUrl?: string;
}
