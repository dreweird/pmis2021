import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from '@ag-grid-community/angular';

import { SharedModule } from '../../shared/shared.module';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin.routing.module';
import { CommodityComponent } from './commodity/commodity.component';
import { ActionComponent } from './action/action.component';
import { PhotoRendererComponent } from './photo-renderer/photo-renderer.component';
import { AddEntryComponent } from './add-entry/add-entry.component';
import { Year2020Component } from './year2020/year2020.component';
import { AddYearComponent } from './add-year/add-year.component';
import { UploadEntryComponent } from './upload-entry/upload-entry.component';
import { ActionDeleteComponent } from './action-delete/action-delete.component';

@NgModule({
  declarations: [
    AdminComponent,
    CommodityComponent,
    ActionComponent,
    PhotoRendererComponent,
    AddEntryComponent,
    Year2020Component,
    AddYearComponent,
    UploadEntryComponent,
    ActionDeleteComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    AgGridModule.withComponents([
      ActionComponent,
      PhotoRendererComponent,
      ActionDeleteComponent
    ])
  ],
  entryComponents: [AddEntryComponent, AddYearComponent, UploadEntryComponent]
})
export class AdminModule {}
