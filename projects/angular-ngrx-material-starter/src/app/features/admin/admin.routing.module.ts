import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CommodityComponent } from './commodity/commodity.component';
import { AuthGuardService } from '../../core/core.module';
import { Year2020Component } from './year2020/year2020.component';
import { UsersComponent } from './users/users.component';
const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'commodity',
        pathMatch: 'full'
      },
      {
        path: 'commodity',
        component: CommodityComponent,
        data: { title: 'Commodity' },
        canActivate: [AuthGuardService]
      },
      {
        path: 'year2020',
        component: Year2020Component,
        data: { title: '2020' },
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
