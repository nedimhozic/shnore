import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NoteComponent } from './note/note.component';

import { BaseService } from './common/base.service';

@NgModule({
  declarations: [
    AppComponent,
    NoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [BaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
