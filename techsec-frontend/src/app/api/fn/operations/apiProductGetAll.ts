import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiConfiguration } from '../../api-configuration';
import { productGetAll } from '../product-controller/action-get-all';
import { ResponseProductGetAll } from '../../models/response-product-get-all';

export function apiProductGetAll(
  http: HttpClient,
  config: ApiConfiguration
): Observable<ResponseProductGetAll[]> {
  return productGetAll(http, config.rootUrl).pipe(
    map(r => r.body as ResponseProductGetAll[])
  );
}
