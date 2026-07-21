export interface RequestQuoteDetailInsert {
  productId: number;
  quantity: number;
}

export interface RequestQuoteInsert {
  clientId?: number;
  details: RequestQuoteDetailInsert[];
  notes?: string;
}
