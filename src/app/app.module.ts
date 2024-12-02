import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OlympicService } from './core/services/olympic.service';
import { NgChartsModule } from 'ng2-charts';
import { DetailComponent } from './components/detail/detail.component';

@NgModule({
  declarations: [AppComponent,  NotFoundComponent],
  imports: [BrowserModule, AppRoutingModule, DashboardComponent, NgChartsModule, DetailComponent  ],
  providers: [provideHttpClient(), OlympicService],
  bootstrap: [AppComponent],
})
export class AppModule {}
