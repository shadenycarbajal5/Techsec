import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiConfiguration } from '../../api-configuration';
import { appointmentGetAvailability, ResponseAppointmentAvailability } from '../appointment-controller/action-get-availability';

export function apiAppointmentGetAvailability(
  http: HttpClient,
  config: ApiConfiguration,
  date: string
): Observable<ResponseAppointmentAvailability> {
  return appointmentGetAvailability(http, config.rootUrl, { date }).pipe(
    map(r => r.body as ResponseAppointmentAvailability)
  );
}
