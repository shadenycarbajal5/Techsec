import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';
import { ResponseTechnicianGetAll } from '../../models/response-technician-get-all';

export interface TechnicianGetAllParams {}

export function technicianGetAll(
  http: HttpClient,
  rootUrl: string,
  params?: TechnicianGetAllParams,
  context?: HttpContext
): Observable<StrictHttpResponse<ResponseTechnicianGetAll[]>> {
  const rb = new RequestBuilder('GET', '/technician');
  return http.request(
    rb.build(rootUrl)
  ).pipe(
    filter((r: any) => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ResponseTechnicianGetAll[]>;
    })
  );
}
