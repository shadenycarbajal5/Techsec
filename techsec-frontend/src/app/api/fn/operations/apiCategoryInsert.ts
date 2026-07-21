import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiConfiguration } from '../../api-configuration';
import { categoryInsert } from '../category-controller/action-insert';
import { RequestCategoryInsert } from '../../models/request-category-insert';
import { ResponseCategoryGetAll } from '../../models/response-category-get-all';

export function apiCategoryInsert(
  http: HttpClient,
  config: ApiConfiguration,
  body: RequestCategoryInsert
): Observable<ResponseCategoryGetAll> {
  return categoryInsert(http, config.rootUrl, { body }).pipe(
    map(r => r.body as ResponseCategoryGetAll)
  );
}
