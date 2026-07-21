import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';
import { RequestCategoryInsert } from '../../models/request-category-insert';
import { ResponseCategoryGetAll } from '../../models/response-category-get-all';

export interface CategoryInsertParams {
  body: RequestCategoryInsert;
}

export function categoryInsert(
  http: HttpClient,
  rootUrl: string,
  params: CategoryInsertParams,
  context?: HttpContext
): Observable<StrictHttpResponse<ResponseCategoryGetAll>> {
  const rb = new RequestBuilder('POST', '/category', params.body);
  return http.request(
    rb.build(rootUrl)
  ).pipe(
    filter((r: any) => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ResponseCategoryGetAll>;
    })
  );
}
