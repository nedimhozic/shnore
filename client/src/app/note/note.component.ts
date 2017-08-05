import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UUID } from 'angular2-uuid';

import { NoteService } from './note.service';
import { Note } from './note.model';
import { TriggerService } from '../common/trigger.service';
import { ModalType } from '../modal/modal-type.enum';

@Component({
  selector: 'note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
  providers: [NoteService]
})
export class NoteComponent {
  @ViewChild('modal') modal: any;
  private note: Note = new Note();
  private id: string;
  private typingTimer: number;
  private doneTypingInterval: Number = 800;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private noteService: NoteService,
    private trigger: TriggerService
  ) {
    var parameters = this.route.params.subscribe(params => {
      this.id = params['id'];
      if (!this.id) {
        let guid = UUID.UUID();
        this.router.navigateByUrl('/' + guid);
      } else {
        this.noteService.getByCode(this.id, this.successCallback.bind(this), this.errorCallback.bind(this));
      }
    });

    this.handleSubjects();
  }

  handleSubjects() {
    this.trigger.openModalSub.subscribe((type: ModalType) => {
      this.modal.show(type);
    });

    this.trigger.setPasswordSub.subscribe((password: string) => {
      this.note.password = password;
      this.noteService.setPassword(this.note, null, null);
    });

    this.trigger.confirmPasswordSub.subscribe((password: string) => {
      this.noteService.getToken(this.id, password, this.getTokenSuccess.bind(this), this.errorCallback.bind(this))
    });
  }

  getTokenSuccess() {
    this.noteService.getByCode(this.id, this.successCallback.bind(this), this.errorCallback.bind(this));
  }

  successCallback(data: any) {
    this.note = new Note();
    this.note.code = data.code;
    this.note.content = data.content;
    this.note.password = data.password;
    this.note._id = data._id;
  }

  errorCallback(data: any) {
    this.trigger.openModal(ModalType.Confirm);
  }

  onKeyup() {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(this.doneTyping.bind(this), this.doneTypingInterval);
  }

  onKeydown() {
    clearTimeout(this.typingTimer);
  }

  doneTyping() {
    this.noteService.updateNote(this.note, null, null);
  }
}
