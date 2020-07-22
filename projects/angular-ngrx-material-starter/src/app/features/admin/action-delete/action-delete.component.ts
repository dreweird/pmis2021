import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'anms-action-delete',
  templateUrl: './action-delete.component.html',
  styleUrls: ['./action-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionDeleteComponent implements ICellRendererAngularComp {
  params: any;

  constructor() {}

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  delete() {
    this.params.context.componentParent.methodFromParentDelete(
      this.params.data
    );
  }
}
