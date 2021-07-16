import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input
} from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/animations/route.animations';
import { PmisService } from '../../../core/services/pmis.service';
import { MatDialog } from '@angular/material/dialog';

import { LocalStorageService } from '../../../core/core.module';
import { Router } from '@angular/router';

import { Module } from '@ag-grid-community/all-modules';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import * as moment from 'moment';

@Component({
  selector: 'anms-midyear',
  templateUrl: './midyear.component.html',
  styleUrls: ['./midyear.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MidyearComponent implements OnInit {
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
  locked: any;
  date_updated: any;
  excelStyles: any;

  @Input() pid: number = 0;
  @Input() name: string = '';

  ngOnChanges(changes: any) {
    this.pid = changes.pid.currentValue;
    this.getRow(this.pid);
    this.lastUpdated(this.pid);
  }

  sumAccomp_capped = 0;

  getRow(pid) {
    // this.apmisService.getPhysical(pid).subscribe((data: any) => {
    //   console.log(data)
    //   for(var i in data) {
    //     if(data[i].jana > data[i].jant) { data[i].jana = data[i].jant }
    //     if(data[i].feba > data[i].febt) { data[i].feba = data[i].febt }
    //     if(data[i].mara > data[i].mart) { data[i].mara = data[i].mart }
    //     if(data[i].apra > data[i].aprt) { data[i].apra = data[i].aprt }
    //     if(data[i].maya > data[i].mayt) { data[i].maya = data[i].mayt }
    //     if(data[i].juna > data[i].junt) { data[i].juna = data[i].junt }
    //     if(data[i].jula > data[i].jult) { data[i].jula = data[i].jult }
    //     if(data[i].auga > data[i].augt) { data[i].auga = data[i].augt }
    //     if(data[i].sepa > data[i].sept) { data[i].sepa = data[i].sept }
    //     if(data[i].octa > data[i].octt) { data[i].octa = data[i].octt }
    //     if(data[i].nova > data[i].novt) { data[i].nova = data[i].novt }
    //     if(data[i].deca > data[i].dect) { data[i].deca = data[i].dect }
 
    //   }

    //   for(var x in data) {
    //     this.sumAccomp_capped += data[x].jana + data[x].feba + data[x].mara +
    //     data[x].apra + data[x].maya + data[x].juna +
    //     data[x].jula + data[x].auga + data[x].sepa +
    //     data[x].octa + data[x].nova + data[x].deca;

    //   }

    //   console.log(this.sumAccomp_capped);
     
    // })

    this.apmisService.getPhysical(pid).subscribe(data => {
      this.rowData = data;
      this.cd.markForCheck();
    });
  }

  getLocked() {
    this.apmisService.month_locked().subscribe(data => {
      this.locked = data;
      this.cd.markForCheck();
    });
  }

  lastUpdated(pid) {
    this.apmisService.lastUpdated(pid, 2).subscribe(data => {
      if (data === undefined) this.date_updated = '';
      else this.date_updated = data;
      this.cd.markForCheck();
    });
  }

  onCellValueChanged(event: any) {
    if (
      isNaN(+event.newValue) &&
      event.colDef.cellEditor != 'agLargeTextCellEditor'
    ) {
      event.node.setDataValue(event.colDef.field, event.oldValue);
      alert('Invalid entry...please input numbers only');
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
        beds: 2,
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
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  }

  varianceFormatter(params) {
    const number = Math.abs(params.value);
    if (params.value === undefined || params.value === null) {
      return null;
    }
    var returnString = Number(number).toLocaleString('en-us', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });

    return params.value < 0 ? '(' + returnString + ')' : returnString;
  }

  currencyFormatter2(params) {
    const number = parseFloat(params.value);
    if (params.value === undefined || params.value === null) {
      return null;
    }
    return number.toLocaleString('en-us', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }) + ' %';
  }

  onCellClicked(event) {
    if (
      event.data != undefined &&
      event.data.area == 1 &&
      event.colDef.field == 'mfo_name'
    ) {
      this.router.navigate(['/admin/area', event.data.mfo_id]);
    }
  }

  prog_ou: any;
  export() {
    if (this.user.b != 0) this.prog_ou = this.name;
    else this.prog_ou = this.user.username;
    var ck = [
      'mfo_name',
      'unitmeasure',
      'jant',
      'febt',
      'mart',
      'Q1',
      'aprt',
      'mayt',
      'junt',
      'Q2',
      'jult',
      'augt',
      'sept',
      'Q3',
      'octt',
      'novt',
      'dect',
      'Q4',
      'TT',
      'jana',
      'feba',
      'mara',
      'Q1A',
      'apra',
      'maya',
      'juna',
      'Q2A',
      'jula',
      'auga',
      'sepa',
      'Q3A',
      'octa',
      'nova',
      'deca',
      'Q4A',
      'TA',
      'Var',
      'Per',
      'janr',
      'febr',
      'marr',
      'aprr',
      'mayr',
      'junr',
      'julr',
      'augr',
      'sepr',
      'octr',
      'novr',
      'decr'
    ];
    this.gridApi.exportDataAsExcel({
      sheetName: 'BED-2 ' + this.prog_ou,
      fileName: 'BED-2 ' + this.prog_ou,
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
            data: { type: 'String', value: 'BED2 Physical Report 2021' }
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
            data: { type: 'String', value: 'Physical Targets' },
            mergeAcross: 16
          },
          {
            styleId: 'a',
            data: { type: 'String', value: 'Physical Accomplishments' },
            mergeAcross: 16
          },
          { styleId: 'p1', data: { type: 'String', value: '' } },
          { styleId: 'p1', data: { type: 'String', value: '' } },
          {
            styleId: 'r',
            data: { type: 'String', value: 'Remarks' },
            mergeAcross: 11
          }
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
    public apmisService: PmisService,
    private cd: ChangeDetectorRef,
    public dialog: MatDialog,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    this.user = this.localStorageService.getItem('AUTH');
    this.canEdit = this.user.b == 0;

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
        cellClass: ['data'],
        hide: true
      },
      {
        headerName: 'Physical Target',
        children: [
          {
            headerName: 'Jan',
            field: 'jant',
            type: 'valueColumn',
            columnGroupShow: 'open',
            cellClass: ['data']
          },
          {
            headerName: 'Feb',
            field: 'febt',
            type: 'valueColumn',
            columnGroupShow: 'open',
            cellClass: ['data']
          },
          {
            headerName: 'Mar',
            field: 'mart',
            type: 'valueColumn',
            columnGroupShow: 'open',
            cellClass: ['data']
          },

          {
            headerName: 'Q1',
            colId: 'Q1',
            type: 'quarterColumn',
            valueGetter: TotalQ1ValueGetter,
            cellClass: ['data', 't']
          },

          {
            headerName: 'Apr',
            field: 'aprt',
            type: 'valueColumn',
            columnGroupShow: 'open',
            cellClass: ['data']
          },
          {
            headerName: 'May',
            field: 'mayt',
            type: 'valueColumn',
            columnGroupShow: 'open',
            cellClass: ['data']
          },
          {
            headerName: 'Jun',
            field: 'junt',
            type: 'valueColumn',
            columnGroupShow: 'open',
            cellClass: ['data']
          },

          {
            headerName: 'Q2',
            colId: 'Q2',
            type: 'quarterColumn',
            valueGetter: TotalQ2ValueGetter,
            cellClass: ['data', 't']
          },

         
          {
            headerName: 'Total',
            colId: 'TT',
            width: 110,
            cellStyle: params => {
              if(params.node.group) { return { 'text-align': 'right', color: 'black', 'background-color': '#81f7a6', 'font-weight': 'bold' }}else{return { 'text-align': 'right', color: 'black', 'background-color': '#81f7a6'}}
            },
            aggFunc: TotalPhysicalTargetAggFunc,
            valueGetter: TotalPhysicalTargetValueGetter,
            valueFormatter: this.currencyFormatter,
            type: 'numericColumn',
            cellClass: ['data', 'total']
          }
        ]
      },
      {
        headerName: 'Physical Accomplishment',
        children: [
          {
            headerName: 'Jan',
            field: 'jana',
            type: 'valueColumn',
            cellClass: ['data'],
            columnGroupShow: 'open',
            editable: (params) => {
              if (this.locked[0].checked && this.canEdit && !params.data.area) return true;
              else return false;
            }
          },
          {
            headerName: 'Feb',
            field: 'feba',
            type: 'valueColumn',
            cellClass: ['data'],
            columnGroupShow: 'open',
            editable: (params) => {
              if (this.locked[1].checked && this.canEdit && !params.data.area) return true;
              else return false;
            }
          },
          {
            headerName: 'Mar',
            field: 'mara',
            type: 'valueColumn',
            cellClass: ['data'],
            columnGroupShow: 'open',
            editable: (params) => {
              if (this.locked[2].checked && this.canEdit && !params.data.area) return true;
              else return false;
            }
          },

          {
            headerName: 'Q1',
            colId: 'Q1A',
            type: 'quarterColumn2',
            valueGetter: TotalQ1ValueGetter2,
            cellClass: ['data', 'a']
          },

          {
            headerName: 'Apr',
            field: 'apra',
            type: 'valueColumn',
            cellClass: ['data'],
            columnGroupShow: 'open',
            editable: (params) => {
              if (this.locked[3].checked && this.canEdit && !params.data.area) return true;
              else return false;
            }
          },
          {
            headerName: 'May',
            field: 'maya',
            type: 'valueColumn',
            cellClass: ['data'],
            columnGroupShow: 'open',
            editable: (params) => {
              if (this.locked[4].checked && this.canEdit && !params.data.area) return true;
              else return false;
            }
          },
          {
            headerName: 'Jun',
            field: 'juna',
            type: 'valueColumn',
            cellClass: ['data'],
            columnGroupShow: 'open',
            editable: (params) => {
              if (this.locked[5].checked && this.canEdit && !params.data.area) return true;
              else return false;
            }
          },

          {
            headerName: 'Q2',
            colId: 'Q2A',
            type: 'quarterColumn2',
            valueGetter: TotalQ2ValueGetter2,
            cellClass: ['data', 'a']
          },

          {
            headerName: 'Total',
            colId: 'TA',
            width: 110,
            cellStyle: params => {
              if(params.node.group) { return { 'text-align': 'right', color: 'black', 'background-color': '#81f7a6', 'font-weight': 'bold' }}else{return { 'text-align': 'right', color: 'black', 'background-color': '#81f7a6'}}
            },
            aggFunc: TotalPhysicalTargetAggFunc,
            valueGetter: TotalPhysicalAccomplishmentValueGetter,
            valueFormatter: this.currencyFormatter,
            type: 'numericColumn',
            cellClass: ['data', 'total']
          }
        ]
      },
      {
        headerName: 'Variance',
        colId: 'Var',
        width: 110,
        cellStyle: params => {
          if(params.node.group) { return { 'text-align': 'right', color: 'black', 'background-color': '#f7adad', 'font-weight': 'bold' }}else{return { 'text-align': 'right', color: 'black', 'background-color': '#f7adad'}}
        },
        aggFunc: TotalVarianceAggFunc,
        valueGetter: TotalUnObligationValueGetter,
        valueFormatter: this.varianceFormatter,
        type: 'numericColumn',
        cellClass: ['data', 'v']
      },
      {
        headerName: 'Percentage',
        colId: 'Per',
        width: 110,
        cellStyle: params => {
          if(params.node.group) { return { 'text-align': 'right', color: 'black', 'background-color': '#dfa9f5', 'font-weight': 'bold' }}else{return { 'text-align': 'right', color: 'black', 'background-color': '#dfa9f5'}}
        },
        aggFunc: TotalPercentageAggFunc,
        valueGetter: TotalPercentageValueGetter,
        valueFormatter: this.currencyFormatter2,
        type: 'numericColumn',
        cellClass: ['data', 'p']
      },
      {
        headerName: 'Remarks',
        children: [
          {
            headerName: 'Jan',
            field: 'janr',
          //  type: 'remarksColumn',
            editable: this.canEdit,
            cellEditor: 'agLargeTextCellEditor',
            cellEditorParams: { maxLength: '3000', cols: '50', rows: 6},
            cellClass: ['data']
          },
          {
            headerName: 'Feb',
            field: 'febr',
         //   type: 'remarksColumn',
            editable: this.canEdit,
            cellEditorParams: { maxLength: '3000', cols: '50', rows: 6},
            cellEditor: 'agLargeTextCellEditor',
            cellClass: ['data']
          },
          {
            headerName: 'Mar',
            field: 'marr',
          //  type: 'remarksColumn',
            editable: this.canEdit,
            cellEditorParams: { maxLength: '3000', cols: '50', rows: 6},
            cellEditor: 'agLargeTextCellEditor',
            cellClass: ['data']
          },
          {
            headerName: 'Apr',
            field: 'aprr',
          //  type: 'remarksColumn',
            editable: this.canEdit,
            cellEditor: 'agLargeTextCellEditor',
            cellEditorParams: { maxLength: '3000', cols: '50', rows: 6},
            cellClass: ['data']
          },
          {
            headerName: 'May',
            field: 'mayr',
          //  type: 'remarksColumn',
            editable: this.canEdit,
            cellEditor: 'agLargeTextCellEditor',
            cellEditorParams: { maxLength: '3000', cols: '50', rows: 6},
            cellClass: ['data']
          },
          {
            headerName: 'Jun',
            field: 'junr',
         //   type: 'remarksColumn',
            editable: this.canEdit,
            cellEditor: 'agLargeTextCellEditor',
            cellEditorParams: { maxLength: '3000', cols: '50', rows: 6},
            cellClass: ['data']
          }
        ]
      }
    ];

    this.excelStyles = [
      { id: 'indent1', alignment: { indent: 1 }, dataType: 'string' },
      { id: 'indent2', alignment: { indent: 2 }, dataType: 'string' },
      { id: 'indent3', alignment: { indent: 3 }, dataType: 'string' },
      { id: 'indent4', alignment: { indent: 4 }, dataType: 'string' },
      { id: 'indent5', alignment: { indent: 5 }, dataType: 'string' },
      { id: 'bold', font: { bold: true } },
      {
        id: 'data',
        font: { size: 11, fontName: 'Calibri' },
        borders: {
          borderBottom: {
            color: '#000000',
            lineStyle: 'Continuous',
            weight: 1
          },
          borderLeft: { color: '#000000', lineStyle: 'Continuous', weight: 1 },
          borderRight: { color: '#000000', lineStyle: 'Continuous', weight: 1 },
          borderTop: { color: '#000000', lineStyle: 'Continuous', weight: 1 }
        }
      },
      {
        id: 't',
        interior: { color: '#fae091', pattern: 'Solid' },
        font: { size: 11, fontName: 'Calibri', bold: true },
        alignment: { horizontal: 'Center' }
      },
      {
        id: 'a',
        interior: { color: '#a2dde5', pattern: 'Solid' },
        font: { size: 11, fontName: 'Calibri', bold: true },
        alignment: { horizontal: 'Center' }
      },
      {
        id: 'v',
        interior: { color: '#ec9fa7', pattern: 'Solid' },
        font: { size: 11, fontName: 'Calibri', bold: true },
        alignment: { horizontal: 'Center' }
      },
      {
        id: 'p',
        interior: { color: '#e6f403', pattern: 'Solid' },
        font: { size: 11, fontName: 'Calibri', bold: true },
        alignment: { horizontal: 'Center' }
      },
      {
        id: 'r',
        interior: { color: '#edbae5', pattern: 'Solid' },
        font: { size: 11, fontName: 'Calibri', bold: true },
        alignment: { horizontal: 'Center' }
      },
      {
        id: 'p1',
        interior: { color: '#7a6f67', pattern: 'Solid' },
        font: { size: 11, fontName: 'Calibri', bold: true },
        alignment: { horizontal: 'Center' }
      },
      {
        id: 'total',
        interior: { color: '#81f7a6', pattern: 'Solid' },
        font: { size: 11, fontName: 'Calibri', bold: true },
        alignment: { horizontal: 'Center' }
      },

      {
        id: 'header',
        font: { size: 11, fontName: 'Calibri', bold: true },
        borders: {
          borderBottom: {
            color: '#000000',
            lineStyle: 'Continuous',
            weight: 1
          },
          borderLeft: { color: '#000000', lineStyle: 'Continuous', weight: 1 },
          borderRight: { color: '#000000', lineStyle: 'Continuous', weight: 1 },
          borderTop: { color: '#000000', lineStyle: 'Continuous', weight: 1 }
        }
      },
      { id: 'headappend', font: { size: 11, fontName: 'Calibri', bold: true } }
    ];

    this.defaultColDef = { sortable: true, resizable: true, filter: true };
    this.context = { componentParent: this };
    this.components = {
      simpleCellRenderer: getSimpleCellRenderer()
    };

    this.aggFuncs = {
      TotalQuarterAggFunc: TotalQuarterAggFunc,
      TotalPhysicalTargetAggFunc: TotalPhysicalTargetAggFunc,
      TotalVarianceAggFunc: TotalVarianceAggFunc,
      TotalPercentageAggFunc: TotalPercentageAggFunc
    };

    this.columnTypes = {
      valueColumn: {
        width: 110,
        aggFunc: 'sum',
        valueParser: 'Number(newValue)',
        cellStyle: params => {
          if(params.node.group) { return { 'text-align': 'right',  'font-weight': 'bold' }}else{return { 'text-align': 'right'}}
        },
        valueFormatter: this.currencyFormatter
      },
      quarterColumn: {
        width: 110,
        aggFunc: TotalQuarterAggFunc,
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        cellStyle: params => {
          if(params.node.group) { return { 'text-align': 'right', color: 'black', 'background-color': '#fae091', 'font-weight': 'bold' }}else{return { 'text-align': 'right', color: 'black', 'background-color': '#fae091'}}
        },
        valueFormatter: this.currencyFormatter
      },
      quarterColumn2: {
        width: 110,
        aggFunc: TotalQuarterAggFunc,
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        cellStyle: params => {
          if(params.node.group) { return { 'text-align': 'right', color: 'black', 'background-color': '#a2dde5', 'font-weight': 'bold' }}else{return { 'text-align': 'right', color: 'black', 'background-color': '#a2dde5'}}
        },
        valueFormatter: this.currencyFormatter
      },
     // remarksColumn: { width: 120, maxLength: 3000, cols: 40, rows: 5 }
    };

    this.autoGroupColumnDef = {
      headerName: 'PAP',
      cellRenderer: 'agGroupCellRenderer',
      pinned: 'left',
      width: 350,
      field: 'mfo_name',
      cellRendererParams: {
        suppressCount: true, // turn off the row count
        innerRenderer: 'simpleCellRenderer',
        suppressPadding: true
      }
    };
  }

  ngOnInit(): void {
    this.pid = this.user.pid
    this.getRow(this.pid);
    this.getLocked();
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
    } else if (params.data.area == 1) {
      tempDiv.innerHTML =
        '<span style="font-style: italic">' + params.value + '</span>';
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

function TotalQuarterAggFunc(values) {
  var aSum = 0,
    bSum = 0,
    cSum = 0;
  values.forEach(function(value) {
    if (value && value.a) {
      aSum += value.a;
    }
    if (value && value.b) {
      bSum += value.b;
    }
    if (value && value.c) {
      cSum += value.c;
    }
  });
  return createQuarterTotalValueObject(aSum, bSum, cSum);
}

function createQuarterTotalValueObject(a, b, c) {
  return {
    a: a,
    b: b,
    c: c,
    toString: function() {
      return a + b + c;
    }
  };
}

function TotalQ1ValueGetter(params) {
  if (!params.node.group) {
    return createQuarterTotalValueObject(
      params.data.jant,
      params.data.febt,
      params.data.mart
    );
  }
}

function TotalQ2ValueGetter(params) {
  if (!params.node.group) {
    return createQuarterTotalValueObject(
      params.data.aprt,
      params.data.mayt,
      params.data.junt
    );
  }
}

function TotalQ3ValueGetter(params) {
  if (!params.node.group) {
    return createQuarterTotalValueObject(
      params.data.jult,
      params.data.augt,
      params.data.sept
    );
  }
}
function TotalQ4ValueGetter(params) {
  if (!params.node.group) {
    return createQuarterTotalValueObject(
      params.data.octt,
      params.data.novt,
      params.data.dect
    );
  }
}

function TotalPhysicalTargetValueGetter(params) {
  if (!params.node.group) {
    return createTotalPhysicalTarget(
      params.data.jant,
      params.data.febt,
      params.data.mart,
      params.data.aprt,
      params.data.mayt,
      params.data.junt
    );
  }
}

function createTotalPhysicalTarget(a, b, c, d, e, f) {
  return {
    a: a,
    b: b,
    c: c,
    d: d,
    e: e,
    f: f,
    toString: function() {
      return a + b + c + d + e + f;
    }
  };
}
function TotalPhysicalTargetAggFunc(values) {
  var [a, b, c, d, e, f, g, h, i, j, k, l] = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ];
  values.forEach(function(value) {
    if (value && value.a) {
      a += value.a;
    }
    if (value && value.b) {
      b += value.b;
    }
    if (value && value.c) {
      c += value.c;
    }
    if (value && value.d) {
      d += value.d;
    }
    if (value && value.e) {
      e += value.e;
    }
    if (value && value.f) {
      f += value.f;
    }

  });
  return createTotalPhysicalTarget(a, b, c, d, e, f);
}
function TotalQ1ValueGetter2(params) {
  if (!params.node.group) {
    return createQuarterTotalValueObject(
      params.data.jana,
      params.data.feba,
      params.data.mara
    );
  }
}

function TotalQ2ValueGetter2(params) {
  if (!params.node.group) {
    return createQuarterTotalValueObject(
      params.data.apra,
      params.data.maya,
      params.data.juna
    );
  }
}

function TotalQ3ValueGetter2(params) {
  if (!params.node.group) {
    return createQuarterTotalValueObject(
      params.data.jula,
      params.data.auga,
      params.data.sepa
    );
  }
}
function TotalQ4ValueGetter2(params) {
  if (!params.node.group) {
    return createQuarterTotalValueObject(
      params.data.octa,
      params.data.nova,
      params.data.deca
    );
  }
}

function TotalPhysicalAccomplishmentValueGetter(params) {
  if (!params.node.group) {
    return createTotalPhysicalTarget(
      params.data.jana,
      params.data.feba,
      params.data.mara,
      params.data.apra,
      params.data.maya,
      params.data.juna,
    );
  }
}

function TotalUnObligationValueGetter(params) {
  if (!params.node.group) {
    var totalAccomplishment =
      params.data.jana +
      params.data.feba +
      params.data.mara +
      params.data.apra +
      params.data.maya +
      params.data.juna;
    var totalTarget =
      params.data.jant +
      params.data.febt +
      params.data.mart +
      params.data.aprt +
      params.data.mayt +
      params.data.junt;

    return createTotalVarianceValueObject(totalAccomplishment, totalTarget);
  }
}

function createTotalVarianceValueObject(a, b) {
  return {
    a: a,
    b: b,
    toString: function() {
      return a - b;
    }
  };
}

function TotalVarianceAggFunc(values) {
  var [a, b] = [0, 0];
  values.forEach(function(value) {
    if (value && value.a) {
      a += value.a;
    }
    if (value && value.b) {
      b += value.b;
    }
  });
  return createTotalVarianceValueObject(a, b);
}

function TotalPercentageAggFunc(values) {
  var [a, b] = [0, 0];
  values.forEach(function(value) {
    if (value && value.a) {
      a += value.a;
    }
    if (value && value.b) {
      b += value.b;
    }
  });
  return createTotalPercentageValueObject(a, b);
}

function createTotalPercentageValueObject(a, b) {
  return {
    a: a,
    b: b,
    toString: function() {
      return a && b ? (a / b) * 100 : 0;
    }
  };
}

function TotalPercentageValueGetter(params) {
  if (!params.node.group) {
    var totalAccomplishment =
      params.data.jana +
      params.data.feba +
      params.data.mara +
      params.data.apra +
      params.data.maya +
      params.data.juna;
    var totalTarget =
      params.data.jant +
      params.data.febt +
      params.data.mart +
      params.data.aprt +
      params.data.mayt +
      params.data.junt;

    return createTotalPercentageValueObject(totalAccomplishment, totalTarget);
  }
}
