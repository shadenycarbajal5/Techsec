import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';
import { RequestProductInsert } from '../../models/request-product-insert';
import { ResponseProductGetAll } from '../../models/response-product-get-all';

export interface ProductInsertParams {
  body: RequestProductInsert;
}

export function productInsert(
  http: HttpClient,
  rootUrl: string,
  params: ProductInsertParams,
  context?: HttpContext
): Observable<StrictHttpResponse<ResponseProductGetAll>> {
  const rb = new RequestBuilder('POST', '/product', params.body);
  return http.request(
    rb.build(rootUrl)
  ).pipe(
    filter((r: any) => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ResponseProductGetAll>;
    })
  );
}
