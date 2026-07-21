import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiConfiguration } from '../../api-configuration';
import { orderGetAll } from '../order-controller/action-get-all';
import { ResponseOrderGetAll } from '../../models/response-order-get-all';

export function apiOrderGetAll(
  http: HttpClient,
  config: ApiConfiguration
): Observable<ResponseOrderGetAll[]> {
  return orderGetAll(http, config.rootUrl).pipe(
    map(r => r.body as ResponseOrderGetAll[])
  );
}
