import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiConfiguration } from '../../api-configuration';
import { categoryGetAll } from '../category-controller/action-get-all';
import { ResponseCategoryGetAll } from '../../models/response-category-get-all';

export function apiCategoryGetAll(
  http: HttpClient,
  config: ApiConfiguration
): Observable<ResponseCategoryGetAll[]> {
  return categoryGetAll(http, config.rootUrl).pipe(
    map(r => r.body as ResponseCategoryGetAll[])
  );
}
