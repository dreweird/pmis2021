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
        field: 'adjusted',
        width: 130,
        cellStyle: { color: 'black', 'background-color': '#fae091' },
        aggFunc: TotalAdjustedAggFunc,
        valueGetter: TotalAdjustedValueGetter,
        valueFormatter: this.currencyFormatter,
        type: 'numericColumn'
      },
      {
        headerName: 'Obligation Accomplishment',
        children: [
          {
            headerName: 'Jan',
            field: 'janfa',
            cellClass: ['data'],
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            headerName: 'Feb',
            field: 'febfa',
            cellClass: ['data'],
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            headerName: 'Mar',
            field: 'marfa',
            cellClass: ['data'],
            type: 'valueColumn',
            columnGroupShow: 'open'
          },

          {
            headerName: 'Q1',
            colId: 'Q1',
            type: 'quarterColumn',
            valueGetter: TotalQ1ValueGetter,
            cellClass: ['data', 'a']
          },

          {
            headerName: 'Apr',
            field: 'aprfa',
            cellClass: ['data'],
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            headerName: 'May',
            field: 'mayfa',
            cellClass: ['data'],
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            headerName: 'Jun',
            field: 'junfa',
            cellClass: ['data'],
            type: 'valueColumn',
            columnGroupShow: 'open'
          },

          {
            headerName: 'Q2',
            colId: 'Q2',
            type: 'quarterColumn',
            valueGetter: TotalQ2ValueGetter,
            cellClass: ['data', 'a']
          },

          {
            headerName: 'Jul',
            field: 'julfa',
            cellClass: ['data'],
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            headerName: 'Aug',
            field: 'augfa',
            cellClass: ['data'],
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            headerName: 'Sep',
            field: 'sepfa',
            cellClass: ['data'],
            type: 'valueColumn',
            columnGroupShow: 'open'
          },

          {
            headerName: 'Q3',
            colId: 'Q3',
            type: 'quarterColumn',
            valueGetter: TotalQ3ValueGetter,
            cellClass: ['data', 'a']
          },

          {
            headerName: 'Oct',
            field: 'octfa',
            cellClass: ['data'],
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            headerName: 'Nov',
            field: 'novfa',
            cellClass: ['data'],
            type: 'valueColumn',
            columnGroupShow: 'open'
          },
          {
            headerName: 'Dec',
            field: 'decfa',
            cellClass: ['data'],
            type: 'valueColumn',
            columnGroupShow: 'open'
          },

          {
            headerName: 'Q4',
            colId: 'Q4',
            type: 'quarterColumn',
            valueGetter: TotalQ4ValueGetter,
            cellClass: ['data', 'a']
          }
        ]
      },

      {
        headerName: 'Total Obligations',
        field: 'to',
        width: 130,
        cellStyle: { color: 'black', 'background-color': '#81f7a6' },
        aggFunc: TotalObligationsAggFunc,
        valueGetter: TotalObligationValueGetter,
        valueFormatter: this.currencyFormatter,
        type: 'numericColumn',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        cellClass: ['data', 'total']
      },

      {
        headerName: 'Disbursement Accomplishment',
        children: [
          {
            headerName: 'Jan',
            field: 'janda',
            cellClass: ['data'],
            type: 'valueColumn',
            columnGroupShow: 'open',
            editable: this.canEdit
          },
          {
            headerName: 'Feb',
            field: 'febda',
            cellClass: ['data'],
            type: 'valueColumn',
            columnGroupShow: 'open',
            editable: this.canEdit
          },
          {
            headerName: 'Mar',
            field: 'marda',
            cellClass: ['data'],
            type: 'valueColumn',
            columnGroupShow: 'open',
            editable: this.canEdit
          },

          {
            headerName: 'Q1',
            colId: 'Q1D',
            type: 'quarterColumn2',
            valueGetter: TotalQ1ValueGetter2,
            cellClass: ['data', 'd']
          },

          {
            headerName: 'Apr',
            field: 'aprda',
            cellClass: ['data'],
            type: 'valueColumn',
            columnGroupShow: 'open',
            editable: this.canEdit
          },
          {
            headerName: 'May',
            field: 'mayda',
            cellClass: ['data'],
            type: 'valueColumn',
            columnGroupShow: 'open',
            editable: this.canEdit
          },
          {
            headerName: 'Jun',
            field: 'junda',
            cellClass: ['data'],
            type: 'valueColumn',
            columnGroupShow: 'open',
            editable: this.canEdit
          },

          {
            headerName: 'Q2',
            colId: 'Q2D',
            type: 'quarterColumn2',
            valueGetter: TotalQ2ValueGetter2,
            cellClass: ['data', 'd']
          },

          {
            headerName: 'Jul',
            field: 'julda',
            cellClass: ['data'],
            type: 'valueColumn',
            columnGroupShow: 'open',
            editable: this.canEdit
          },
          {
            headerName: 'Aug',
            field: 'augda',
            cellClass: ['data'],
            type: 'valueColumn',
            columnGroupShow: 'open',
            editable: this.canEdit
          },
          {
            headerName: 'Sep',
            field: 'sepda',
            cellClass: ['data'],
            type: 'valueColumn',
            columnGroupShow: 'open',
            editable: this.canEdit
          },

          {
            headerName: 'Q3',
            colId: 'Q3D',
            type: 'quarterColumn2',
            valueGetter: TotalQ3ValueGetter2,
            cellClass: ['data', 'd']
          },

          {
            headerName: 'Oct',
            field: 'octda',
            cellClass: ['data'],
            type: 'valueColumn',
            columnGroupShow: 'open',
            editable: this.canEdit
          },
          {
            headerName: 'Nov',
            field: 'novda',
            cellClass: ['data'],
            type: 'valueColumn',
            columnGroupShow: 'open',
            editable: this.canEdit
          },
          {
            headerName: 'Dec',
            field: 'decda',
            cellClass: ['data'],
            type: 'valueColumn',
            columnGroupShow: 'open',
            editable: this.canEdit
          },

          {
            headerName: 'Q4',
            colId: 'Q4D',
            type: 'quarterColumn2',
            valueGetter: TotalQ4ValueGetter2,
            cellClass: ['data', 'd']
          }
        ]
      },

      {
        headerName: 'Total Disbursement',
        field: 'td',
        width: 130,
        cellStyle: { color: 'black', 'background-color': '#81f7a6' },
        aggFunc: TotalObligationsAggFunc,
        valueGetter: TotalDisbursementValueGetter,
        valueFormatter: this.currencyFormatter,
        type: 'numericColumn',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        cellClass: ['data', 'total']
      },
      {
        headerName: 'Unpaid Obligations',
        field: 'uo',
        width: 130,
        cellStyle: { color: 'black', 'background-color': '#f7adad' },
        aggFunc: TotalUnpaidAggFunc,
        valueGetter: TotalUnpaidValueGetter,
        valueFormatter: this.currencyFormatter,
        type: 'numericColumn',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        cellClass: ['data', 'v']
      },
      {
        headerName: 'Percentage',
        field: 'per',
        width: 130,
        cellStyle: { color: 'black', 'background-color': '#dfa9f5' },
        aggFunc: TotalPercentageAggFunc,
        valueGetter: TotalPercentageValueGetter,
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
    this.aggFuncs = {
      TotalAdjustedAggFunc: TotalAdjustedAggFunc,
      TotalQuarterAggFunc: TotalQuarterAggFunc,
      TotalObligationsAggFunc: TotalObligationsAggFunc,
      TotalUnpaidAggFunc: TotalUnpaidAggFunc,
      TotalPercentageAggFunc: TotalPercentageAggFunc
    };

    this.columnTypes = {
      valueColumn: {
        width: 130,
        aggFunc: 'sum',
        valueParser: 'Number(newValue)',
        cellStyle: { 'text-align': 'right' },
        valueFormatter: this.currencyFormatter
      },
      quarterColumn: {
        width: 130,
        aggFunc: TotalQuarterAggFunc,
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        cellStyle: {
          'text-align': 'right',
          color: 'black',
          'background-color': '#a2dde5'
        },
        valueFormatter: this.currencyFormatter
      },
      quarterColumn2: {
        width: 130,
        aggFunc: TotalQuarterAggFunc,
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        cellStyle: {
          'text-align': 'right',
          color: 'black',
          'background-color': '#e8eb34'
        },
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
        interior: { color: '#edbae5', pattern: 'Solid' },
        font: { size: 11, fontName: 'Calibri', bold: true },
        alignment: { horizontal: 'Center' }
      },
      {
        id: 'd',
        interior: { color: '#e6f403', pattern: 'Solid' },
        font: { size: 11, fontName: 'Calibri', bold: true },
        alignment: { horizontal: 'Center' }
      },
      {
        id: 'p1',
        interior: { color: '#f4f1ee', pattern: 'Solid' },
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
      'name',
      'adjusted',
      'janfa',
      'febfa',
      'marfa',
      'Q1',
      'aprfa',
      'mayfa',
      'junfa',
      'Q2',
      'julfa',
      'augfa',
      'sepfa',
      'Q3',
      'octfa',
      'novfa',
      'decfa',
      'Q4',
      'to',
      'janda',
      'febda',
      'marda',
      'Q1D',
      'aprda',
      'mayda',
      'junda',
      'Q2D',
      'julda',
      'augda',
      'sepda',
      'Q3D',
      'octda',
      'novda',
      'decda',
      'Q4D',
      'td',
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
            data: { type: 'String', value: '' }
          },
          {
            styleId: 'a',
            data: { type: 'String', value: 'Obligations' },
            mergeAcross: 16
          },
          {
            styleId: 'd',
            data: { type: 'String', value: 'Disbursement' },
            mergeAcross: 18
          }
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

function TotalAdjustedValueGetter(params)  {
  if (!params.node.group) {
    let budget = params.data.janft + params.data.febft  + params.data.marft 
    + params.data.aprft + params.data.mayft + params.data.junft
    + params.data.julft + params.data.augft + params.data.sepft
    + params.data.octft + params.data.novft + params.data.decft ;
    return createValueObject(budget, params.data.adjustment);
  }
}

function createValueObject(budget, adjustment) {
  return {
    budget: budget,
    adjustment: adjustment,
    toString: function() {
      return budget + adjustment;
    }
  };
}

function TotalAdjustedAggFunc(values) {
  var budgetSum = 0;
  var adjustmentSum = 0;
  values.forEach(function(value) {
    if (value && value.budget) {
      budgetSum += value.budget;
    }
    if (value && value.adjustment) {
      adjustmentSum += value.adjustment;
    }
  });
  return createValueObject(budgetSum, adjustmentSum);
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
function createTotalObligationsValueObject(a, b, c, d, e, f, g, h, i, j, k, l) {
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
function TotalObligationsAggFunc(values) {
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
  return createTotalObligationsValueObject(a, b, c, d, e, f, g, h, i, j, k, l);
}

function TotalQ1ValueGetter(params) {
  if (!params.node.group) {
    return createQuarterTotalValueObject(
      params.data.janfa,
      params.data.febfa,
      params.data.marfa
    );
  }
}

function TotalQ2ValueGetter(params) {
  if (!params.node.group) {
    return createQuarterTotalValueObject(
      params.data.aprfa,
      params.data.mayfa,
      params.data.junfa
    );
  }
}

function TotalQ3ValueGetter(params) {
  if (!params.node.group) {
    return createQuarterTotalValueObject(
      params.data.julfa,
      params.data.augfa,
      params.data.sepfa
    );
  }
}
function TotalQ4ValueGetter(params) {
  if (!params.node.group) {
    return createQuarterTotalValueObject(
      params.data.octfa,
      params.data.novfa,
      params.data.decfa
    );
  }
}

function TotalQ1ValueGetter2(params) {
  if (!params.node.group) {
    return createQuarterTotalValueObject(
      params.data.janda,
      params.data.febda,
      params.data.marda
    );
  }
}

function TotalQ2ValueGetter2(params) {
  if (!params.node.group) {
    return createQuarterTotalValueObject(
      params.data.aprda,
      params.data.mayda,
      params.data.junda
    );
  }
}

function TotalQ3ValueGetter2(params) {
  if (!params.node.group) {
    return createQuarterTotalValueObject(
      params.data.julda,
      params.data.augda,
      params.data.sepda
    );
  }
}
function TotalQ4ValueGetter2(params) {
  if (!params.node.group) {
    return createQuarterTotalValueObject(
      params.data.octda,
      params.data.novda,
      params.data.decda
    );
  }
}

function TotalObligationValueGetter(params) {
  if (!params.node.group) {
    return createTotalObligationsValueObject(
      params.data.janfa,
      params.data.febfa,
      params.data.marfa,
      params.data.aprfa,
      params.data.mayfa,
      params.data.junfa,
      params.data.julfa,
      params.data.augfa,
      params.data.sepfa,
      params.data.octfa,
      params.data.novfa,
      params.data.decfa
    );
  }
}

function TotalDisbursementValueGetter(params) {
  if (!params.node.group) {
    return createTotalObligationsValueObject(
      params.data.janda,
      params.data.febda,
      params.data.marda,
      params.data.aprda,
      params.data.mayda,
      params.data.junda,
      params.data.julda,
      params.data.augda,
      params.data.sepda,
      params.data.octda,
      params.data.novda,
      params.data.decda
    );
  }
}

function createTotalUnObligationsValueObject(a, b) {
  return {
    a: a,
    b: b,
    toString: function() {
      return a - b;
    }
  };
}

function TotalUnpaidAggFunc(values) {
  var [a, b] = [0, 0];
  values.forEach(function(value) {
    if (value && value.a) {
      a += value.a;
    }
    if (value && value.b) {
      b += value.b;
    }
  });
  return createTotalUnObligationsValueObject(a, b);
}

function TotalPercentageValueGetter(params) {
  if (!params.node.group) {
    var totalObligation =
      params.data.janfa +
      params.data.febfa +
      params.data.marfa +
      params.data.aprfa +
      params.data.mayfa +
      params.data.junfa +
      params.data.julfa +
      params.data.augfa +
      params.data.sepfa +
      params.data.octfa +
      params.data.novfa +
      params.data.decfa;
    var totalDisbursement =
      params.data.janda +
      params.data.febda +
      params.data.marda +
      params.data.aprda +
      params.data.mayda +
      params.data.junda +
      params.data.julda +
      params.data.augda +
      params.data.sepda +
      params.data.octda +
      params.data.novda +
      params.data.decda;

    return createTotalPercentageValueObject(totalDisbursement, totalObligation);
  }
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

function TotalUnpaidValueGetter(params) {
  if (!params.node.group) {
    var totalObligation =
      params.data.janfa +
      params.data.febfa +
      params.data.marfa +
      params.data.aprfa +
      params.data.mayfa +
      params.data.junfa +
      params.data.julfa +
      params.data.augfa +
      params.data.sepfa +
      params.data.octfa +
      params.data.novfa +
      params.data.decfa;
    var totalDisbursement =
      params.data.janda +
      params.data.febda +
      params.data.marda +
      params.data.aprda +
      params.data.mayda +
      params.data.junda +
      params.data.julda +
      params.data.augda +
      params.data.sepda +
      params.data.octda +
      params.data.novda +
      params.data.decda;

    return createTotalUnObligationsValueObject(
      totalObligation,
      totalDisbursement
    );
  }
}
