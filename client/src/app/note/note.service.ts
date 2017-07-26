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
        this.baseService.get('note/code/' + code)
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
        this.baseService.put('note', note)
        .subscribe(
            data => {
                if(successCallback) successCallback(data);
            },
            err => {
                if (err.status >= 400 && err.status < 500) {
                    if(errorCallback) errorCallback(JSON.parse(err._body).message);
                }
                else {
                    throw new Error(err);
                }
            });
    }
}