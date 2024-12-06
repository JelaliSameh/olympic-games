import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { provideRouter, Routes } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { OlympicService } from './core/services/olympic.service';
import { provideHttpClient } from '@angular/common/http';

if (environment.production) {
  enableProdMode();
}

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'detail/:country', loadComponent: () => import('./components/detail/detail.component').then(m => m.DetailComponent) }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    OlympicService,
    provideHttpClient(), // Fournir HttpClientModule
  ],
}).catch(err => console.error(err));
