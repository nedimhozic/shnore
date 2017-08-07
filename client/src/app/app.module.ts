import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NoteComponent } from './note/note.component';
import { ModalComponent } from './modal/modal.component';
import { HelpComponent } from './help/help.component';

import { BaseService } from './common/base.service';
import { TriggerService } from './common/trigger.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@NgModule({
  declarations: [
    AppComponent,
    NoteComponent,
    ModalComponent,
    HelpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [BaseService, TriggerService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
