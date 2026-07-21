import { HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

export class RequestBuilder {
  private _headers = new HttpHeaders();
  private _params = new HttpParams();

  constructor(
    public method: string,
    public path: string,
    public body?: any
  ) {}

  header(name: string, value: any): void {
    if (value !== undefined && value !== null) {
      this._headers = this._headers.set(name, String(value));
    }
  }

  query(name: string, value: any): void {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach(v => {
          this._params = this._params.append(name, String(v));
        });
      } else {
        this._params = this._params.set(name, String(value));
      }
    }
  }

  build(rootUrl: string): HttpRequest<any> {
    const url = `${rootUrl}${this.path}`;
    return new HttpRequest<any>(this.method, url, this.body, {
      headers: this._headers,
      params: this._params,
      responseType: 'json'
    });
  }
}
