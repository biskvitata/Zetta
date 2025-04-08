import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/other/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'form', pathMatch: 'full' },
  {
    path: 'form',
    loadComponent: () =>
      import('./components/form/form.component').then(
        (mod) => mod.FormComponent,
      ),
    title: 'Form Builder',
  },
  { path: '**', component: PageNotFoundComponent },
];