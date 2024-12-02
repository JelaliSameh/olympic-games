import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailComponent } from './components/detail/detail.component';


  
  
  const routes: Routes = [
    
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Route par défaut
    { path: 'dashboard', component: DashboardComponent },
    { path: 'detail/:country', component: DetailComponent }, // Paramètre dynamique :country


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
