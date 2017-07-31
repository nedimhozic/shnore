import { Component } from '@angular/core';
import { TriggerService } from './common/trigger.service';
import { ModalType } from './modal/modal-type.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private trigger: TriggerService){

  }

  openModal(){
    this.trigger.openModal(ModalType.Set);
  }
}
