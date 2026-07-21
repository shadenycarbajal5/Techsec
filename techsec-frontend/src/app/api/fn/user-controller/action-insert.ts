import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';
import { RequestUserInsert } from '../../models/request-user-insert';
import { ResponseUserGetAll } from '../../models/response-user-get-all';

export interface UserInsertParams {
  body: RequestUserInsert;
}

export function userInsert(
  http: HttpClient,
  rootUrl: string,
  params: UserInsertParams,
  context?: HttpContext
): Observable<StrictHttpResponse<ResponseUserGetAll>> {
  const rb = new RequestBuilder('POST', '/user', params.body);
  return http.request(
    rb.build(rootUrl)
  ).pipe(
    filter((r: any) => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ResponseUserGetAll>;
    })
  );
}
