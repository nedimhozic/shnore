import { Injectable } from '@angular/core';
import {
    RequestOptions,
    RequestMethod,
    RequestOptionsArgs,
    Http,
    Headers
} from '@angular/http';
import 'rxjs/add/operator/map';
import { BaseService } from '../common/base.service';
import { Note } from './note.model';

@Injectable()
export class NoteService {

    constructor(private baseService: BaseService) { }

    getByCode(code: string, successCallback: (data: any) => void, errorCallback: (data: any) => void) {
        let headers = new Headers();
        if (localStorage.getItem('shnore')) {
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            headers.append('token', localStorage.getItem('shnore'));
        }
        this.baseService.get('note/code/' + code, headers)
            .subscribe(
            data => {
                if (data.status == 203) {
                    return errorCallback(data.data);
                }

                if (data.token) {
                    localStorage.setItem('shnore', data.token);
                } else {
                    localStorage.removeItem('shnore');
                }

                successCallback(data.data);
            },
            err => {
                if (err.status == 401) {
                    if (errorCallback) errorCallback(401);
                    return;
                }
                if (err.status >= 400 && err.status < 500) {
                    errorCallback(JSON.parse(err._body).message);
                }
                else {
                    throw new Error(err);
                }
            });
    }

    createNote(note: Note, successCallback: (data: any) => void, errorCallback: (data: any) => void) {
        this.baseService.post('note', note)
            .subscribe(
            data => successCallback(data),
            err => {
                if (err.status >= 400 && err.status < 500) {
                    errorCallback(JSON.parse(err._body).message);
                }
                else {
                    throw new Error(err);
                }
            });
    }

    updateNote(note: Note, successCallback: (data: any) => void, errorCallback: (data: any) => void) {
        let headers;
        if (localStorage.getItem('shnore')) {
            headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            headers.append('token', localStorage.getItem('shnore'));
        }
        this.baseService.put('note', note, headers)
            .subscribe(
            data => {
                if (successCallback) successCallback(data);
            },
            err => {
                if (err.status >= 400 && err.status < 500) {
                    if (errorCallback) errorCallback(JSON.parse(err._body).message);
                }
                else {
                    throw new Error(err);
                }
            });
    }

    setPassword(note: Note, successCallback: (data: any) => void, errorCallback: (data: any) => void) {
        if (!note.code) return;
        this.baseService.put('note/password/' + note.code, note)
            .subscribe(
            data => {
                if (!data) return;
                localStorage.setItem('shnore', data);
            },
            err => {
                throw new Error(err);
            });
    }

    getToken(code:string, password: string, successCallback: () => void, errorCallback: (data: any) => void) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('token', password);
        this.baseService.get('note/token/' + code, headers)
            .subscribe(
            data => {
                localStorage.setItem('shnore', data);
                successCallback();
            },
            err => {
                if (err.status >= 400 && err.status < 500) {
                    if (errorCallback) errorCallback(JSON.parse(err._body).message);
                }
                else {
                    throw new Error(err);
                }
            }
            )
    }
}