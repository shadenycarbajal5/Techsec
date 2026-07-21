import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiConfiguration } from '../../api-configuration';
import { userGetAll } from '../user-controller/action-get-all';
import { ResponseUserGetAll } from '../../models/response-user-get-all';

export function apiUserGetAll(
  http: HttpClient,
  config: ApiConfiguration
): Observable<ResponseUserGetAll[]> {
  return userGetAll(http, config.rootUrl).pipe(
    map(r => r.body as ResponseUserGetAll[])
  );
}
