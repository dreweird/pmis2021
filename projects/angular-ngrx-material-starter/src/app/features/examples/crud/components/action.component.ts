import { Component, Inject } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-action-component',
  template: `
    <div *ngIf="!params.node.group">
      <button type="button" mat-button (click)="upload()">
        <fa-icon icon="upload"></fa-icon>
      </button>
      <button type="button" mat-button>
        <a [routerLink]="['/doc/document', code]" routerLinkActive="active"
          ><fa-icon icon="eye"></fa-icon
        ></a>
      </button>
      <button type="button" mat-button color="accent" (click)="edit()">
        <fa-icon icon="edit"></fa-icon>
      </button>
      <button type="button" mat-button color="warn" (click)="delete()">
        <fa-icon icon="trash"></fa-icon>
      </button>
    </div>
  `
})
export class ActionComponent implements ICellRendererAngularComp {
  params: any;
  code;

  constructor() {}

  agInit(params: any): void {
    this.params = params;
    this.code = this.params.data.code;
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
