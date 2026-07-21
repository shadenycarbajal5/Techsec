export interface RequestProductInsert {
  name: string;
  categoryId: number;
  description?: string;
  specifications?: string;
  price: number;
  stock: number;
  minStockAlert: number;
}
