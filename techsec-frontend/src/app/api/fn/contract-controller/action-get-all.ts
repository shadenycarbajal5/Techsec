import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';
import { ResponseContractGetAll } from '../../models/response-contract-get-all';

export interface ContractGetAllParams {}

export function contractGetAll(
  http: HttpClient,
  rootUrl: string,
  params?: ContractGetAllParams,
  context?: HttpContext
): Observable<StrictHttpResponse<ResponseContractGetAll[]>> {
  const rb = new RequestBuilder('GET', '/contract');
  return http.request(
    rb.build(rootUrl)
  ).pipe(
    filter((r: any) => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ResponseContractGetAll[]>;
    })
  );
}
