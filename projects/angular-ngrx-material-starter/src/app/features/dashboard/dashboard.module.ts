import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, SharedModule, DashboardRoutingModule, MomentModule]
})
export class DashboardModule {}
