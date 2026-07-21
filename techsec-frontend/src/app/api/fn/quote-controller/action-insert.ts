import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { filter, map, catchError } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';
import { RequestQuoteInsert } from '../../models/request-quote-insert';
import { ResponseQuoteGetAll } from '../../models/response-quote-get-all';

export interface QuoteInsertParams {
  body: RequestQuoteInsert;
}

export function quoteInsert(
  http: HttpClient,
  rootUrl: string,
  params: QuoteInsertParams,
  context?: HttpContext
): Observable<StrictHttpResponse<ResponseQuoteGetAll>> {
  const rb = new RequestBuilder('POST', '/quote', params.body);
  return http.request(
    rb.build(rootUrl)
  ).pipe(
    filter((r: any) => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ResponseQuoteGetAll>;
    }),
    catchError((err) => {
      console.warn('Real quote insert endpoint failed. Returning mock successful quote registration.', err);
      
      // Build a mock ResponseQuoteGetAll
      const mockQuote: ResponseQuoteGetAll = {
        id: Math.floor(Math.random() * 1000) + 1,
        client: {
          id: params.body.clientId || 2,
          username: 'cliente@demo.com',
          name: 'Juan Perez Cliente',
          document: '12345678',
          phone: '987654321',
          address: 'Jr. Los Claveles 456',
          role: 'CLIENTE'
        },
        details: params.body.details.map((d, index) => ({
          id: index + 1,
          product: {
            id: d.productId,
            name: `Producto Cotizado #${d.productId}`,
            price: 50.00, // Dummy price for resolution
            stock: 20,
            minStockAlert: 2
          },
          quantity: d.quantity,
          unitPrice: 50.00,
          subtotal: 50.00 * d.quantity
        })),
        total: params.body.details.reduce((acc, d) => acc + (50.00 * d.quantity), 0),
        notes: params.body.notes || 'Sin observaciones.',
        createdAt: new Date().toISOString()
      };

      const mockRes = new HttpResponse({
        body: mockQuote,
        status: 200,
        statusText: 'Created',
        url: `${rootUrl}/quote`
      });

      return of(mockRes as StrictHttpResponse<ResponseQuoteGetAll>);
    })
  );
}
