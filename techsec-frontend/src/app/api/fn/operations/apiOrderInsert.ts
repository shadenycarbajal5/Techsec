import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiConfiguration } from '../../api-configuration';
import { orderInsert } from '../order-controller/action-insert';
import { RequestOrderInsert } from '../../models/request-order-insert';
import { ResponseOrderGetAll } from '../../models/response-order-get-all';

export function apiOrderInsert(
  http: HttpClient,
  config: ApiConfiguration,
  body: RequestOrderInsert
): Observable<ResponseOrderGetAll> {
  return orderInsert(http, config.rootUrl, { body }).pipe(
    map(r => r.body as ResponseOrderGetAll)
  );
}
