import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';
import { RequestContractInsert } from '../../models/request-contract-insert';
import { ResponseContractGetAll } from '../../models/response-contract-get-all';

export interface ContractInsertParams {
  body: RequestContractInsert;
}

export function contractInsert(
  http: HttpClient,
  rootUrl: string,
  params: ContractInsertParams,
  context?: HttpContext
): Observable<StrictHttpResponse<ResponseContractGetAll>> {
  const rb = new RequestBuilder('POST', '/contract', params.body);
  return http.request(
    rb.build(rootUrl)
  ).pipe(
    filter((r: any) => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ResponseContractGetAll>;
    })
  );
}
