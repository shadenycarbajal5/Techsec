export interface RequestOrderDetailInsert {
  productId: number;
  quantity: number;
}

export interface RequestOrderInsert {
  clientId?: number;
  quoteId?: number;
  details: RequestOrderDetailInsert[];
  shippingAddress: string;
}
