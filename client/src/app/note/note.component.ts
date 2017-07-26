import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UUID } from 'angular2-uuid';

import { NoteService } from './note.service';
import { Note } from './note.model';

@Component({
  selector: 'note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
  providers: [NoteService]
})
export class NoteComponent {
  private note: Note = new Note();
  private id: string;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private noteService: NoteService
    ) {
    var parameters = this.route.params.subscribe(params => {
      let id = params['id'];
      if (!id) {
        let guid = UUID.UUID();
        this.router.navigateByUrl('/' + guid);
      } else {
        this.noteService.getByCode(id, this.successCallback.bind(this), this.errorCallback.bind(this));
      }
    });
  }

  successCallback(data: any){
    this.note = new Note();
    this.note.Code = data.code;
    this.note.Content = data.content;
    this.note.Password = data.password;
    this.id = data._id;
  }

  errorCallback(data: any){

  }
}
