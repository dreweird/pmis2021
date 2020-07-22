import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'anms-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionComponent implements ICellRendererAngularComp {
  params: any;

  constructor() {}

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  upload() {
    this.params.context.componentParent.methodFromParentUpload(
      this.params.data
    );
  }

  delete() {
    this.params.context.componentParent.methodFromParentDelete(
      this.params.data
    );
  }

  edit() {
    this.params.context.componentParent.methodFromParentEdit(this.params.data);
  }
}
