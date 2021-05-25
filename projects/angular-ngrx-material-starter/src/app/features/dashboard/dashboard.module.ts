import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { MomentModule } from 'ngx-moment';
import { AgGridModule } from '@ag-grid-community/angular';
import { graphCellRenderer } from './graphCellRenderer';
import { ChartComponent } from './chart/chart.component';
import { AdminModule } from '../admin/admin.module';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  declarations: [DashboardComponent, graphCellRenderer, ChartComponent],
  imports: [CommonModule, SharedModule, DashboardRoutingModule, MomentModule, 
AdminModule, AgGridModule.withComponents([graphCellRenderer]), 
NgCircleProgressModule.forRoot({
  // set defaults here
  radius: 100,
  outerStrokeWidth: 16,
  innerStrokeWidth: 8,
  outerStrokeColor: "#78C000",
  innerStrokeColor: "#C7E596",
  animationDuration: 300,

})]
})
export class DashboardModule {}
