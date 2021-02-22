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
import { AddObjectDialogComponent } from './addObject-dialog.component';
import * as moment from 'moment';

import { Module } from '@ag-grid-community/all-modules';
import { AllModules } from '@ag-grid-enterprise/all-modules';

@Component({
  selector: 'anms-obligation',
  templateUrl: './obligation.component.html',
  styleUrls: ['./obligation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObligationComponent implements OnInit, OnChanges {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  @Input() pid: number = 0;
  @Input() name: string = '';

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
    this.pmisService.getObligation(pid).subscribe(data => {
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

  addObject(params) {
    if (this.user.b == 1) {
      if (params.colDef.headerName === 'PAP' && params.data !== undefined) {
        const selectedRows = this.gridApi.getSelectedRows();
        const dialogRef = this.dialog.open(AddObjectDialogComponent, {
          data: {
            data: selectedRows[0],
            gridApi: this.gridApi,
            pid: this.pid,
            add: true
          }
        });
        return dialogRef.afterClosed();
      }
      if (
        params.colDef.headerName === 'Description' &&
        params.data !== undefined
      ) {
        const selectedRows = this.gridApi.getSelectedRows();
        const dialogRef = this.dialog.open(AddObjectDialogComponent, {
          data: {
            data: selectedRows[0],
            gridApi: this.gridApi,
            pid: this.pid,
            edit: true
          }
        });
        return dialogRef.afterClosed();
      }
    }
  }

  onCellValueChanged(event: any) {
    if (isNaN(+event.newValue)) {
      alert('Invalid entry...input numbers only');
      event.newValue = null;
    } else {
      this.pmisService
        .updateAllotment(event.colDef.field, event.newValue, event.data.id)
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
      'name',
      'object_id',
      'budget',
      'adjustment',
      'adjusted',
      'jan',
      'feb',
      'mar',
      'Q1',
      'apr',
      'may',
      'jun',
      'Q2',
      'jul',
      'aug',
      'sep',
      'Q3',
      'oct',
      'nov',
      'decm',
      'Q4',
      'to',
      'un',
      'fu'
    ];
    this.gridApi.exportDataAsExcel({
      sheetName: 'BED-1 ' + this.prog_ou,
      fileName: 'BED-1 ' + this.prog_ou,
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
            data: { type: 'String', value: 'BED1 Obligation Report 2021' }
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
            data: { type: 'String', value: '' },
            mergeAcross: 5
          },
          {
            styleId: 'a',
            data: { type: 'String', value: 'Obligations' },
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
        headerName: 'Description',
        field: 'name',
        width: 150,
        pinned: 'left',
        cellClass: ['data']
      },
      {
        headerName: 'UACS Object Code',
        field: 'object_id',
        width: 120,
        cellClass: ['data']
      },
      {
        headerName: 'Original Allotment',
        field: 'budget',
        type: 'valueColumn',
        editable: this.canEdit,
        cellClass: ['data']
      },
      {
        headerName: 'Adjustment',
        field: 'adjustment',
        type: 'valueColumn',
        editable: this.canEdit,
        cellClass: ['data']
      },
      {
        headerName: 'Adjusted Allotment',
        field: 'adjusted',
        width: 130,
        cellStyle: { color: 'black', 'background-color': '#fae091' },
        cellClass: ['data', 't'],
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
            field: 'jan',
            type: 'valueColumn',
            columnGroupShow: 'open',
            editable: this.canEdit,
            cellClass: ['data']
          },
          {
            headerName: 'Feb',
            field: 'feb',
            type: 'valueColumn',
            columnGroupShow: 'open',
            editable: this.canEdit,
            cellClass: ['data']
          },
          {
            headerName: 'Mar',
            field: 'mar',
            type: 'valueColumn',
            columnGroupShow: 'open',
            editable: this.canEdit,
            cellClass: ['data']
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
            field: 'apr',
            type: 'valueColumn',
            columnGroupShow: 'open',
            editable: this.canEdit,
            cellClass: ['data']
          },
          {
            headerName: 'May',
            field: 'may',
            type: 'valueColumn',
            columnGroupShow: 'open',
            editable: this.canEdit,
            cellClass: ['data']
          },
          {
            headerName: 'Jun',
            field: 'jun',
            type: 'valueColumn',
            columnGroupShow: 'open',
            editable: this.canEdit,
            cellClass: ['data']
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
            field: 'jul',
            type: 'valueColumn',
            columnGroupShow: 'open',
            editable: this.canEdit,
            cellClass: ['data']
          },
          {
            headerName: 'Aug',
            field: 'aug',
            type: 'valueColumn',
            columnGroupShow: 'open',
            editable: this.canEdit,
            cellClass: ['data']
          },
          {
            headerName: 'Sep',
            field: 'sep',
            type: 'valueColumn',
            columnGroupShow: 'open',
            editable: this.canEdit,
            cellClass: ['data']
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
            field: 'oct',
            type: 'valueColumn',
            columnGroupShow: 'open',
            editable: this.canEdit,
            cellClass: ['data']
          },
          {
            headerName: 'Nov',
            field: 'nov',
            type: 'valueColumn',
            columnGroupShow: 'open',
            editable: this.canEdit,
            cellClass: ['data']
          },
          {
            headerName: 'Dec',
            field: 'decm',
            type: 'valueColumn',
            columnGroupShow: 'open',
            editable: this.canEdit,
            cellClass: ['data']
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
        headerName: 'Unobligated',
        field: 'un',
        width: 130,
        cellStyle: { color: 'black', 'background-color': '#f7adad' },
        aggFunc: TotalUnObligationsAggFunc,
        valueGetter: TotalUnObligationValueGetter,
        valueFormatter: this.currencyFormatter,
        type: 'numericColumn',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        cellClass: ['data', 'v']
      },
      {
        headerName: 'Percentage',
        field: 'fu',
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
      TotalUnObligationsAggFunc: TotalUnObligationsAggFunc,
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
    this.getRow(this.user.pid);
    this.lastUpdated(this.user.pid);
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

function TotalAdjustedValueGetter(params) {
  if (!params.node.group) {
    return createValueObject(params.data.budget, params.data.adjustment);
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
      params.data.jan,
      params.data.feb,
      params.data.mar
    );
  }
}

function TotalQ2ValueGetter(params) {
  if (!params.node.group) {
    return createQuarterTotalValueObject(
      params.data.apr,
      params.data.may,
      params.data.jun
    );
  }
}

function TotalQ3ValueGetter(params) {
  if (!params.node.group) {
    return createQuarterTotalValueObject(
      params.data.jul,
      params.data.aug,
      params.data.sep
    );
  }
}
function TotalQ4ValueGetter(params) {
  if (!params.node.group) {
    return createQuarterTotalValueObject(
      params.data.oct,
      params.data.nov,
      params.data.decm
    );
  }
}

function TotalObligationValueGetter(params) {
  if (!params.node.group) {
    return createTotalObligationsValueObject(
      params.data.jan,
      params.data.feb,
      params.data.mar,
      params.data.apr,
      params.data.may,
      params.data.jun,
      params.data.jul,
      params.data.aug,
      params.data.sep,
      params.data.oct,
      params.data.nov,
      params.data.decm
    );
  }
}

function TotalUnObligationValueGetter(params) {
  if (!params.node.group) {
    var totalObligation =
      params.data.jan +
      params.data.feb +
      params.data.mar +
      params.data.apr +
      params.data.may +
      params.data.jun +
      params.data.jul +
      params.data.aug +
      params.data.sep +
      params.data.oct +
      params.data.nov +
      params.data.decm;
    var totalBudget = params.data.budget + params.data.adjustment;
    return createTotalUnObligationsValueObject(totalObligation, totalBudget);
  }
}

function createTotalUnObligationsValueObject(a, b) {
  return {
    a: a,
    b: b,
    toString: function() {
      return b - a;
    }
  };
}

function TotalUnObligationsAggFunc(values) {
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
      params.data.jan +
      params.data.feb +
      params.data.mar +
      params.data.apr +
      params.data.may +
      params.data.jun +
      params.data.jul +
      params.data.aug +
      params.data.sep +
      params.data.oct +
      params.data.nov +
      params.data.decm;
    var totalBudget = params.data.budget + params.data.adjustment;
    return createTotalPercentageValueObject(totalObligation, totalBudget);
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
