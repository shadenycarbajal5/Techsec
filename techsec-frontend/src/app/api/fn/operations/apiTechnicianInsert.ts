import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiConfiguration } from '../../api-configuration';
import { technicianInsert } from '../technician-controller/action-insert';
import { RequestTechnicianInsert } from '../../models/request-technician-insert';
import { ResponseTechnicianGetAll } from '../../models/response-technician-get-all';

export function apiTechnicianInsert(
  http: HttpClient,
  config: ApiConfiguration,
  body: RequestTechnicianInsert
): Observable<ResponseTechnicianGetAll> {
  return technicianInsert(http, config.rootUrl, { body }).pipe(
    map(r => r.body as ResponseTechnicianGetAll)
  );
}
