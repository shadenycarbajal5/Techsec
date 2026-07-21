import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';
import { RequestTechnicianInsert } from '../../models/request-technician-insert';
import { ResponseTechnicianGetAll } from '../../models/response-technician-get-all';

export interface TechnicianInsertParams {
  body: RequestTechnicianInsert;
}

export function technicianInsert(
  http: HttpClient,
  rootUrl: string,
  params: TechnicianInsertParams,
  context?: HttpContext
): Observable<StrictHttpResponse<ResponseTechnicianGetAll>> {
  const rb = new RequestBuilder('POST', '/technician', params.body);
  return http.request(
    rb.build(rootUrl)
  ).pipe(
    filter((r: any) => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ResponseTechnicianGetAll>;
    })
  );
}
