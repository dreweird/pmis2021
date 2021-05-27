import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BayanihanRoutingModule } from './bayanihan-routing.module';
import { BedsComponent } from './beds/beds.component';
import { ChartsComponent } from './charts/charts.component';
import { AgGridModule } from '@ag-grid-community/angular';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [BedsComponent, ChartsComponent],
  imports: [
    CommonModule,
    BayanihanRoutingModule,
    SharedModule,
    AgGridModule.withComponents([]),
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    
    })
  ]
})
export class BayanihanModule { }
