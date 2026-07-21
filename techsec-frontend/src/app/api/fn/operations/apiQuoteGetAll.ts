import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiConfiguration } from '../../api-configuration';
import { quoteGetAll } from '../quote-controller/action-get-all';
import { ResponseQuoteGetAll } from '../../models/response-quote-get-all';

export function apiQuoteGetAll(
  http: HttpClient,
  config: ApiConfiguration
): Observable<ResponseQuoteGetAll[]> {
  return quoteGetAll(http, config.rootUrl).pipe(
    map(r => r.body as ResponseQuoteGetAll[])
  );
}
