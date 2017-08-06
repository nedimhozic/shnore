import { Injectable } from '@angular/core';
import { Http, Request, Response, Headers, RequestOptionsArgs, RequestMethod } from "@angular/http";
import { RequestArgs } from "@angular/http/src/interfaces";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class BaseService {
    protected headers: Headers;
    protected SERVICE_URL: string = 'http://localhost:3000/api/' // 'https://shnoreback.herokuapp.com/api/'

    constructor(private _http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    get(url: string, headers?: Headers): Observable<any> {
        if (!headers) headers = this.headers;

        return this._http.get(this.SERVICE_URL + url, { headers: headers })
            .map((res: Response) => res.json())
            .catch(e => { 
                return this.handleError(e); 
            });
    }


    post(url: string, data: any, headers?: Headers): Observable<any> {
        if (!headers) headers = this.headers;

        return this._http.post(this.SERVICE_URL + url, data, { headers: headers })
            .map((res: Response) => BaseService.json(res))
            .catch(e => { return this.handleError(e); });
    }

    put(url: string, data: any, headers?: Headers): Observable<any> {
        if (!headers) headers = this.headers;

        return this._http.put(this.SERVICE_URL + url, data, { headers: headers })
            .map((res: Response) => BaseService.json(res))
            .catch(e => { return this.handleError(e); });
    }

    remove(url: string, data?: any, headers?: Headers): Observable<any> {
        if (!headers) headers = this.headers;

        return this._http.delete(this.SERVICE_URL + url, { headers: headers })
            .map((res: Response) => BaseService.json(res))
            .catch(e => { return this.handleError(e); });
    }

    private static json(res: Response): any {
        return res.text() === "" ? res : res.json();
    }

    private handleError(error: any) {
        return Observable.throw(error);
    }
}
