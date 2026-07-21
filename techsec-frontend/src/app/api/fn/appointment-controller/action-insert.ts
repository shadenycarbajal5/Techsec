import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';
import { RequestAppointmentInsert } from '../../models/request-appointment-insert';
import { ResponseAppointmentGetAll } from '../../models/response-appointment-get-all';

export interface AppointmentInsertParams {
  body: RequestAppointmentInsert;
}

export function appointmentInsert(
  http: HttpClient,
  rootUrl: string,
  params: AppointmentInsertParams,
  context?: HttpContext
): Observable<StrictHttpResponse<ResponseAppointmentGetAll>> {
  const rb = new RequestBuilder('POST', '/appointment', params.body);
  return http.request(
    rb.build(rootUrl)
  ).pipe(
    filter((r: any) => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ResponseAppointmentGetAll>;
    })
  );
}
