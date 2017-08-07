import { Component } from '@angular/core';
import { TriggerService } from './common/trigger.service';
import { ModalType } from './modal/modal-type.enum';
import { DatePipe } from '@angular/common';
import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public today: Date = new Date();
  public showHelp: boolean = false;
  public firstVisitKey = 'firstVisit_636C8F1B4A654D5FA2183348F6E2F8E9';

  constructor(
    private trigger: TriggerService,
    private cookie: CookieService) {
      let firstVisitCookie = this.cookie.get(this.firstVisitKey);
      if(!firstVisitCookie) {
        this.showHelp = true;
        this.cookie.put(this.firstVisitKey, 'shnore');
      }
  }

  openModal() {
    this.trigger.openModal(ModalType.Set);
  }

  closeHelp() {
    this.showHelp = false;
  }
}
