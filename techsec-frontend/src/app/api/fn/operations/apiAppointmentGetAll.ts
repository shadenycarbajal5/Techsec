import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiConfiguration } from '../../api-configuration';
import { appointmentGetAll } from '../appointment-controller/action-get-all';
import { ResponseAppointmentGetAll } from '../../models/response-appointment-get-all';

export function apiAppointmentGetAll(
  http: HttpClient,
  config: ApiConfiguration
): Observable<ResponseAppointmentGetAll[]> {
  return appointmentGetAll(http, config.rootUrl).pipe(
    map(r => r.body as ResponseAppointmentGetAll[])
  );
}
