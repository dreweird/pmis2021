import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthGuardService } from '../../core/core.module';
import { UsersComponent } from './users/users.component';
import { ObligationComponent } from './obligation/obligation.component';
import { PhysicalComponent } from './physical/physical.component';
import { DisbursementComponent } from './disbursement/disbursement.component';
import { BudgetComponent } from './budget/budget.component';
import { LockedComponent } from './locked/locked.component';
import { LogsComponent } from './logs/logs.component';
import { AreaComponent } from './area/area.component';
import { BydistrictComponent } from './bydistrict/bydistrict.component';
import { BymunComponent } from './bymun/bymun.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'bydistrict',
        component: BydistrictComponent,
        data: { title: 'By District' },
        canActivate: [AuthGuardService]
      },
      {
        path: 'bymun',
        component: BymunComponent,
        data: { title: 'By Municipal' },
        canActivate: [AuthGuardService]
      },
      {
        path: 'area/:mfo_id',
        component: AreaComponent,
        data: { title: 'Area' },
        canActivate: [AuthGuardService]
      },
      {
        path: 'logs/:uid',
        component: LogsComponent,
        data: { title: 'Logs' },
        canActivate: [AuthGuardService]
      },
      {
        path: 'locked',
        component: LockedComponent,
        data: { title: 'Locked' },
        canActivate: [AuthGuardService]
      },
      {
        path: 'budget',
        component: BudgetComponent,
        data: { title: 'Budget' },
        canActivate: [AuthGuardService]
      },
      {
        path: 'obligation',
        component: ObligationComponent,
        data: { title: 'Obligation' },
        canActivate: [AuthGuardService]
      },
      {
        path: 'physical',
        component: PhysicalComponent,
        data: { title: 'Physical' },
        canActivate: [AuthGuardService]
      },
      {
        path: 'disburesment',
        component: DisbursementComponent,
        data: { title: 'Disbursement' },
        canActivate: [AuthGuardService]
      },
      {
        path: 'users',
        component: UsersComponent,
        data: { title: 'Users' },
        canActivate: [AuthGuardService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
