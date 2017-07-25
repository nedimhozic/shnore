import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoteComponent } from './note/note.component';

const appRoutes: Routes = [
    {
        path: '',
        component: NoteComponent
    }
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(appRoutes);
