import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'anms-photo-renderer',
  templateUrl: './photo-renderer.component.html',
  styleUrls: ['./photo-renderer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoRendererComponent implements ICellRendererAngularComp {
  url: any;

  constructor() {}

  agInit(params: any): void {
    // this.url = 'http://localhost:4200/assets/' + params.data.imageSrc;
    // this.url = 'http://172.16.130.20/files/apmis/' + params.data.imageSrc;
    //this.url = 'http://210.5.100.45/files/apmis/' + params.data.imageSrc;
    this.url = 'http://172.16.128.163:3900/images/' + params.data.imageSrc;
  }

  refresh(): boolean {
    return false;
  }
}
