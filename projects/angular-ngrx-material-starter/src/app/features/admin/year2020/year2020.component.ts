import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';
import { AddYearComponent } from '../add-year/add-year.component';
import { PmisService } from '../../../core/services/pmis.service';
import { MatDialog } from '@angular/material/dialog';

import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { Module } from '@ag-grid-community/all-modules';
import { ActionDeleteComponent } from '../action-delete/action-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { arraysAreNotAllowedMsg } from '@ngrx/store/src/models';

@Component({
  selector: 'anms-year2020',
  templateUrl: './year2020.component.html',
  styleUrls: ['./year2020.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Year2020Component implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  public modules: Module[] = [ClientSideRowModelModule, RowGroupingModule];

  gridApi;
  gridColumnApi;
  columnDefs;
  defaultColDef;
  rowData;
  frameworkComponents;
  context;
  components;
  autoGroupColumnDef;
  aggFuncs;

  constructor(
    public apmisService: PmisService,
    private cd: ChangeDetectorRef,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.columnDefs = [
      {
        headerName: 'Id',
        field: 'price_id',
        hide: true
      },
      {
        headerName: 'Category',
        field: 'category',
        pinned: 'left',
        cellStyle: {
          color: 'green',
          'font-weight': 'bold',
          'font-size': '16px'
        },
        valueGetter: function(params) {
          if (params.node.group && params.node.level == 0)
            return params.node.allLeafChildren[0].data.category;
        }
      },
      {
        headerName: 'Name',
        field: 'name',
        rowGroup: true,
        hide: true
      },
      {
        headerName: 'Area',
        field: 'area',
        minWidth: 200,
        rowGroup: true,
        hide: true
      },
      {
        headerName: 'Month',
        field: 'month',
        rowGroup: true,
        hide: true
      },
      {
        headerName: 'Retail Price',
        children: [
          {
            headerName: 'Prevailing Price',
            field: 'price1',
            editable: true,
            cellEditor: 'numericCellEditor',
            aggFunc: 'mode',
            valueFormatter: averageFormatter
          },
          {
            headerName: 'Low',
            field: 'low1',
            editable: true,
            cellEditor: 'numericCellEditor',
            aggFunc: 'mode',
            valueFormatter: averageFormatter
          },
          {
            headerName: 'High',
            field: 'high1',
            editable: true,
            cellEditor: 'numericCellEditor',
            aggFunc: 'mode',
            valueFormatter: averageFormatter
          }
        ]
      },
      {
        headerName: 'WholeSale Price',
        children: [
          {
            headerName: 'Prevailing Price',
            field: 'price2',
            editable: true,
            cellEditor: 'numericCellEditor',
            aggFunc: 'avg',
            valueFormatter: averageFormatter
          },
          {
            headerName: 'Low',
            field: 'low2',
            editable: true,
            cellEditor: 'numericCellEditor',
            aggFunc: 'avg',
            valueFormatter: averageFormatter
          },
          {
            headerName: 'High',
            field: 'high2',
            editable: true,
            cellEditor: 'numericCellEditor',
            aggFunc: 'avg',
            valueFormatter: averageFormatter
          }
        ]
      },
      {
        headerName: 'Farm Gate Price',
        children: [
          {
            headerName: 'Prevailing Price',
            field: 'price3',
            editable: true,
            cellEditor: 'numericCellEditor',
            aggFunc: 'avg',
            valueFormatter: averageFormatter
          },
          {
            headerName: 'Low',
            field: 'low3',
            editable: true,
            cellEditor: 'numericCellEditor',
            aggFunc: 'avg',
            valueFormatter: averageFormatter
          },
          {
            headerName: 'High',
            field: 'high3',
            editable: true,
            cellEditor: 'numericCellEditor',
            aggFunc: 'avg',
            valueFormatter: averageFormatter
          }
        ]
      },
      {
        headerName: 'Actions',
        width: 150,
        cellRendererFramework: ActionDeleteComponent
      }
    ];
    this.defaultColDef = {
      sortable: true,
      resizable: true,
      flex: 1,
      minWidth: 100,
      filter: true
    };
    this.aggFuncs = {
      mode: mode2
    };
    this.frameworkComponents = {
      actionComponent: ActionDeleteComponent
    };
    this.context = { componentParent: this };
    this.components = {
      simpleCellRenderer: getSimpleCellRenderer(),
      numericCellEditor: NumericCellEditor
    };
    this.autoGroupColumnDef = {
      headerName: 'Name',
      minWidth: 350,
      pinned: 'left',
      field: 'date',
      colId: 'date',
      editable: true,
      cellRendererParams: {
        suppressCount: true,
        innerRenderer: 'simpleCellRenderer'
      }
    };
  }

  ngOnInit(): void {
    this.getRow2020();
  }

  result: any;

  getRow2020() {
    this.apmisService.getRow2020().subscribe((data: any) => {
      console.log(data);
      this.rowData = data;
      this.result = Array.from(new Set(data.map(s => s.id))).map(id => {
        return { id: id, name: data.find(s => s.id === id).name };
      });
      console.log(this.result);
      this.cd.markForCheck();
    });
  }

  getRowNodeId(data) {
    return data.price_id;
  }

  onCellValueChanged(params) {
    this.apmisService
      .updatePrice(params.data.price_id, params.column.colId, params.value)
      .subscribe(data => {
        console.log(data);
      });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  openDialog() {
    this.dialog.open(AddYearComponent, {
      minWidth: '50vh',
      data: { gridApi: this.gridApi, commodity: this.result }
    });
  }

  methodFromParentDelete(cell) {
    let result = confirm(
      'Are you sure you want to delete this row? This action is irreversible.'
    );
    if (result) {
      this.apmisService.removePriceRow(cell.price_id).subscribe(res => {
        if (res) {
          this._snackBar.open('Row removed', 'Ok', { duration: 2000 });
          this.gridApi.applyTransaction({ remove: [cell] });
        } else {
          alert('SOmething went wrong!!');
        }
      });
    }
  }
}

function nameCellRenderer(params) {
  if (params.value === undefined || params.value === null) {
    return '';
  } else {
    console.log(params);
    var flag =
      '<img border="0" width="15" height="10" src="https://www.ag-grid.com/images/goldStar.png">';
    return (
      flag +
      ' <span style="font-size: 16px;font-weight: bold"> ' +
      params.value +
      '</span>'
    );
  }
}

function getSimpleCellRenderer() {
  function SimpleCellRenderer() {}
  SimpleCellRenderer.prototype.init = function(params) {
    const tempDiv = document.createElement('div');
    if (params.node.group && params.node.level == 0) {
      tempDiv.innerHTML =
        '<img width="30px" height="30px" style=" border-radius: 50%;" src= http://172.16.128.163:3900/images/' +
        params.node.allLeafChildren[0].data.imageSrc +
        '><span style="font-size: 16px;font-weight: bold; padding-left: 5px">' +
        params.value +
        '</span>';
    } else if (params.node.group && params.node.level == 1) {
      tempDiv.innerHTML =
        '<img width="20px" height="20px" src="./assets/bullet.png"><span style="font-size: 16px;font-weight: bold">' +
        params.value +
        '</span>';
    } else if (params.node.group && params.node.level == 2) {
      tempDiv.innerHTML =
        '<span style="font-size: 14px;font-weight: bold; color: blue">' +
        params.value +
        '</span>';
    } else {
      // console.log(params);
      tempDiv.innerHTML = '<span> Day ' + params.value + '</span>';
    }
    this.eGui = tempDiv;
  };
  SimpleCellRenderer.prototype.getGui = function() {
    return this.eGui;
  };
  return SimpleCellRenderer;
}
function getCharCodeFromEvent(event) {
  event = event || window.event;
  return typeof event.which == 'undefined' ? event.keyCode : event.which;
}
function isCharNumeric(charStr) {
  return !!/\d/.test(charStr);
}

function isCharDecimal(charStr) {
  return '.'.indexOf(charStr) === 0;
}

function isKeyPressedNumeric(event) {
  var charCode = getCharCodeFromEvent(event);
  var charStr = String.fromCharCode(charCode);
  return isCharNumeric(charStr) || isCharDecimal(charStr);
}

// function to act as a class
function NumericCellEditor() {}

// gets called once before the renderer is used
NumericCellEditor.prototype.init = function(params) {
  // create the cell
  this.eInput = document.createElement('input');

  if (isCharNumeric(params.charPress)) {
    this.eInput.value = params.charPress;
  } else {
    if (params.value !== undefined && params.value !== null) {
      this.eInput.value = params.value;
    }
  }

  var that = this;
  this.eInput.addEventListener('keypress', function(event) {
    if (!isKeyPressedNumeric(event)) {
      that.eInput.focus();
      if (event.preventDefault) event.preventDefault();
    } else if (that.isKeyPressedNavigation(event)) {
      event.stopPropagation();
    }
  });

  // only start edit if key pressed is a number, not a letter
  var charPressIsNotANumber =
    params.charPress && '1234567890'.indexOf(params.charPress) < 0;
  this.cancelBeforeStart = charPressIsNotANumber;
};

NumericCellEditor.prototype.isKeyPressedNavigation = function(event) {
  return event.keyCode === 39 || event.keyCode === 37;
};

// gets called once when grid ready to insert the element
NumericCellEditor.prototype.getGui = function() {
  return this.eInput;
};

// focus and select can be done after the gui is attached
NumericCellEditor.prototype.afterGuiAttached = function() {
  this.eInput.focus();
};

// returns the new value after editing
NumericCellEditor.prototype.isCancelBeforeStart = function() {
  return this.cancelBeforeStart;
};

// example - will reject the number if it contains the value 007
// - not very practical, but demonstrates the method.
NumericCellEditor.prototype.isCancelAfterEnd = function() {
  var value = this.getValue();
  return value.indexOf('007') >= 0;
};

// returns the new value after editing
NumericCellEditor.prototype.getValue = function() {
  return this.eInput.value;
};

// any cleanup we need to be done here
NumericCellEditor.prototype.destroy = function() {
  // but this example is simple, no cleanup, we could  even leave this method out as it's optional
};

// if true, then this editor will appear in a popup
NumericCellEditor.prototype.isPopup = function() {
  // and we could leave this method out also, false is the default
  return false;
};

function averageFormatter(params) {
  return Math.round(params.value * 100) / 100;
}

function modeFunction(params) {
  return params.reduce(
    function(current, num) {
      const freq =
        num in current.numMap
          ? ++current.numMap[num]
          : (current.numMap[num] = 1);
      if (freq > current.modeFreq && freq > 1) {
        current.modeFreq = freq;
        current.mode = num;
      }
      return current;
    },
    { mode: null, modeFreq: 0, numMap: {} }
  ).mode;
}

const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

function mode2(arr) {
  if (modeFunction(arr) == null) {
    console.log(arr, median(arr));
    return median(arr);
  } else {
    return modeFunction(arr);
  }
}
