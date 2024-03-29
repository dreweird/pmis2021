
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
import * as moment from 'moment';


import * as custom from '../obligation/valueGetter.js';

@Component({
  selector: 'anms-midyear-ob',
  templateUrl: './midyear-ob.component.html',
  styleUrls: ['./midyear-ob.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MidyearObComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

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
  date_updated: any;
  excelStyles: any;

  ngOnChanges(changes: any) {
    this.pid = changes.pid.currentValue;
    this.getRow(this.pid);
    this.lastUpdated(this.pid);
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
    if (params.value === undefined || params.value === null || params.value === NaN) {
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
      let entries = {
        pid: this.pid,
        uid: this.user.user_id,
        mfo_id: event.data.mfo_id,
        beds: 1,
        month: event.colDef.field,
        old_value: event.oldValue,
        new_value: event.newValue
      };
      this.pmisService.addLogs(entries).subscribe(data => {
        if (!data) {
          alert('something wrong happen with Logs!');
        }
      });
    }
  }

  lastUpdated(pid) {
    this.pmisService.lastUpdated(pid, 1).subscribe(data => {
      if (data === undefined) this.date_updated = '';
      else this.date_updated = data;
      this.cd.markForCheck();
    });
  }
  prog_ou: any;
  export() {
    if (this.user.b != 0) this.prog_ou = this.name;
    else this.prog_ou = this.user.username;
    let ck = [
      'mfo_name',
      'janft', 'janft_co', 'jan_tot', 'febft', 'febft_co', 'feb_tot', 'marft', 'marft_co', 'mar_tot', 'q1ft', 'q1ft_co', 'q1_tot',
      'aprft', 'aprft_co', 'apr_tot', 'mayft', 'mayft_co', 'may_tot', 'junft', 'junft_co', 'jun_tot', 'q2ft', 'q2ft_co', 'q2_tot',
       
      'julft', 'julft_co', 'jul_tot', 'augft', 'augft_co', 'aug_tot', 'sepft', 'sepft_co', 'sep_tot', 'q3ft', 'q3ft_co', 'q3_tot',
       'octft', 'octft_co', 'oct_tot', 'novft', 'novft_co', 'nov_tot', 'decft', 'decft_co', 'dec_tot', 'q4ft', 'q4ft_co', 'q4_tot',
      
      'total_ft', 'total_ft_co', 'grandtotal_ft',
      'adj_mooe', 'adj_co', 'adj_total',
      'tot_adj_mooe', 'tot_adj_co', 'adj_allot_total',
      'janfa', 'janfa_co', 'jan_tota', 'febfa', 'febfa_co', 'feb_tota',  'marfa', 'marfa_co', 'mar_tota', 'q1fa', 'q1fa_co', 'q1_tota',
      'aprfa', 'aprfa_co', 'apr_tota', 'mayfa', 'mayfa_co', 'may_tota', 'junfa', 'junfa_co', 'jun_tota', 'q2fa', 'q2fa_co', 'q2_tota',
       
      'julfa', 'julfa_co', 'jul_tota', 'augfa', 'augfa_co', 'aug_tota', 'sepfa', 'sepfa_co', 'sep_tota', 'q3fa', 'q3fa_co', 'q3_tota',
       'octfa', 'octfa_co', 'oct_tota', 'novfa', 'novfa_co', 'nov_tota', 'decfa', 'decfa_co', 'dec_tota', 'q4fa', 'q4fa_co', 'q4_tota',
      
      'total_mooe_fa', 'total_co_fa', 'grandtotal_fa', 'un', 'fu'

    ];
    this.gridApi.exportDataAsExcel({
      sheetName: 'BED-1 ' + this.prog_ou,
      fileName: 'BED-1 ' + this.prog_ou,
      customHeader: [
        [{styleId: 'headappend',data: { type: 'String', value: 'DEPARTMENT OF AGRICULTURE' }}
        ],
        [{styleId: 'headappend',data: { type: 'String', value: 'Regional Field Office XIII' }}
        ],
        [{styleId: 'headappend',data: { type: 'String', value: 'BED1 Obligation Report 2021' }}
        ],
        [{styleId: 'headappend',data: { type: 'String', value: this.prog_ou.toUpperCase() }}
        ],
        [{styleId: 'headappend',data: { type: 'String', value: 'C.Y. 2021 CURRENT APPROPRIATION' }}
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
          { styleId: 'p1', data: { type: 'String', value: '' }},
          { styleId: 't', data: { type: 'String', value: 'BED1 Target' }, mergeAcross: 50},
          { styleId: 'p1', data: { type: 'String', value: '' }, mergeAcross: 5},
          { styleId: 'a', data: { type: 'String', value: 'Obligations' }, mergeAcross: 50}
        ],
        [
          { styleId: 'p1', data: { type: 'String', value: '' }},
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
          { styleId: 'p', data: { type: 'String', value: 'Adjustment' }, mergeAcross: 2},
          { styleId: 'p', data: { type: 'String', value: 'Adjusted Allotment' }, mergeAcross: 2},
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

  constructor(
    public pmisService: PmisService,
    private cd: ChangeDetectorRef,
    public dialog: MatDialog,
    private localStorageService: LocalStorageService
  ) {
    this.user = this.localStorageService.getItem('AUTH');
    this.canEdit = this.user.b == 1;

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
        headerName: 'BED 1 - Obligation Target',
        marryChildren: true,
        children: [
          {
            headerName: 'Jan', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'janft',},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'janft_co'},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_janft, colId: 'jan_tot'}
            ]
          },
          {
            headerName: 'Feb', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'febft',},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'febft_co'},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_febft, colId: 'feb_tot'}
            ]
          },
          {
            headerName: 'Mar', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'marft',},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'marft_co'},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_marft, colId: 'mar_tot'}
            ]
          },
          {
            headerName: 'Q1',
            children: [
              { headerName: 'MOOE', type: 'quarterColumn2', columnGroupShow: 'open', cellClass: ['data'], colId: 'q1ft', valueGetter: custom.total_q1_mooe_ft},
              { headerName: 'CO', type: 'quarterColumn2', columnGroupShow: 'open', cellClass: ['data'], colId: 'q1ft_co', valueGetter: custom.total_q1_co_ft},
              { headerName: 'TOTAL', type: 'quarterColumn2', cellClass: ['data', 't'], colId: 'q1_tot', valueGetter: custom.total_q1}
            ]
          },
          {
            headerName: 'Apr', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'aprft',},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'aprft_co'},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_aprft, colId: 'apr_tot'}
            ]
          },
          {
            headerName: 'May', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'mayft',},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'mayft_co'},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_mayft, colId: 'may_tot'}
            ]
          },
          {
            headerName: 'Jun', columnGroupShow: 'open',
            children: [
              { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'junft',},
              { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], field: 'junft_co'},
              { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_junft, colId: 'jun_tot'}
            ]
          },
          {
            headerName: 'Q2',
            children: [
              { headerName: 'MOOE', type: 'quarterColumn2', columnGroupShow: 'open', cellClass: ['data'], colId: 'q2ft', valueGetter: custom.total_q2_mooe_ft},
              { headerName: 'CO', type: 'quarterColumn2', columnGroupShow: 'open', cellClass: ['data'], colId: 'q2ft_co', valueGetter: custom.total_q2_co_ft},
              { headerName: 'TOTAL', type: 'quarterColumn2', cellClass: ['data', 't'], colId: 'q2_tot', valueGetter: custom.total_q2}
            ]
          },

          
          {
            headerName: 'Grand Total',
            children: [
              { headerName: 'MOOE', type: 'numericColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'total_ft', valueGetter: custom.total_mooe_ft, width: 110, aggFunc: custom.GrandTotalAggFunc, cellStyle: custom.customStyleGroup,},
              { headerName: 'CO', type: 'numericColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'total_ft_co', valueGetter: custom.total_co_ft, width: 110, aggFunc: custom.GrandTotalAggFunc, cellStyle: custom.customStyleGroup,},
              { headerName: 'TOTAL', type: 'numericColumn', cellClass: ['data', 'total'], colId: 'grandtotal_ft', valueGetter: custom.grandtotal_ft, 
              cellStyle: params => {
                if(params.node.group) { return { color: 'black', 'background-color': '#81f7a6', 'font-weight': 'bold' }}else{return { color: 'black', 'background-color': '#81f7a6'}}
              },width: 110,aggFunc: custom.GrandTotalAggFunc, valueFormatter: this.currencyFormatter}
            ]
          }
        ]
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

          
 
        ]
      },
      {
        headerName: 'Grand Total Obligations',
        children: [
          { headerName: 'MOOE', type: 'numericColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'total_mooe_fa', valueGetter: custom.total_mooe_fa, width: 110,aggFunc: custom.GrandTotalAggFunc, valueFormatter: this.currencyFormatter,},
          { headerName: 'CO', type: 'numericColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'total_co_fa', valueGetter: custom.total_co_fa, width: 110,aggFunc: custom.GrandTotalAggFunc, valueFormatter: this.currencyFormatter,},
          { headerName: 'TOTAL', type: 'numericColumn', cellClass: ['data', 'total'], colId: 'grandtotal_fa', valueGetter: custom.grandtotal_fa, 
          cellStyle: params => {
            if(params.node.group) { return { color: 'black', 'background-color': '#81f7a6', 'font-weight': 'bold' }}else{return { color: 'black', 'background-color': '#81f7a6'}}
          },
          width: 110, aggFunc: custom.GrandTotalAggFunc, valueFormatter: this.currencyFormatter, cellRenderer: 'agAnimateShowChangeCellRenderer',}
        ]
      },
      {
        headerName: 'Unobligated',
        colId: 'un',
        width: 130,
        cellStyle: params => {
          if(params.node.group) { return { color: 'black', 'background-color': '#f7adad', 'font-weight': 'bold' }}else{return { color: 'black', 'background-color': '#f7adad'}}
        },
        aggFunc: custom.TotalUnobligatedAggFunc,
        valueGetter: unobligated,
        valueFormatter: this.currencyFormatter,
        type: 'numericColumn',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        cellClass: ['data', 'v']
      },
      {
        headerName: 'Percentage',
        colId: 'fu',
        width: 130,
        cellStyle: params => {
          if(params.node.group) { return { color: 'black', 'background-color': '#dfa9f5', 'font-weight': 'bold' }}else{return { color: 'black', 'background-color': '#dfa9f5'}}
        },
        aggFunc: custom.TotalpercentAggFunc,
        valueGetter: percentage,
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
        cellStyle: custom.customStyleGroupQaurter2,
        valueFormatter: this.currencyFormatter
      },
      totalColumn: {
        width: 130,
        aggFunc: custom.TotalMonthAggFunc,
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        cellStyle: custom.customStyleGroupTotal,
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

function unobligated(params) {
  if (!params.node.group) {
    return custom.create_totalAMinusB(
      params.getValue('grandtotal_ft'),
      params.getValue('grandtotal_fa'),
    );
  }
}

 function percentage(params) {
    if (!params.node.group) {
      return custom.create_percentage(
        params.getValue('grandtotal_fa'),
        params.getValue('grandtotal_ft')
      );
    }
  }
  





