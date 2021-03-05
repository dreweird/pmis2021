import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { DashboardComponent } from './dashboard.component';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: { title: 'Dashboard' }
  },
  {
    path: 'chart/:pid/:name',
    component: ChartComponent,
    data: { title: 'Chart' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
