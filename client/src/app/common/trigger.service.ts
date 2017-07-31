import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ModalType } from '../modal/modal-type.enum';

@Injectable()
export class TriggerService {
    public openModalSub = new Subject();
    public setPasswordSub = new Subject();
    public confirmPasswordSub = new Subject();

    constructor() { }
    
    public openModal(type: ModalType) {
        this.openModalSub.next(type);
    }

    public setPassword(password: string){
        this.setPasswordSub.next(password);
    }

    public confirmPassword(password: string){
        this.confirmPasswordSub.next(password);
    }
}