import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiConfiguration } from '../../api-configuration';
import { contractGetAll } from '../contract-controller/action-get-all';
import { ResponseContractGetAll } from '../../models/response-contract-get-all';

export function apiContractGetAll(
  http: HttpClient,
  config: ApiConfiguration
): Observable<ResponseContractGetAll[]> {
  return contractGetAll(http, config.rootUrl).pipe(
    map(r => r.body as ResponseContractGetAll[])
  );
}
