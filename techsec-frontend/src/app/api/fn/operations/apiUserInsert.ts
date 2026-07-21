import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiConfiguration } from '../../api-configuration';
import { userInsert } from '../user-controller/action-insert';
import { RequestUserInsert } from '../../models/request-user-insert';
import { ResponseUserGetAll } from '../../models/response-user-get-all';

export function apiUserInsert(
  http: HttpClient,
  config: ApiConfiguration,
  body: RequestUserInsert
): Observable<ResponseUserGetAll> {
  return userInsert(http, config.rootUrl, { body }).pipe(
    map(r => r.body as ResponseUserGetAll)
  );
}
