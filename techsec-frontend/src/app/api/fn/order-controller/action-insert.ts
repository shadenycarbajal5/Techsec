import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';
import { RequestOrderInsert } from '../../models/request-order-insert';
import { ResponseOrderGetAll } from '../../models/response-order-get-all';

export interface OrderInsertParams {
  body: RequestOrderInsert;
}

export function orderInsert(
  http: HttpClient,
  rootUrl: string,
  params: OrderInsertParams,
  context?: HttpContext
): Observable<StrictHttpResponse<ResponseOrderGetAll>> {
  const rb = new RequestBuilder('POST', '/order', params.body);
  return http.request(
    rb.build(rootUrl)
  ).pipe(
    filter((r: any) => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ResponseOrderGetAll>;
    })
  );
}
