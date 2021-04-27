import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PmisService } from '../../../core/services/pmis.service';
import { Module } from '@ag-grid-community/all-modules';
import {
  LocalStorageService,
  ROUTE_ANIMATIONS_ELEMENTS
} from '../../../core/core.module';
import { Subscription } from 'rxjs';
import { AllModules } from '@ag-grid-enterprise/all-modules';

@Component({
  selector: 'anms-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AreaComponent implements OnInit {
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
  aggFuncs: any;
  user: any;
  canEdit: any;
  locked: any;
  mfo_id: any;

  public modules: Module[] = AllModules;

  constructor(
    private route: ActivatedRoute,
    private pmisService: PmisService,
    private cd: ChangeDetectorRef,
    private localStorageService: LocalStorageService
  ) {
    this.user = this.localStorageService.getItem('AUTH');
    this.canEdit = this.user.b == 0;
    this.columnDefs = [
      {
        headerName: 'Province',
        field: 'province',
        width: 150,
        pinned: 'left',
        rowGroup: true,
        hide: true
      },
      {
        headerName: 'Location',
        pinned: 'right',
        children: [
          {
            headerName: 'Barangay',
            field: 'barangay',
            width: 100,
            columnGroupShow: 'open'
          },
          { headerName: 'Group', field: 'group', width: 200, pinned: 'right' }
        ]
      },
      {
        headerName: 'Target',
        field: 'target',
        width: 100,
        aggFunc: 'sum',
        enableValue: true,
        cellStyle: { color: 'black', 'background-color': '#fae091' },
        type: 'valueColumn'
      },
      {
        headerName: 'Accomplishment',
        children: [
          {
            headerName: 'Jan',
            field: 'jan',
            type: 'valueColumn',
            width: 70,
            aggFunc: 'sum',
            enableValue: true,
            editable: () => {
              if (this.locked[0].checked && this.canEdit) return true;
              else return false;
            }
          },
          {
            headerName: 'Feb',
            field: 'feb',
            type: 'valueColumn',
            width: 70,
            aggFunc: 'sum',
            enableValue: true,
            editable: () => {
              if (this.locked[1].checked && this.canEdit) return true;
              else return false;
            }
          },
          {
            headerName: 'Mar',
            field: 'mar',
            type: 'valueColumn',
            width: 70,
            aggFunc: 'sum',
            enableValue: true,
            editable: () => {
              if (this.locked[2].checked && this.canEdit) return true;
              else return false;
            }
          },
          {
            headerName: 'Q1',
            width: 70,
            type: 'quarterColumn2',
            valueGetter: TotalQ1ValueGetter,
            aggFunc: TotalQuarterAggFunc
          },
          {
            headerName: 'Apr',
            field: 'apr',
            type: 'valueColumn',
            width: 70,
            aggFunc: 'sum',
            enableValue: true,
            editable: () => {
              if (this.locked[3].checked && this.canEdit) return true;
              else return false;
            }
          },
          {
            headerName: 'May',
            field: 'may',
            type: 'valueColumn',
            width: 70,
            aggFunc: 'sum',
            enableValue: true,
            editable: () => {
              if (this.locked[4].checked && this.canEdit) return true;
              else return false;
            }
          },
          {
            headerName: 'Jun',
            field: 'jun',
            type: 'valueColumn',
            width: 70,
            aggFunc: 'sum',
            enableValue: true,
            editable: () => {
              if (this.locked[5].checked && this.canEdit) return true;
              else return false;
            }
          },
          {
            headerName: 'Q2',
            width: 70,
            type: 'quarterColumn2',
            valueGetter: TotalQ2ValueGetter,
            aggFunc: TotalQuarterAggFunc
          },
          {
            headerName: 'Jul',
            field: 'jul',
            type: 'valueColumn',
            width: 70,
            aggFunc: 'sum',
            enableValue: true,
            editable: () => {
              if (this.locked[6].checked && this.canEdit) return true;
              else return false;
            }
          },
          {
            headerName: 'Aug',
            field: 'aug',
            type: 'valueColumn',
            width: 70,
            aggFunc: 'sum',
            enableValue: true,
            editable: () => {
              if (this.locked[7].checked && this.canEdit) return true;
              else return false;
            }
          },
          {
            headerName: 'Sep',
            field: 'sep',
            type: 'valueColumn',
            width: 70,
            aggFunc: 'sum',
            enableValue: true,
            editable: () => {
              if (this.locked[8].checked && this.canEdit) return true;
              else return false;
            }
          },
          {
            headerName: 'Q3',
            width: 70,
            type: 'quarterColumn2',
            valueGetter: TotalQ3ValueGetter,
            aggFunc: TotalQuarterAggFunc
          },
          {
            headerName: 'Oct',
            field: 'oct',
            type: 'valueColumn',
            width: 70,
            aggFunc: 'sum',
            enableValue: true,
            editable: () => {
              if (this.locked[9].checked && this.canEdit) return true;
              else return false;
            }
          },
          {
            headerName: 'Nov',
            field: 'nov',
            type: 'valueColumn',
            width: 70,
            aggFunc: 'sum',
            enableValue: true,
            editable: () => {
              if (this.locked[10].checked && this.canEdit) return true;
              else return false;
            }
          },
          {
            headerName: 'Dec',
            field: 'dece',
            type: 'valueColumn',
            width: 70,
            aggFunc: 'sum',
            enableValue: true,
            editable: () => {
              if (this.locked[11].checked && this.canEdit) return true;
              else return false;
            }
          },
          {
            headerName: 'Q4',
            width: 70,
            type: 'quarterColumn2',
            valueGetter: TotalQ4ValueGetter,
            aggFunc: TotalQuarterAggFunc
          },
          {
            headerName: 'Total',
            field: 'total',
            type: 'numericColumn',
            width: 100,
            cellStyle: { 'background-color': 'yellow' },
            valueGetter: TotalValueGetter,
            aggFunc: TotalAggFunc
          }
        ]
      },
      {
        headerName: 'Remarks',
        children: [
          {
            headerName: 'Q1',
            field: 'q1',
            type: 'remarksColumn',
            width: 70,
            editable: this.canEdit,
            cellEditor: 'agLargeTextCellEditor',
            cellEditorParams: { maxLength: '3000', cols: '50', rows: 6},
          },
          {
            headerName: 'Q2',
            field: 'q2',
            type: 'remarksColumn',
            width: 70,
            editable: this.canEdit,
            cellEditor: 'agLargeTextCellEditor',
            cellEditorParams: { maxLength: '3000', cols: '50', rows: 6},
          },
          {
            headerName: 'Q3',
            field: 'q3',
            type: 'remarksColumn',
            width: 70,
            editable: this.canEdit,
            cellEditor: 'agLargeTextCellEditor',
            cellEditorParams: { maxLength: '3000', cols: '50', rows: 6},
          },
          {
            headerName: 'Q4',
            field: 'q4',
            type: 'remarksColumn',
            width: 70,
            editable: this.canEdit,
            cellEditor: 'agLargeTextCellEditor',
            cellEditorParams: { maxLength: '3000', cols: '50', rows: 6},
          }
        ]
      }
    ];
    this.defaultColDef = { sortable: true, resizable: true, filter: true };
    this.autoGroupColumnDef = {
      headerName: 'AREA',
      cellRenderer: 'agGroupCellRenderer',
      pinned: 'left',
      field: 'municipal',
      width: 250
    };
    this.aggFuncs = {
      TotalQuarterAggFunc: TotalQuarterAggFunc,
      TotalAggFunc: TotalAggFunc
    };
    this.columnTypes = {
      valueColumn: {
        width: 110,
        aggFunc: 'sum',
        valueParser: 'Number(newValue)',
        cellStyle: { 'text-align': 'right' },
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
      remarksColumn: { width: 100 }
    };
  }

  getLocked() {
    this.pmisService.month_locked().subscribe(data => {
      this.locked = data;
      this.cd.markForCheck();
    });
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
    if (
      isNaN(+event.newValue) &&
      event.colDef.cellEditor != 'agLargeTextCellEditor'
    ) {
      event.node.setDataValue(event.colDef.field, event.oldValue);
      alert('Invalid entry...please input numbers only');
    } else {
      this.pmisService
        .updateDistrict(event.colDef.field, event.newValue, event.data.id)
        .subscribe(data => {
          if (!data) {
            alert('something wrong happen!');
          }
        });
      let entries = {
        pid: this.user.pid,
        uid: this.user.user_id,
        mfo_id: event.data.mfo_id,
        beds: 2,
        month: event.colDef.field + '-By District ' + event.data.municipal,
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

  syncPhysical() {
    this.pmisService.syncPhysicalDistrict(this.mfo_id).subscribe(data => {
      if (data) {
        alert(this.rowData[0].mfo_name + ' was sync successfully!');
      }
    });
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.mfo_id = params['mfo_id'];
      this.getAreabyMfoID(this.mfo_id);
      this.getLocked();
    });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  getAreabyMfoID(mfo_id) {
    this.pmisService.getAreabyMfoID(mfo_id).subscribe(data => {
      this.rowData = data;
      this.cd.markForCheck();
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
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
      params.data.dece
    );
  }
}

function TotalValueGetter(params) {
  if (!params.node.group) {
    return createTotal(
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
      params.data.dece
    );
  }
}

function createTotal(a, b, c, d, e, f, g, h, i, j, k, l) {
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

function TotalAggFunc(values) {
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
  return createTotal(a, b, c, d, e, f, g, h, i, j, k, l);
}
