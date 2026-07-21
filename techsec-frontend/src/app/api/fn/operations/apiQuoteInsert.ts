import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiConfiguration } from '../../api-configuration';
import { quoteInsert } from '../quote-controller/action-insert';
import { RequestQuoteInsert } from '../../models/request-quote-insert';
import { ResponseQuoteGetAll } from '../../models/response-quote-get-all';

export function apiQuoteInsert(
  http: HttpClient,
  config: ApiConfiguration,
  body: RequestQuoteInsert
): Observable<ResponseQuoteGetAll> {
  return quoteInsert(http, config.rootUrl, { body }).pipe(
    map(r => r.body as ResponseQuoteGetAll)
  );
}
