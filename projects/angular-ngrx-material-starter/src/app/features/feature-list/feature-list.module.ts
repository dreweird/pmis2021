import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { FeatureListComponent } from './feature-list/feature-list.component';
import { FeatureListRoutingModule } from './feature-list-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { MomentModule } from 'ngx-moment';
import { DashboardProgramComponent } from './dashboard-program/dashboard-program.component';

@NgModule({
  declarations: [FeatureListComponent, DashboardProgramComponent],
  imports: [
    CommonModule,
    SharedModule,
    FeatureListRoutingModule,
    AgGridModule.withComponents([]),
    MomentModule
  ]
})
export class FeatureListModule {}
