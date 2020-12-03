import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view.component';
import { SharedModule } from '../../shared/shared.module';
import { ViewRoutingModule } from './view.routing.module';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [ViewComponent],
  imports: [CommonModule, SharedModule, ViewRoutingModule, ChartsModule]
})
export class ViewModule {}
