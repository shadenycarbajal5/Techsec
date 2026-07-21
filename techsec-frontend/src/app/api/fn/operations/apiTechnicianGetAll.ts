import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiConfiguration } from '../../api-configuration';
import { technicianGetAll } from '../technician-controller/action-get-all';
import { ResponseTechnicianGetAll } from '../../models/response-technician-get-all';

export function apiTechnicianGetAll(
  http: HttpClient,
  config: ApiConfiguration
): Observable<ResponseTechnicianGetAll[]> {
  return technicianGetAll(http, config.rootUrl).pipe(
    map(r => r.body as ResponseTechnicianGetAll[])
  );
}
