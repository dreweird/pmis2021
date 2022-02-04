import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input,
  OnChanges
} from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/animations/route.animations';
import { PmisService } from '../../../core/services/pmis.service';
import { MatDialog } from '@angular/material/dialog';

import { LocalStorageService } from '../../../core/core.module';
import { Module } from '@ag-grid-community/all-modules';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import * as moment from 'moment';
import * as custom from '../obligation/valueGetter.js';

@Component({
  selector: 'anms-disbursement',
  templateUrl: './disbursement.component.html',
  styleUrls: ['./disbursement.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisbursementComponent implements OnInit, OnChanges {
  @Input() pid: number = 0;
  @Input() name: string = '';

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  public modules: Module[] = AllModules;

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
  aggFuncs: any;
  user: any;
  canEdit: any;
  date_updated: any;
  excelStyles: any;
  verified = 0;

  ngOnChanges(changes: any) {
    this.pid = changes.pid.currentValue;
    this.getRow(this.pid);
    this.lastUpdated(this.pid);
  }

  getRow(pid) {
    this.apmisService.getPhysical(pid).subscribe(data => {
      this.rowData = data;
      this.cd.markForCheck();
    });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  currencyFormatter(params) {
    const number = parseFloat(params.value);
    if (params.value === undefined || params.value === null) {
      return null;
    }
    return number.toLocaleString('en-us', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  onCellValueChanged(event: any) {
    if (isNaN(+event.newValue)) {
      alert('Invalid entry...input numbers only');
      event.newValue = null;
    } else {
      this.apmisService
        .updatePhysical(event.colDef.field, event.newValue, event.data.mfo_id)
        .subscribe(data => {
          if (!data) {
            alert('something wrong happen!');
          }
        });
      let entries = {
        pid: this.pid,
        uid: this.user.user_id,
        mfo_id: event.data.mfo_id,
        beds: 3,
        month: event.colDef.field,
        old_value: event.oldValue,
        new_value: event.newValue
      };
      this.apmisService.addLogs(entries).subscribe(data => {
        if (!data) {
          alert('something wrong happen with Logs!');
        }
      });
    }
  }

  lastUpdated(pid) {
    this.apmisService.lastUpdated(pid, 3).subscribe(data => {
      if (data === undefined) this.date_updated = '';
      else this.date_updated = data;
      this.cd.markForCheck();
    });
  }

  constructor(
    public apmisService: PmisService,
    private cd: ChangeDetectorRef,
    public dialog: MatDialog,
    private localStorageService: LocalStorageService
  ) {
    this.user = this.localStorageService.getItem('AUTH');
    this.canEdit = this.user.b == 2;
    this.verified = this.user.verified;

    this.columnDefs = [
      {
        headerName: 'header_main',
        field: 'header_main',
        rowGroup: true,
        hide: true
      },
      {
        headerName: 'header_program',
        field: 'header_program',
        rowGroup: true,
        hide: true
      },
      {
        headerName: 'header_mfo',
        field: 'header_mfo',
        rowGroup: true,
        hide: true
      },
      {
        headerName: 'header_indicator',
        field: 'header_indicator',
        rowGroup: true,
        hide: true
      },
      {
        headerName: 'header_subindicator',
        field: 'header_subindicator',
        rowGroup: true,
        hide: true
      },
      { headerName: 'mfo_id', field: 'mfo_id', rowGroup: true, hide: true },
      {
        headerName: 'mfo_name',
        field: 'mfo_name',
        rowGroup: true,
        hide: true,
        cellClass: ['data'],
        cellClassRules: {
          indent1: function(params) {
            if (params.node.uiLevel == 1) return true;
          },
          indent2: function(params) {
            if (params.node.uiLevel == 2) return true;
          },
          indent3: function(params) {
            if (params.node.uiLevel == 3) return true;
          },
          indent4: function(params) {
            if (params.node.uiLevel == 4) return true;
          },
          indent5: function(params) {
            if (params.node.uiLevel == 5) return true;
          },
          bold: function(params) {
            if (params.node.group) return true;
          }
        }
      },
      {
        headerName: 'Adjusted Allotment',
        cellClass: ['data', 't'],
        colId: 'total_adjusted',
        width: 130,
        cellStyle: params => {
          if(params.node.group) { return { color: 'black', 'background-color': '#fae091', 'font-weight': 'bold' }}else{return { color: 'black', 'background-color': '#fae091'}}
        },
        aggFunc: custom.TotalMonthAggFunc,
        valueGetter: custom.adjusted_disbursement_view,
        valueFormatter: this.currencyFormatter,
        type: 'numericColumn'
      },
      {
        headerName: 'Obligation Accomplishment',
        children: [
          {
            headerName: 'Jan', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'janfa', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'janfa_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 'a'], valueGetter: custom.total_janfa, colId: 'jan_tota'}
            ]
          },
          {
            headerName: 'Feb', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'febfa', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'febfa_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 'a'], valueGetter: custom.total_febfa, colId: 'feb_tota'}
            ]
          },
          {
            headerName: 'Mar', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'marfa', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'marfa_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data','a'], valueGetter: custom.total_marfa, colId: 'mar_tota'}
            ]
          },
          {
            headerName: 'Q1',
            children: [
              { headerName: 'MOOE', type: 'quarterColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q1fa', valueGetter: custom.total_q1_mooe_fa},
              { headerName: 'CO', type: 'quarterColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q1fa_co', valueGetter: custom.total_q1_co_fa},
              { headerName: 'TOTAL', type: 'quarterColumn', cellClass: ['data', 'a'], colId: 'q1_tota', valueGetter: custom.total_fa_q1}
            ]
          },
          {
            headerName: 'Apr', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'aprfa', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'aprfa_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 'a'], valueGetter: custom.total_aprfa, colId: 'apr_tota'}
            ]
          },
         
          {
            headerName: 'May', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'mayfa', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'mayfa_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 'a'], valueGetter: custom.total_mayfa, colId: 'may_tota'}
            ]
          },
   
          {
            headerName: 'Jun', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'junfa', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'junfa_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 'a'], valueGetter: custom.total_junfa, colId: 'jun_tota'}
            ]
          },

          {
            headerName: 'Q2',
            children: [
              { headerName: 'MOOE', type: 'quarterColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q2fa', valueGetter: custom.total_q2_mooe_fa},
              { headerName: 'CO', type: 'quarterColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q2fa_co', valueGetter: custom.total_q2_co_fa},
              { headerName: 'TOTAL', type: 'quarterColumn', cellClass: ['data', 'a'], colId: 'q2_tota', valueGetter: custom.total_fa_q2}
            ]
          },

          {
            headerName: 'Jul', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'julfa', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'julfa_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 'a'], valueGetter: custom.total_julfa, colId: 'jul_tota'}
            ]
          },

          {
            headerName: 'Aug', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'augfa', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'augfa_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 'a'], valueGetter: custom.total_augfa, colId: 'aug_tota'}
            ]
          },
         
          {
            headerName: 'Sep', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'sepfa', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'sepfa_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 'a'], valueGetter: custom.total_sepfa, colId: 'sep_tota'}
            ]
          },
          {
            headerName: 'Q3',
            children: [
              { headerName: 'MOOE', type: 'quarterColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q3fa', valueGetter: custom.total_q3_mooe_fa},
              { headerName: 'CO', type: 'quarterColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q3fa_co', valueGetter: custom.total_q3_co_fa},
              { headerName: 'TOTAL', type: 'quarterColumn', cellClass: ['data', 'a'], colId: 'q3_tota', valueGetter: custom.total_fa_q3}
            ]
          },

          {
            headerName: 'Oct', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'octfa', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'octfa_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 'a'], valueGetter: custom.total_octfa, colId: 'oct_tota'}
            ]
          },

          {
            headerName: 'Nov', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'novfa', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'novfa_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 'a'], valueGetter: custom.total_novfa, colId: 'nov_tota'}
            ]
          },
    
          {
            headerName: 'Dec', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'decfa', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'decfa_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 'a'], valueGetter: custom.total_decfa, colId: 'dec_tota'}
            ]
          },
          {
            headerName: 'Q4',
            children: [
              { headerName: 'MOOE', type: 'quarterColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q4fa', valueGetter: custom.total_q4_mooe_fa},
              { headerName: 'CO', type: 'quarterColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q4fa_co', valueGetter: custom.total_q4_co_fa},
              { headerName: 'TOTAL', type: 'quarterColumn', cellClass: ['data', 'a'], colId: 'q4_tota', valueGetter: custom.total_fa_q4}
            ]
          },
        ]
      },
      {
        headerName: 'Grand Total Obligations',
        children: [
          { headerName: 'MOOE', type: 'numericColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'total_mooe_fa', valueGetter: custom.total_mooe_fa, aggFunc: custom.GrandTotalAggFunc, valueFormatter: this.currencyFormatter},
          { headerName: 'CO', type: 'numericColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'total_co_fa', valueGetter: custom.total_co_fa, aggFunc: custom.GrandTotalAggFunc, valueFormatter: this.currencyFormatter},
          { headerName: 'TOTAL', type: 'numericColumn', cellClass: ['data', 'total'], colId: 'grandtotal_fa', valueGetter: custom.grandtotal_fa, 
          cellStyle: params => {
            if(params.node.group) { return { color: 'black', 'background-color': '#81f7a6', 'font-weight': 'bold' }}else{return { color: 'black', 'background-color': '#81f7a6'}}
          },width: 110, aggFunc: custom.GrandTotalAggFunc, valueFormatter: this.currencyFormatter, cellRenderer: 'agAnimateShowChangeCellRenderer',}
        ]
      }, 
      {
        headerName: 'Disbursement Accomplishment',
        children: [
          {
            headerName: 'Jan', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'janda', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'janda_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 'a'], valueGetter: custom.total_janda, colId: 'janda_tota'}
            ]
          },
          {
            headerName: 'Feb', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'febda', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'febda_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 'a'], valueGetter: custom.total_febda, colId: 'febda_tota'}
            ]
          },
          {
            headerName: 'Mar', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'marda', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'marda_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data','a'], valueGetter: custom.total_marda, colId: 'marda_tota'}
            ]
          },
          {
            headerName: 'Q1',
            children: [
              { headerName: 'MOOE', type: 'quarterColumn2', columnGroupShow: 'open', cellClass: ['data'], colId: 'q1da', valueGetter: custom.total_q1_mooe_da},
              { headerName: 'CO', type: 'quarterColumn2', columnGroupShow: 'open', cellClass: ['data'], colId: 'q1da_co', valueGetter: custom.total_q1_co_da},
              { headerName: 'TOTAL', type: 'quarterColumn2', cellClass: ['data', 'a'], colId: 'q1da_tota', valueGetter: custom.total_da_q1}
            ]
          },
          {
            headerName: 'Apr', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'aprda', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'aprda_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 'a'], valueGetter: custom.total_aprda, colId: 'aprda_tota'}
            ]
          },
         
          {
            headerName: 'May', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'mayda', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'mayda_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 'a'], valueGetter: custom.total_mayda, colId: 'mayda_tota'}
            ]
          },
   
          {
            headerName: 'Jun', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'junda', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'junda_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 'a'], valueGetter: custom.total_junda, colId: 'junda_tota'}
            ]
          },

          {
            headerName: 'Q2',
            children: [
              { headerName: 'MOOE', type: 'quarterColumn2', columnGroupShow: 'open', cellClass: ['data'], colId: 'q2da', valueGetter: custom.total_q2_mooe_da},
              { headerName: 'CO', type: 'quarterColumn2', columnGroupShow: 'open', cellClass: ['data'], colId: 'q2da_co', valueGetter: custom.total_q2_co_da},
              { headerName: 'TOTAL', type: 'quarterColumn2', cellClass: ['data', 'a'], colId: 'q2da_tota', valueGetter: custom.total_da_q2}
            ]
          },

          {
            headerName: 'Jul', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'julda', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'julda_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 'a'], valueGetter: custom.total_julda, colId: 'julda_tota'}
            ]
          },

          {
            headerName: 'Aug', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'augda', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'augda_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 'a'], valueGetter: custom.total_augda, colId: 'augda_tota'}
            ]
          },
         
          {
            headerName: 'Sep', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'sepda', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'sepda_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 'a'], valueGetter: custom.total_sepda, colId: 'sepda_tota'}
            ]
          },
          {
            headerName: 'Q3',
            children: [
              { headerName: 'MOOE', type: 'quarterColumn2', columnGroupShow: 'open', cellClass: ['data'], colId: 'q3da', valueGetter: custom.total_q3_mooe_da},
              { headerName: 'CO', type: 'quarterColumn2', columnGroupShow: 'open', cellClass: ['data'], colId: 'q3da_co', valueGetter: custom.total_q3_co_da},
              { headerName: 'TOTAL', type: 'quarterColumn2', cellClass: ['data', 'a'], colId: 'q3da_tota', valueGetter: custom.total_da_q3}
            ]
          },

          {
            headerName: 'Oct', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'octda', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'octda_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 'a'], valueGetter: custom.total_octda, colId: 'octda_tota'}
            ]
          },

          {
            headerName: 'Nov', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'novda', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'novda_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 'a'], valueGetter: custom.total_novda, colId: 'novda_tota'}
            ]
          },
    
          {
            headerName: 'Dec', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'decda', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'decda_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 'a'], valueGetter: custom.total_decda, colId: 'decda_tota'}
            ]
          },
          {
            headerName: 'Q4',
            children: [
              { headerName: 'MOOE', type: 'quarterColumn2', columnGroupShow: 'open', cellClass: ['data'], colId: 'q4da', valueGetter: custom.total_q4_mooe_da},
              { headerName: 'CO', type: 'quarterColumn2', columnGroupShow: 'open', cellClass: ['data'], colId: 'q4da_co', valueGetter: custom.total_q4_co_da},
              { headerName: 'TOTAL', type: 'quarterColumn2', cellClass: ['data', 'a'], colId: 'q4da_tota', valueGetter: custom.total_da_q4}
            ]
          },
        ]
      },
      {
        headerName: 'Grand Total Disbursement',
        children: [
          { headerName: 'MOOE', type: 'numericColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'total_mooe_da', valueGetter: custom.total_mooe_da, width: 110, aggFunc: custom.GrandTotalAggFunc, valueFormatter: this.currencyFormatter},
          { headerName: 'CO', type: 'numericColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'total_co_da', valueGetter: custom.total_co_da, width: 110, aggFunc: custom.GrandTotalAggFunc, valueFormatter: this.currencyFormatter},
          { headerName: 'TOTAL', type: 'numericColumn', cellClass: ['data', 'total'], colId: 'grandtotal_da', valueGetter: custom.grandtotal_da, 
          cellStyle: params => {
            if(params.node.group) { return { color: 'black', 'background-color': '#81f7a6', 'font-weight': 'bold' }}else{return { color: 'black', 'background-color': '#81f7a6'}}
          },
          width: 110, aggFunc: custom.GrandTotalAggFunc, valueFormatter: this.currencyFormatter, cellRenderer: 'agAnimateShowChangeCellRenderer',}
        ]
      }, 
  
      {
        headerName: 'Unpaid Obligations',
        colId: 'uo',
        width: 130,
        cellStyle: params => {
          if(params.node.group) { return { color: 'black', 'background-color': '#f7adad', 'font-weight': 'bold' }}else{return { color: 'black', 'background-color': '#f7adad'}}
        },
        aggFunc: custom.TotalUnobligatedAggFunc,
        valueGetter: custom.unpaidObligations,
        valueFormatter: this.currencyFormatter,
        type: 'numericColumn',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        cellClass: ['data', 'v']
      },
      {
        headerName: 'Percentage',
        colId: 'per',
        width: 130,
        cellStyle: params => {
          if(params.node.group) { return { color: 'black', 'background-color': '#dfa9f5', 'font-weight': 'bold' }}else{return { color: 'black', 'background-color': '#dfa9f5'}}
        },
        aggFunc: custom.TotalpercentAggFunc,
        valueGetter: custom.disbursementPercentage,
        valueFormatter: this.currencyFormatter,
        type: 'numericColumn',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        cellClass: ['data', 'p']
      }
    ];

    this.defaultColDef = { sortable: true, resizable: true, filter: true };
    this.context = { componentParent: this };
    this.components = {
      simpleCellRenderer: getSimpleCellRenderer()
    };
    this.rowSelection = 'single';


    this.columnTypes = {
      valueColumn: {
        width: 130,
        aggFunc: 'sum',
        valueParser: 'Number(newValue)',
        cellStyle: custom.customStyleGroup,
        valueFormatter: this.currencyFormatter
      },
      totalColumn: {
        width: 130,
        aggFunc: custom.TotalMonthAggFunc,
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        cellStyle: custom.customStyleGroupTotal,
        valueFormatter: this.currencyFormatter
      },
      quarterColumn: {
        width: 130,
        aggFunc: custom.TotalQuarterAggFunc,
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        cellStyle: custom.customStyleGroupQuarter,
        valueFormatter: this.currencyFormatter
      },
      quarterColumn2: {
        width: 130,
        aggFunc: custom.TotalQuarterAggFunc,
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        cellStyle: custom.customStyleGroupQaurter3,
        valueFormatter: this.currencyFormatter
      }
    };

    this.autoGroupColumnDef = {
      headerName: 'PAP',
      cellRenderer: 'agGroupCellRenderer',
      pinned: 'left',
      width: 300,
      field: 'mfo_name',
      cellRendererParams: {
        suppressCount: true, // turn off the row count
        innerRenderer: 'simpleCellRenderer'
      }
    };

    this.excelStyles = custom.excelStyles;
  }

  ngOnInit(): void {
    this.pid = this.user.pid;
    this.getRow(this.pid);
    this.lastUpdated(this.pid);
  }

  prog_ou: any;
  export() {
    if (this.user.b != 0) this.prog_ou = this.name;
    else this.prog_ou = this.user.username;
    let ck = [
      'mfo_name',
      'total_adjusted',
      'janfa', 'janfa_co', 'jan_tota', 'febfa', 'febfa_co', 'feb_tota', 'marfa', 'marfa_co', 'mar_tota', 'q1fa', 'q1fa_co', 'q1_tota',
      'aprfa', 'aprfa_co', 'apr_tota', 'mayfa', 'mayfa_co', 'may_tota', 'junfa', 'junfa_co', 'jun_tota', 'q2fa', 'q2fa_co', 'q2_tota',
       
      'julfa', 'julfa_co', 'jul_tota', 'augfa', 'augfa_co', 'aug_tota', 'sepfa', 'sepfa_co', 'sep_tota', 'q3fa', 'q3fa_co', 'q3_tota',
       'octfa', 'octfa_co', 'oct_tota', 'novfa', 'novfa_co', 'nov_tota', 'decfa', 'decfa_co', 'dec_tota', 'q4fa', 'q4fa_co', 'q4_tota',
      
      'total_mooe_fa', 'total_co_fa', 'grandtotal_fa',

      'janda', 'janda_co', 'janda_tota', 'febda', 'febda_co', 'febda_tota', 'marda', 'marda_co', 'marda_tota', 'q1da', 'q1da_co', 'q1da_tota',
      'aprda', 'aprda_co', 'aprda_tota', 'mayda', 'mayda_co', 'mayda_tota', 'junda', 'junda_co', 'junda_tota', 'q2da', 'q2da_co', 'q2da_tota',
       
      'julda', 'julda_co', 'julda_tota', 'augda', 'augda_co', 'augda_tota', 'sepda', 'sepda_co', 'sepda_tota', 'q3da', 'q3da_co', 'q3da_tota',
       'octda', 'octda_co', 'octda_tota', 'novda', 'novda_co', 'novda_tota', 'decda', 'decda_co', 'decda_tota', 'q4da', 'q4da_co', 'q4da_tota',
       
       'total_mooe_da', 'total_co_da', 'grandtotal_da',
      'uo',
      'per'
    ];
    this.gridApi.exportDataAsExcel({
      sheetName: 'BED-3 ' + this.prog_ou,
      fileName: 'BED-3 ' + this.prog_ou,
      customHeader: [
        [
          {
            styleId: 'headappend',
            data: { type: 'String', value: 'DEPARTMENT OF AGRICULTURE' }
          }
        ],
        [
          {
            styleId: 'headappend',
            data: { type: 'String', value: 'Regional Field Office XIII' }
          }
        ],
        [
          {
            styleId: 'headappend',
            data: { type: 'String', value: 'BED3 Disbursement Report 2021' }
          }
        ],
        [
          {
            styleId: 'headappend',
            data: { type: 'String', value: this.prog_ou.toUpperCase() }
          }
        ],
        [
          {
            styleId: 'headappend',
            data: { type: 'String', value: 'C.Y. 2021 CURRENT APPROPRIATION' }
          }
        ],
        [
          {
            styleId: 'headappend',
            data: {
              type: 'String',
              value:
                'PMIS v6.0 Generated as of ' + moment(new Date()).format('LL')
            }
          }
        ],
        [],
        [
          {
            styleId: 'p1',
            data: { type: 'String', value: '' }, mergeAcross: 1
          },
          
          {
            styleId: 'a',
            data: { type: 'String', value: 'Obligations' },
            mergeAcross: 50
          },
          {
            styleId: 'v',
            data: { type: 'String', value: 'Disbursement' },
            mergeAcross: 50
          }
        ],
        [
          { styleId: 'p1', data: { type: 'String', value: '' }, mergeAcross: 1},
          { styleId: 'month', data: { type: 'String', value: 'Jan' }, mergeAcross: 2},
          { styleId: 'month', data: { type: 'String', value: 'Feb' }, mergeAcross: 2},
          { styleId: 'month', data: { type: 'String', value: 'Mar' }, mergeAcross: 2},
          { styleId: 'quarter', data: { type: 'String', value: 'Q1' }, mergeAcross: 2},
          { styleId: 'month', data: { type: 'String', value: 'Apr' }, mergeAcross: 2},
          { styleId: 'month', data: { type: 'String', value: 'May' }, mergeAcross: 2},
          { styleId: 'month', data: { type: 'String', value: 'Jun' }, mergeAcross: 2},
          { styleId: 'quarter', data: { type: 'String', value: 'Q2' }, mergeAcross: 2},
          { styleId: 'month', data: { type: 'String', value: 'Jul' }, mergeAcross: 2},
          { styleId: 'month', data: { type: 'String', value: 'Aug' }, mergeAcross: 2},
          { styleId: 'month', data: { type: 'String', value: 'Sep' }, mergeAcross: 2},
          { styleId: 'quarter', data: { type: 'String', value: 'Q3' }, mergeAcross: 2},
          { styleId: 'month', data: { type: 'String', value: 'Oct' }, mergeAcross: 2},
          { styleId: 'month', data: { type: 'String', value: 'Nov' }, mergeAcross: 2},
          { styleId: 'month', data: { type: 'String', value: 'Dec' }, mergeAcross: 2},
          { styleId: 'quarter', data: { type: 'String', value: 'Q4' }, mergeAcross: 2},
          { styleId: 'total', data: { type: 'String', value: 'Grand Total' }, mergeAcross: 2},
          { styleId: 'month', data: { type: 'String', value: 'Jan' }, mergeAcross: 2},
          { styleId: 'month', data: { type: 'String', value: 'Feb' }, mergeAcross: 2},
          { styleId: 'month', data: { type: 'String', value: 'Mar' }, mergeAcross: 2},
          { styleId: 'quarter', data: { type: 'String', value: 'Q1' }, mergeAcross: 2},
          { styleId: 'month', data: { type: 'String', value: 'Apr' }, mergeAcross: 2},
          { styleId: 'month', data: { type: 'String', value: 'May' }, mergeAcross: 2},
          { styleId: 'month', data: { type: 'String', value: 'Jun' }, mergeAcross: 2},
          { styleId: 'quarter', data: { type: 'String', value: 'Q2' }, mergeAcross: 2},
          { styleId: 'month', data: { type: 'String', value: 'Jul' }, mergeAcross: 2},
          { styleId: 'month', data: { type: 'String', value: 'Aug' }, mergeAcross: 2},
          { styleId: 'month', data: { type: 'String', value: 'Sep' }, mergeAcross: 2},
          { styleId: 'quarter', data: { type: 'String', value: 'Q3' }, mergeAcross: 2},
          { styleId: 'month', data: { type: 'String', value: 'Oct' }, mergeAcross: 2},
          { styleId: 'month', data: { type: 'String', value: 'Nov' }, mergeAcross: 2},
          { styleId: 'month', data: { type: 'String', value: 'Dec' }, mergeAcross: 2},
          { styleId: 'quarter', data: { type: 'String', value: 'Q4' }, mergeAcross: 2},
          { styleId: 'total', data: { type: 'String', value: 'Grand Total' }, mergeAcross: 2}
  
        ]
      ],
      columnKeys: ck,
      columnWidth: function(params) {
        if (params.index == 0) return 140;
        else return 60;
      },
      processHeaderCallback: function(params) {
        var name = params.column.colDef.headerName;
        if (name == 'mfo_name') {
          return 'PAP';
        } else if (
          name == 'header_program' ||
          name == 'header_mfo' ||
          name == 'header_indicator' ||
          name == 'mfo_id'
        ) {
        } // do nothing
        else {
          return params.column.colDef.headerName;
        }
      },
      shouldRowBeSkipped: function(params) {
        return params.node.group && params.node.childrenAfterGroup.length == 1;
      },
      processCellCallback: function(params) {
        var node = params.node;
        if (params.column.colDef.field == 'mfo_name') {
          if (node.group) {
            return node.key;
          } else {
            return params.value;
          }
        } else if (params.column.colDef.field == 'fu' && isNaN(params.value))
          return '';
        else return params.value;
      }
    });
  }
}

function getSimpleCellRenderer() {
  function SimpleCellRenderer() {}
  SimpleCellRenderer.prototype.init = function(params) {
    const tempDiv = document.createElement('div');
    if (params.node.group && params.node.field === 'mfo_id') {
      tempDiv.innerHTML =
        '<span>' + params.node.allLeafChildren[0].data.mfo_name + '</span>';
    } else if (params.node.group) {
      tempDiv.innerHTML =
        '<span style="font-weight: bold">' + params.value + '</span>';
    } else {
      tempDiv.innerHTML = '<span>' + params.value + '</span>';
    }
    this.eGui = tempDiv.firstChild;
  };
  SimpleCellRenderer.prototype.getGui = function() {
    return this.eGui;
  };
  return SimpleCellRenderer;
}

