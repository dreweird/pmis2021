import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from '@ag-grid-community/angular';

import { SharedModule } from '../../shared/shared.module';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin.routing.module';
import { ObligationComponent } from './obligation/obligation.component';
import { PhysicalComponent } from './physical/physical.component';
import { DisbursementComponent } from './disbursement/disbursement.component';
import { BydistrictComponent } from './bydistrict/bydistrict.component';
import { BymunComponent } from './bymun/bymun.component';
import { PdzComponent } from './pdz/pdz.component';
import { BudgetComponent } from './budget/budget.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AddObjectDialogComponent } from './obligation/addObject-dialog.component';
import { LockedComponent } from './locked/locked.component';
import { MomentModule } from 'ngx-moment';
import { LogsComponent } from './logs/logs.component';
import { AreaComponent } from './area/area.component';
import { Bed123Component } from './bed123/bed123.component';
import { GraphComponent } from './graph/graph.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { MidyearComponent } from './midyear/midyear.component';
import { MidyearObComponent } from './midyear-ob/midyear-ob.component';
import { MidyearDisComponent } from './midyear-dis/midyear-dis.component';
import { MidyearAllComponent } from './midyear-all/midyear-all.component';

@NgModule({
  declarations: [
    AdminComponent,
    ObligationComponent,
    PhysicalComponent,
    DisbursementComponent,
    BydistrictComponent,
    BymunComponent,
    PdzComponent,
    BudgetComponent,
    AddObjectDialogComponent,
    LockedComponent,
    LogsComponent,
    AreaComponent,
    Bed123Component,
    GraphComponent,
    MidyearComponent,
    MidyearObComponent,
    MidyearDisComponent,
    MidyearAllComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    NgxMatSelectSearchModule,
    MomentModule,
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
  ],
  exports: [GraphComponent]
})
export class AdminModule {}
