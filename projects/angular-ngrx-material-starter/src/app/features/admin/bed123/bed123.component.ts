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
import { Router } from '@angular/router';

import { Module } from '@ag-grid-community/all-modules';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import * as moment from 'moment';
import * as custom from '../obligation/valueGetter.js';

@Component({
  selector: 'anms-bed123',
  templateUrl: './bed123.component.html',
  styleUrls: ['./bed123.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Bed123Component implements OnInit, OnChanges {

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  public modules: Module[] = AllModules;
  @Input() pid: number = 0;
  @Input() name: string = '';

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
  locked: any;
  date_updated: any;
  excelStyles: any;

  ngOnChanges(changes: any) {
    this.pid = changes.pid.currentValue;
    this.getRow(this.pid);
  }

  getRow(pid) {
    this.pmisService.getPhysical(pid).subscribe(data => {
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
      this.pmisService
        .updatePhysical(event.colDef.field, event.newValue, event.data.mfo_id)
        .subscribe(data => {
          if (!data) {
            alert('something wrong happen!');
          }
        });
    }
  }

 

  prog_ou: any;
  export() {
    if (this.user.b != 0) this.prog_ou = this.name;
    else this.prog_ou = this.user.username;
    var ck = [
      'mfo_name',
      'unitmeasure',
      'janft', 'janft_co', 'jan_tot', 'febft', 'febft_co', 'feb_tot', 'marft', 'marft_co', 'mar_tot', 'q1ft', 'q1ft_co', 'q1_tot',
      'aprft', 'aprft_co', 'apr_tot', 'mayft', 'mayft_co', 'may_tot', 'junft', 'junft_co', 'jun_tot', 'q2ft', 'q2ft_co', 'q2_tot',
       
      'julft', 'julft_co', 'jul_tot', 'augft', 'augft_co', 'aug_tot', 'sepft', 'sepft_co', 'sep_tot', 'q3ft', 'q3ft_co', 'q3_tot',
       'octft', 'octft_co', 'oct_tot', 'novft', 'novft_co', 'nov_tot', 'decft', 'decft_co', 'dec_tot', 'q4ft', 'q4ft_co', 'q4_tot',
      
      'total_ft', 'total_ft_co', 'grandtotal_ft',
      'jant',
      'febt',
      'mart',
      'Q1_pt',
      'aprt',
      'mayt',
      'junt',
      'Q2_pt',
      'jult',
      'augt',
      'sept',
      'Q3_pt',
      'octt',
      'novt',
      'dect',
      'Q4_pt',
      'PT',
      'jandt', 'jandt_co', 'jandt_tot', 'febdt', 'febdt_co', 'febdt_tot', 'mardt', 'mardt_co', 'mardt_tot', 'q1dt', 'q1dt_co', 'q1dt_tot',
      'aprdt', 'aprdt_co', 'aprdt_tot', 'maydt', 'maydt_co', 'maydt_tot', 'jundt', 'jundt_co', 'jundt_tot', 'q2dt', 'q2dt_co', 'q2dt_tot',
       
      'juldt', 'juldt_co', 'juldt_tot', 'augdt', 'augdt_co', 'augdt_tot', 'sepdt', 'sepdt_co', 'sepdt_tot', 'q3dt', 'q3dt_co', 'q3dt_tot',
       'octdt', 'octdt_co', 'octdt_tot', 'novdt', 'novdt_co', 'novdt_tot', 'decdt', 'decdt_co', 'decdt_tot', 'q4dt', 'q4dt_co', 'q4dt_tot',
      
      'total_dt', 'total_dt_co', 'grandtotal_dt'

    ];
    this.gridApi.exportDataAsExcel({
      sheetName: 'BED123 ' + this.prog_ou,
      fileName: 'BED123 ' + this.prog_ou,
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
            data: { type: 'String', value: 'BED123 Target Report 2021' }
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
          { data: { type: 'String', value: '' } },
          { data: { type: 'String', value: '' } },
          {
            styleId: 't',
            data: { type: 'String', value: 'BED1 - Obligation Targets' },
            mergeAcross: 50
          },
          {
            styleId: 'a',
            data: { type: 'String', value: 'BED 2 - Physical Targets' },
            mergeAcross: 16
          },
          {
            styleId: 't',
            data: { type: 'String', value: 'BED 3 - Disbursement Targets' },
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
          { styleId: 'p', data: { type: 'String', value: '' }, mergeAcross: 16},
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
        else return 50;
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
        if (node.group && params.column.colDef.field == 'mfo_name')
          return node.key;
        else if (node.group && params.column.colDef.field != 'mfo_name')
          return '';
        else return params.value;
      }
    });
  }

  constructor(
    public pmisService: PmisService,
    private cd: ChangeDetectorRef,
    public dialog: MatDialog,
    private localStorageService: LocalStorageService
  ) {
    this.user = this.localStorageService.getItem('AUTH');
    this.canEdit = this.user.b == 5;

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
        headerName: 'Unit Measure',
        field: 'unitmeasure',
        width: 100,
        cellClass: ['data']
      },
      {
        headerName: 'BED 1 - Obligation Target',
        marryChildren: true,
        children: [
          {
            headerName: 'Jan', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'janft', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'janft_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_janft, colId: 'jan_tot'}
            ]
          },
          {
            headerName: 'Feb', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'febft', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'febft_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_febft, colId: 'feb_tot'}
            ]
          },
          {
            headerName: 'Mar', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'marft', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'marft_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_marft, colId: 'mar_tot'}
            ]
          },
          {
            headerName: 'Q1',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q1ft', valueGetter: custom.total_q1_mooe_ft},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q1ft_co', valueGetter: custom.total_q1_co_ft},
              { headerName: 'TOTAL', type: 'obligationColumn', cellClass: ['data', 't'], colId: 'q1_tot', valueGetter: custom.total_q1}
            ]
          },
          {
            headerName: 'Apr', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'aprft', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'aprft_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_aprft, colId: 'apr_tot'}
            ]
          },
          {
            headerName: 'May', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'mayft', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'mayft_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_mayft, colId: 'may_tot'}
            ]
          },
          {
            headerName: 'Jun', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'junft', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'junft_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_junft, colId: 'jun_tot'}
            ]
          },
          {
            headerName: 'Q2',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q2ft', valueGetter: custom.total_q2_mooe_ft},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q2ft_co', valueGetter: custom.total_q2_co_ft},
              { headerName: 'TOTAL', type: 'obligationColumn', cellClass: ['data', 't'], colId: 'q2_tot', valueGetter: custom.total_q2}
            ]
          },

          {
            headerName: 'Jul', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'julft', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'julft_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_julft, colId: 'jul_tot'}
            ]
          },
          {
            headerName: 'Aug', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'augft', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'augft_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_augft, colId: 'aug_tot'}
            ]
          },

          {
            headerName: 'Sep', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'sepft', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'sepft_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_sepft, colId: 'sep_tot'}
            ]
          },
          {
            headerName: 'Q3',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q3ft', valueGetter: custom.total_q3_mooe_ft},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q3ft_co', valueGetter: custom.total_q3_co_ft},
              { headerName: 'TOTAL', type: 'obligationColumn', cellClass: ['data', 't'], colId: 'q3_tot', valueGetter: custom.total_q3}
            ]
          },
          {
            headerName: 'Oct', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'octft', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'octft_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_octft, colId: 'oct_tot'}
            ]
          },
          {
            headerName: 'Nov', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'novft', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'novft_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_novft, colId: 'nov_tot'}
            ]
          },

          {
            headerName: 'Dec', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'decft', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'decft_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_decft, colId: 'dec_tot'}
            ]
          },
          {
            headerName: 'Q4',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q4ft', valueGetter: custom.total_q4_mooe_ft},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q4ft_co', valueGetter: custom.total_q4_co_ft},
              { headerName: 'TOTAL', type: 'obligationColumn', cellClass: ['data', 't'], colId: 'q4_tot', valueGetter: custom.total_q4}
            ]
          },
          {
            headerName: 'Grand Total',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'total_ft', valueGetter: custom.total_mooe_ft},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'total_ft_co', valueGetter: custom.total_co_ft},
              { headerName: 'TOTAL', type: 'numericColumn', cellClass: ['data', 'total'], colId: 'grandtotal_ft', valueGetter: custom.grandtotal_ft, cellStyle: { color: 'black', 'background-color': '#81f7a6' },width: 110,aggFunc: custom.TotalYearAggFunc,}
            ]
          }
        ]
      },
      {
        headerName: 'BED 2 - Physical Target',
        children: [
          {
            headerName: 'Jan',
            field: 'jant',
            type: 'valueColumn',
            columnGroupShow: 'open', editable: this.canEdit,
            cellClass: ['data']
          },
          {
            headerName: 'Feb',
            field: 'febt',
            type: 'valueColumn',
            columnGroupShow: 'open', editable: this.canEdit,
            cellClass: ['data']
          },
          {
            headerName: 'Mar',
            field: 'mart',
            type: 'valueColumn',
            columnGroupShow: 'open', editable: this.canEdit,
            cellClass: ['data']
          },

          {
            headerName: 'Q1',
            colId: 'Q1_pt',
            type: 'PhysicalColumn',
            valueGetter: custom.Q1_Physical,
            cellClass: ['data', 't']
          },

          {
            headerName: 'Apr',
            field: 'aprt',
            type: 'valueColumn',
            columnGroupShow: 'open', editable: this.canEdit,
            cellClass: ['data']
          },
          {
            headerName: 'May',
            field: 'mayt',
            type: 'valueColumn',
            columnGroupShow: 'open', editable: this.canEdit,
            cellClass: ['data']
          },
          {
            headerName: 'Jun',
            field: 'junt',
            type: 'valueColumn',
            columnGroupShow: 'open', editable: this.canEdit,
            cellClass: ['data']
          },

          {
            headerName: 'Q2',
            colId: 'Q2_pt',
            type: 'PhysicalColumn',
            valueGetter: custom.Q2_Physical,
            cellClass: ['data', 't']
          },

          {
            headerName: 'Jul',
            field: 'jult',
            type: 'valueColumn',
            columnGroupShow: 'open', editable: this.canEdit,
            cellClass: ['data']
          },
          {
            headerName: 'Aug',
            field: 'augt',
            type: 'valueColumn',
            columnGroupShow: 'open', editable: this.canEdit,
            cellClass: ['data']
          },
          {
            headerName: 'Sep',
            field: 'sept',
            type: 'valueColumn',
            columnGroupShow: 'open', editable: this.canEdit,
            cellClass: ['data']
          },

          {
            headerName: 'Q3',
            colId: 'Q3_pt',
            type: 'PhysicalColumn',
            valueGetter: custom.Q3_Physical,
            cellClass: ['data', 't']
          },

          {
            headerName: 'Oct',
            field: 'octt',
            type: 'valueColumn',
            columnGroupShow: 'open', editable: this.canEdit,
            cellClass: ['data']
          },
          {
            headerName: 'Nov',
            field: 'novt',
            type: 'valueColumn',
            columnGroupShow: 'open', editable: this.canEdit,
            cellClass: ['data']
          },
          {
            headerName: 'Dec',
            field: 'dect',
            type: 'valueColumn',
            columnGroupShow: 'open', editable: this.canEdit,
            cellClass: ['data']
          },

          {
            headerName: 'Q4',
            colId: 'Q4_pt',
            type: 'PhysicalColumn',
            valueGetter: custom.Q4_Physical,
            cellClass: ['data', 't']
          },
          {
            headerName: 'Total',
            colId: 'PT',
            width: 110,
            cellStyle: { color: 'black', 'background-color': '#81f7a6' },
            aggFunc: custom.TotalYearAggFunc,
            valueGetter: custom.GrandTotal_Physical,
            valueFormatter: this.currencyFormatter,
            type: 'numericColumn',
            cellClass: ['data', 'total']
          }
        ]
      },
      {
        headerName: 'BED 3 - Disbursement Target',
        marryChildren: true,
        children: [
          {
            headerName: 'Jan', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'jandt', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'jandt_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_jandt, colId: 'jandt_tot'}
            ]
          },
          {
            headerName: 'Feb', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'febdt', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'febdt_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_febdt, colId: 'febdt_tot'}
            ]
          },
          {
            headerName: 'Mar', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'mardt', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'mardt_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_mardt, colId: 'mardt_tot'}
            ]
          },
          {
            headerName: 'Q1',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q1dt', valueGetter: custom.total_q1_mooe_dt},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q1dt_co', valueGetter: custom.total_q1_co_dt},
              { headerName: 'TOTAL', type: 'disbursementColumn', cellClass: ['data', 't'], colId: 'q1dt_tot', valueGetter: custom.totaldt_q1}
            ]
          },
          {
            headerName: 'Apr', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'aprdt', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'aprdt_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_aprdt, colId: 'aprdt_tot'}
            ]
          },
          {
            headerName: 'May', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'maydt', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'maydt_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_maydt, colId: 'maydt_tot'}
            ]
          },
          {
            headerName: 'Jun', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'jundt', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'jundt_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_jundt, colId: 'jundt_tot'}
            ]
          },
          {
            headerName: 'Q2',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q2dt', valueGetter: custom.total_q2_mooe_dt},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q2dt_co', valueGetter: custom.total_q2_co_dt},
              { headerName: 'TOTAL', type: 'disbursementColumn', cellClass: ['data', 't'], colId: 'q2dt_tot', valueGetter: custom.totaldt_q2}
            ]
          },

          {
            headerName: 'Jul', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'juldt', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'juldt_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_juldt, colId: 'juldt_tot'}
            ]
          },
          {
            headerName: 'Aug', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'augdt', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'augdt_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_augdt, colId: 'augdt_tot'}
            ]
          },

          {
            headerName: 'Sep', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'sepdt', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'sepdt_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_sepdt, colId: 'sepdt_tot'}
            ]
          },
          {
            headerName: 'Q3',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q3dt', valueGetter: custom.total_q3_mooe_dt},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q3dt_co', valueGetter: custom.total_q3_co_dt},
              { headerName: 'TOTAL', type: 'disbursementColumn', cellClass: ['data', 't'], colId: 'q3dt_tot', valueGetter: custom.totaldt_q3}
            ]
          },
          {
            headerName: 'Oct', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'octdt', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'octdt_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_octdt, colId: 'octdt_tot'}
            ]
          },
          {
            headerName: 'Nov', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'novdt', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'novdt_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_novdt, colId: 'novdt_tot'}
            ]
          },

          {
            headerName: 'Dec', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'decdt', editable: this.canEdit},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'decdt_co', editable: this.canEdit},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_decdt, colId: 'decdt_tot'}
            ]
          },
          {
            headerName: 'Q4',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q4dt', valueGetter: custom.total_q4_mooe_dt},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q4dt_co', valueGetter: custom.total_q4_co_dt},
              { headerName: 'TOTAL', type: 'disbursementColumn', cellClass: ['data', 't'], colId: 'q4dt_tot', valueGetter: custom.totaldt_q4}
            ]
          },
          {
            headerName: 'Grand Total',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'total_dt', valueGetter: custom.total_mooe_dt},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'total_dt_co', valueGetter: custom.total_co_dt},
              { headerName: 'TOTAL', type: 'numericColumn', cellClass: ['data', 'total'], colId: 'grandtotal_dt', valueGetter: custom.grandtotal_dt, cellStyle: { color: 'black', 'background-color': '#81f7a6' },width: 110,aggFunc: custom.TotalYearAggFunc,}
            ]
          }
        ]
      },
    ];

    this.excelStyles = custom.excelStyles;

    this.defaultColDef = { sortable: true, resizable: true, filter: true };
    this.context = { componentParent: this };
    this.components = {
      simpleCellRenderer: getSimpleCellRenderer()
    };


    this.columnTypes = {
      valueColumn: {
        width: 110,
        aggFunc: 'sum',
        valueParser: 'Number(newValue)',
        cellStyle: { 'text-align': 'right' },
        valueFormatter: this.currencyFormatter
      },
      totalColumn: {
        width: 130,
        aggFunc: custom.TotalMonthAggFunc,
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        cellStyle: {
          'text-align': 'right',
          color: 'black', 'background-color': '#F5F5F5'
        },
        valueFormatter: this.currencyFormatter
      },
      PhysicalColumn: {
        width: 110,
        aggFunc: custom.TotalQuarterAggFunc,
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        cellStyle: {
          'text-align': 'right',
          color: 'black',
          'background-color': 'orange'
        },
        valueFormatter: this.currencyFormatter
      },
      obligationColumn: {
        width: 110,
        aggFunc: custom.TotalQuarterAggFunc,
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        cellStyle: {
          'text-align': 'right',
          color: 'black',
          'background-color': '#fae091'
        },
        valueFormatter: this.currencyFormatter
      },
      disbursementColumn: {
        width: 110,
        aggFunc: custom.TotalQuarterAggFunc,
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        cellStyle: {
          'text-align': 'right',
          color: 'black',
          'background-color': '#ffaff8'
        },
        valueFormatter: this.currencyFormatter
      },
      remarksColumn: { width: 120, maxLength: 500, cols: 40, rows: 5 }
    };

    this.autoGroupColumnDef = {
      headerName: 'PAP',
      cellRenderer: 'agGroupCellRenderer',
      pinned: 'left',
      width: 350,
      field: 'mfo_name',
      cellRendererParams: {
        suppressCount: true, // turn off the row count
        innerRenderer: 'simpleCellRenderer'
      }
    };
  }

  ngOnInit(): void {
    this.pid = this.user.pid
    this.getRow(this.pid);
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
    } else if (params.data.area == 1) {
      tempDiv.innerHTML =
        '<span style="background-color: #FFFF00">' + params.value + '</span>';
    } else if (params.data.maintenance == 1) {
      tempDiv.innerHTML =
        '<span style="background-color: #7FFFD4">' + params.value + '</span>';
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





