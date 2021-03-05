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

 

  prog_ou: any;
  export() {
    if (this.user.b != 0) this.prog_ou = this.name;
    else this.prog_ou = this.user.username;
    var ck = [
      'mfo_name',
      'unitmeasure',
      'janft',
      'febft',
      'marft',
      'Q1_ft',
      'aprft',
      'mayft',
      'junft',
      'Q2_ft',
      'julft',
      'augft',
      'sepft',
      'Q3_ft',
      'octft',
      'novft',
      'decft',
      'Q4_ft',
      'FT',
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
      'jandt',
      'febdt',
      'mardt',
      'Q1_dt',
      'aprdt',
      'maydt',
      'jundt',
      'Q2_dt',
      'juldt',
      'augdt',
      'sepdt',
      'Q3_dt',
      'octdt',
      'novdt',
      'decdt',
      'Q4_dt',
      'DT',

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
            mergeAcross: 16
          },
          {
            styleId: 'a',
            data: { type: 'String', value: 'BED 2 - Physical Targets' },
            mergeAcross: 16
          },
          {
            styleId: 'r',
            data: { type: 'String', value: 'BED 3 - Disbursement Targets' },
            mergeAcross: 16
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
    private localStorageService: LocalStorageService
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
        cellClass: ['data']
      },
      {
        headerName: 'BED 1 - Obligation Target',
        children: [
          {
            headerName: 'Jan',
            field: 'janft',
            type: 'valueColumn',
            columnGroupShow: 'open',
            cellClass: ['data']
          },
          {
            headerName: 'Feb',
            field: 'febft',
            type: 'valueColumn',
            columnGroupShow: 'open',
            cellClass: ['data']
          },
          {
            headerName: 'Mar',
            field: 'marft',
            type: 'valueColumn',
            columnGroupShow: 'open',
            cellClass: ['data']
          },

          {
            headerName: 'Q1',
            colId: 'Q1_ft',
            type: 'quarterColumn',
            valueGetter: TotalQ1ValueGetter2,
            cellClass: ['data', 't']
          },

          {
            headerName: 'Apr',
            field: 'aprft',
            type: 'valueColumn',
            columnGroupShow: 'open',
            cellClass: ['data']
          },
          {
            headerName: 'May',
            field: 'mayft',
            type: 'valueColumn',
            columnGroupShow: 'open',
            cellClass: ['data']
          },
          {
            headerName: 'Jun',
            field: 'junft',
            type: 'valueColumn',
            columnGroupShow: 'open',
            cellClass: ['data']
          },

          {
            headerName: 'Q2',
            colId: 'Q2_ft',
            type: 'quarterColumn',
            valueGetter: TotalQ2ValueGetter2,
            cellClass: ['data', 't']
          },

          {
            headerName: 'Jul',
            field: 'julft',
            type: 'valueColumn',
            columnGroupShow: 'open',
            cellClass: ['data']
          },
          {
            headerName: 'Aug',
            field: 'augft',
            type: 'valueColumn',
            columnGroupShow: 'open',
            cellClass: ['data']
          },
          {
            headerName: 'Sep',
            field: 'sepft',
            type: 'valueColumn',
            columnGroupShow: 'open',
            cellClass: ['data']
          },

          {
            headerName: 'Q3',
            colId: 'Q3_ft',
            type: 'quarterColumn',
            valueGetter: TotalQ3ValueGetter2,
            cellClass: ['data', 't']
          },

          {
            headerName: 'Oct',
            field: 'octft',
            type: 'valueColumn',
            columnGroupShow: 'open',
            cellClass: ['data']
          },
          {
            headerName: 'Nov',
            field: 'novft',
            type: 'valueColumn',
            columnGroupShow: 'open',
            cellClass: ['data']
          },
          {
            headerName: 'Dec',
            field: 'decft',
            type: 'valueColumn',
            columnGroupShow: 'open',
            cellClass: ['data']
          },

          {
            headerName: 'Q4',
            colId: 'Q4_ft',
            type: 'quarterColumn',
            valueGetter: TotalQ4ValueGetter2,
            cellClass: ['data', 't']
          },
          {
            headerName: 'Total',
            colId: 'FT',
            width: 110,
            cellStyle: { color: 'black', 'background-color': '#81f7a6' },
            aggFunc: TotalPhysicalTargetAggFunc,
            valueGetter: TotalObligationTargetValueGetter,
            valueFormatter: this.currencyFormatter,
            type: 'numericColumn',
            cellClass: ['data', 'total']
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
            colId: 'Q1_pt',
            type: 'quarterColumn2',
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
            colId: 'Q2_pt',
            type: 'quarterColumn2',
            valueGetter: TotalQ2ValueGetter,
            cellClass: ['data', 't']
          },

          {
            headerName: 'Jul',
            field: 'jult',
            type: 'valueColumn',
            columnGroupShow: 'open',
            cellClass: ['data']
          },
          {
            headerName: 'Aug',
            field: 'augt',
            type: 'valueColumn',
            columnGroupShow: 'open',
            cellClass: ['data']
          },
          {
            headerName: 'Sep',
            field: 'sept',
            type: 'valueColumn',
            columnGroupShow: 'open',
            cellClass: ['data']
          },

          {
            headerName: 'Q3',
            colId: 'Q3_pt',
            type: 'quarterColumn2',
            valueGetter: TotalQ3ValueGetter,
            cellClass: ['data', 't']
          },

          {
            headerName: 'Oct',
            field: 'octt',
            type: 'valueColumn',
            columnGroupShow: 'open',
            cellClass: ['data']
          },
          {
            headerName: 'Nov',
            field: 'novt',
            type: 'valueColumn',
            columnGroupShow: 'open',
            cellClass: ['data']
          },
          {
            headerName: 'Dec',
            field: 'dect',
            type: 'valueColumn',
            columnGroupShow: 'open',
            cellClass: ['data']
          },

          {
            headerName: 'Q4',
            colId: 'Q4_pt',
            type: 'quarterColumn2',
            valueGetter: TotalQ4ValueGetter,
            cellClass: ['data', 't']
          },
          {
            headerName: 'Total',
            colId: 'PT',
            width: 110,
            cellStyle: { color: 'black', 'background-color': '#81f7a6' },
            aggFunc: TotalPhysicalTargetAggFunc,
            valueGetter: TotalPhysicalTargetValueGetter,
            valueFormatter: this.currencyFormatter,
            type: 'numericColumn',
            cellClass: ['data', 'total']
          }
        ]
      },
      {
        headerName: 'BED 3 - Disbursement Target',
        children: [
          {
            headerName: 'Jan',
            field: 'jandt',
            type: 'valueColumn',
            columnGroupShow: 'open',
            cellClass: ['data']
          },
          {
            headerName: 'Feb',
            field: 'febdt',
            type: 'valueColumn',
            columnGroupShow: 'open',
            cellClass: ['data']
          },
          {
            headerName: 'Mar',
            field: 'mardt',
            type: 'valueColumn',
            columnGroupShow: 'open',
            cellClass: ['data']
          },

          {
            headerName: 'Q1',
            colId: 'Q1_dt',
            type: 'quarterColumn3',
            valueGetter: TotalQ1ValueGetter3,
            cellClass: ['data', 't']
          },

          {
            headerName: 'Apr',
            field: 'aprdt',
            type: 'valueColumn',
            columnGroupShow: 'open',
            cellClass: ['data']
          },
          {
            headerName: 'May',
            field: 'maydt',
            type: 'valueColumn',
            columnGroupShow: 'open',
            cellClass: ['data']
          },
          {
            headerName: 'Jun',
            field: 'jundt',
            type: 'valueColumn',
            columnGroupShow: 'open',
            cellClass: ['data']
          },

          {
            headerName: 'Q2',
            colId: 'Q2_dt',
            type: 'quarterColumn3',
            valueGetter: TotalQ2ValueGetter3,
            cellClass: ['data', 't']
          },

          {
            headerName: 'Jul',
            field: 'juldt',
            type: 'valueColumn',
            columnGroupShow: 'open',
            cellClass: ['data']
          },
          {
            headerName: 'Aug',
            field: 'augdt',
            type: 'valueColumn',
            columnGroupShow: 'open',
            cellClass: ['data']
          },
          {
            headerName: 'Sep',
            field: 'sepdt',
            type: 'valueColumn',
            columnGroupShow: 'open',
            cellClass: ['data']
          },

          {
            headerName: 'Q3',
            colId: 'Q3_dt',
            type: 'quarterColumn3',
            valueGetter: TotalQ3ValueGetter3,
            cellClass: ['data', 't']
          },

          {
            headerName: 'Oct',
            field: 'octdt',
            type: 'valueColumn',
            columnGroupShow: 'open',
            cellClass: ['data']
          },
          {
            headerName: 'Nov',
            field: 'novdt',
            type: 'valueColumn',
            columnGroupShow: 'open',
            cellClass: ['data']
          },
          {
            headerName: 'Dec',
            field: 'decdt',
            type: 'valueColumn',
            columnGroupShow: 'open',
            cellClass: ['data']
          },

          {
            headerName: 'Q4',
            colId: 'Q4_dt',
            type: 'quarterColumn3',
            valueGetter: TotalQ4ValueGetter3,
            cellClass: ['data', 't']
          },
          {
            headerName: 'Total',
            colId: 'DT',
            width: 110,
            cellStyle: { color: 'black', 'background-color': '#81f7a6' },
            aggFunc: TotalPhysicalTargetAggFunc,
            valueGetter: TotalObligationTargetValueGetter,
            valueFormatter: this.currencyFormatter,
            type: 'numericColumn',
            cellClass: ['data', 'total']
          }
        ]
      },
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
      TotalPhysicalTargetAggFunc: TotalPhysicalTargetAggFunc
    };

    this.columnTypes = {
      valueColumn: {
        width: 110,
        aggFunc: 'sum',
        valueParser: 'Number(newValue)',
        cellStyle: { 'text-align': 'right' },
        valueFormatter: this.currencyFormatter
      },
      quarterColumn: {
        width: 110,
        aggFunc: TotalQuarterAggFunc,
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        cellStyle: {
          'text-align': 'right',
          color: 'black',
          'background-color': '#fae091'
        },
        valueFormatter: this.currencyFormatter
      },
      quarterColumn2: {
        width: 110,
        aggFunc: TotalQuarterAggFunc,
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        cellStyle: {
          'text-align': 'right',
          color: 'black',
          'background-color': '#a2dde5'
        },
        valueFormatter: this.currencyFormatter
      },
      quarterColumn3: {
        width: 110,
        aggFunc: TotalQuarterAggFunc,
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
      params.data.junt,
      params.data.jult,
      params.data.augt,
      params.data.sept,
      params.data.octt,
      params.data.novt,
      params.data.dect
    );
  }
}

function createTotalPhysicalTarget(a, b, c, d, e, f, g, h, i, j, k, l) {
  return {
    a: a,
    b: b,
    c: c,
    d: d,
    e: e,
    f: f,
    g: g,
    h: h,
    i: i,
    j: j,
    k: k,
    l: l,
    toString: function() {
      return a + b + c + d + e + f + g + h + i + j + k + l;
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
    if (value && value.g) {
      g += value.g;
    }
    if (value && value.h) {
      h += value.h;
    }
    if (value && value.i) {
      i += value.i;
    }
    if (value && value.j) {
      j += value.j;
    }
    if (value && value.k) {
      k += value.k;
    }
    if (value && value.l) {
      l += value.l;
    }
  });
  return createTotalPhysicalTarget(a, b, c, d, e, f, g, h, i, j, k, l);
}
function TotalQ1ValueGetter2(params) {
  if (!params.node.group) {
    return createQuarterTotalValueObject(
      params.data.janft,
      params.data.febft,
      params.data.marft
    );
  }
}

function TotalQ2ValueGetter2(params) {
  if (!params.node.group) {
    return createQuarterTotalValueObject(
      params.data.aprft,
      params.data.mayft,
      params.data.junft
    );
  }
}

function TotalQ3ValueGetter2(params) {
  if (!params.node.group) {
    return createQuarterTotalValueObject(
      params.data.julft,
      params.data.augft,
      params.data.sepft
    );
  }
}
function TotalQ4ValueGetter2(params) {
  if (!params.node.group) {
    return createQuarterTotalValueObject(
      params.data.octft,
      params.data.novft,
      params.data.decft
    );
  }
}

function TotalQ1ValueGetter3(params) {
  if (!params.node.group) {
    return createQuarterTotalValueObject(
      params.data.jandt,
      params.data.febdt,
      params.data.mardt
    );
  }
}

function TotalQ2ValueGetter3(params) {
  if (!params.node.group) {
    return createQuarterTotalValueObject(
      params.data.aprdt,
      params.data.maydt,
      params.data.jundt
    );
  }
}

function TotalQ3ValueGetter3(params) {
  if (!params.node.group) {
    return createQuarterTotalValueObject(
      params.data.juldt,
      params.data.augdt,
      params.data.sepdt
    );
  }
}
function TotalQ4ValueGetter3(params) {
  if (!params.node.group) {
    return createQuarterTotalValueObject(
      params.data.octdt,
      params.data.novdt,
      params.data.decdt
    );
  }
}

function TotalObligationTargetValueGetter(params) {
  if (!params.node.group) {
    return createTotalPhysicalTarget(
      params.data.janft,
      params.data.febft,
      params.data.marft,
      params.data.aprft,
      params.data.mayft,
      params.data.junft,
      params.data.julft,
      params.data.augft,
      params.data.sepft,
      params.data.octft,
      params.data.novft,
      params.data.decft
    );
  }
}

function TotalDisbursementTargetValueGetter(params) {
  if (!params.node.group) {
    return createTotalPhysicalTarget(
      params.data.jandt,
      params.data.febdt,
      params.data.mardt,
      params.data.aprdt,
      params.data.maydt,
      params.data.jundt,
      params.data.juldt,
      params.data.augdt,
      params.data.sepdt,
      params.data.octdt,
      params.data.novdt,
      params.data.decdt
    );
  }
}





