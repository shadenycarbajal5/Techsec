import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

export interface AppointmentGetAvailabilityParams {
  date: string;
}

export interface ResponseAppointmentAvailability {
  date: string;
  mananaDisponible: boolean;
  tardeDisponible: boolean;
}

export function appointmentGetAvailability(
  http: HttpClient,
  rootUrl: string,
  params: AppointmentGetAvailabilityParams,
  context?: HttpContext
): Observable<StrictHttpResponse<ResponseAppointmentAvailability>> {
  const rb = new RequestBuilder('GET', '/appointment/availability');
  rb.query('date', params.date);
  return http.request(
    rb.build(rootUrl)
  ).pipe(
    filter((r: any) => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ResponseAppointmentAvailability>;
    })
  );
}
