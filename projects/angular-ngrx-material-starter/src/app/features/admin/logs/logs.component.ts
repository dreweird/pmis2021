import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { PmisService } from '../../../core/services/pmis.service';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { Module } from '@ag-grid-community/all-modules';
import * as moment from 'moment';

@Component({
  selector: 'anms-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogsComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  private routeSub: Subscription;
  gridApi: any;
  gridColumnApi: any;
  columnDefs: any;
  defaultColDef: any;
  rowData: any;
  frameworkComponents: any;
  context: any;
  rowSelection: any;
  columnTypes: any;
  autoGroupColumnDef: any;
  components: any;

  public modules: Module[] = [ClientSideRowModelModule];

  constructor(
    private route: ActivatedRoute,
    private pmisService: PmisService,
    private cd: ChangeDetectorRef
  ) {
    this.columnDefs = [
      { headerName: 'BEDS', field: 'beds' },
      { headerName: 'Program', field: 'header_main' },
      { headerName: 'Header', field: 'header_subindicator' },
      { headerName: 'Mfo Name', field: 'mfo_name' },
      { headerName: 'Field', field: 'month' },
      { headerName: 'Old Value', field: 'old_value' },
      { headerName: 'New Value', field: 'new_value' },
      {
        headerName: 'Date Updated',
        field: 'date_updated',
        valueFormatter: function(params) {
          return moment(new Date(params.value)).format('lll');
        }
      },
      {
        headerName: 'Relative Time',
        field: 'date_updated',
        valueFormatter: function(params) {
          return moment(new Date(params.value)).fromNow();
        }
      }
    ];

    this.defaultColDef = { sortable: true, resizable: true, filter: true };
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      let uid = params['uid'];
      this.getAllLogs(uid);
    });
  }

  getAllLogs(uid) {
    this.pmisService.getAllLogs(uid).subscribe(data => {
      console.log(data);
      this.rowData = data;
      this.cd.markForCheck();
    });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
