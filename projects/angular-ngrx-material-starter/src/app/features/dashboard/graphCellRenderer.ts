import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  template: `
  <a (click)="navigate()" target="_blank" rel="noopener"> See Chart </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class graphCellRenderer implements ICellRendererAngularComp {
  params: any;

  constructor(private router: Router ) {}

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  navigate(){
      this.router.navigate(['/dashboard/chart', this.params.data.pid, this.params.data.name]);
  }


}
