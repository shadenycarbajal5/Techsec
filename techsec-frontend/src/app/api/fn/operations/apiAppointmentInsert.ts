import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiConfiguration } from '../../api-configuration';
import { appointmentInsert } from '../appointment-controller/action-insert';
import { RequestAppointmentInsert } from '../../models/request-appointment-insert';
import { ResponseAppointmentGetAll } from '../../models/response-appointment-get-all';

export function apiAppointmentInsert(
  http: HttpClient,
  config: ApiConfiguration,
  body: RequestAppointmentInsert
): Observable<ResponseAppointmentGetAll> {
  return appointmentInsert(http, config.rootUrl, { body }).pipe(
    map(r => r.body as ResponseAppointmentGetAll)
  );
}
