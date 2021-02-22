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
    AreaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    NgxMatSelectSearchModule,
    MomentModule,
    AgGridModule.withComponents([])
  ]
})
export class AdminModule {}
