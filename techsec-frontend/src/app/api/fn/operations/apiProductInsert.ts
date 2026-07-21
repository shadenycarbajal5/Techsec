import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiConfiguration } from '../../api-configuration';
import { productInsert } from '../product-controller/action-insert';
import { RequestProductInsert } from '../../models/request-product-insert';
import { ResponseProductGetAll } from '../../models/response-product-get-all';

export function apiProductInsert(
  http: HttpClient,
  config: ApiConfiguration,
  body: RequestProductInsert
): Observable<ResponseProductGetAll> {
  return productInsert(http, config.rootUrl, { body }).pipe(
    map(r => r.body as ResponseProductGetAll)
  );
}
