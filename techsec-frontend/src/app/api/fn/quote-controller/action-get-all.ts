import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';
import { ResponseQuoteGetAll } from '../../models/response-quote-get-all';

export interface QuoteGetAllParams {}

export function quoteGetAll(
  http: HttpClient,
  rootUrl: string,
  params?: QuoteGetAllParams,
  context?: HttpContext
): Observable<StrictHttpResponse<ResponseQuoteGetAll[]>> {
  const rb = new RequestBuilder('GET', '/quote');
  return http.request(
    rb.build(rootUrl)
  ).pipe(
    filter((r: any) => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ResponseQuoteGetAll[]>;
    })
  );
}
