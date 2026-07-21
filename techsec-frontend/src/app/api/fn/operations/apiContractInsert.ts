import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiConfiguration } from '../../api-configuration';
import { contractInsert } from '../contract-controller/action-insert';
import { RequestContractInsert } from '../../models/request-contract-insert';
import { ResponseContractGetAll } from '../../models/response-contract-get-all';

export function apiContractInsert(
  http: HttpClient,
  config: ApiConfiguration,
  body: RequestContractInsert
): Observable<ResponseContractGetAll> {
  return contractInsert(http, config.rootUrl, { body }).pipe(
    map(r => r.body as ResponseContractGetAll)
  );
}
