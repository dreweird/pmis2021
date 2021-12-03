import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import {
  LocalStorageService,
  ROUTE_ANIMATIONS_ELEMENTS
} from '../../../core/core.module';
import { PmisService } from '../../../core/services/pmis.service';
import { Module } from '@ag-grid-community/all-modules';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import * as CanvasJS from '../../../../assets/canvasjs.min';

@Component({
  selector: 'anms-beds',
  templateUrl: './beds.component.html',
  styleUrls: ['./beds.component.scss']
})
export class BedsComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  modules: Module[] = AllModules;

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

  constructor(
    public pmisService: PmisService,
    private cd: ChangeDetectorRef,
    private localStorageService: LocalStorageService
  ) {
    this.user = this.localStorageService.getItem('AUTH');
    this.canEdit = this.user.pid == 102;
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
      { headerName: 'mfo_id', field: 'mfo_id', hide: true },
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
        headerName: 'Areas Covered',
        field: 'areas',
        cellEditor: 'agLargeTextCellEditor',
        editable: this.canEdit,
        width: 100,
        cellClass: ['data']
      },
      {
        headerName: 'Physical',
        marryChildren: true,
        children: [
          {
            headerName: 'Target',
            field: 'pt',
            width: 100,
            cellClass: ['data'],
            editable: this.canEdit,
            type: 'valueColumn'
          },
          {
            headerName: 'Accomplishment',
            field: 'pa',
            width: 100,
            cellClass: ['data'],
            editable: this.canEdit,
            type: 'valueColumn'
          },
          {
            headerName: 'Percentage',
            width: 100,
            cellClass: ['data'],
            cellStyle: params => {
              if (params.node.group) {
                return {
                  'text-align': 'right',
                  color: 'black',
                  'background-color': '#dfa9f5',
                  'font-weight': 'bold'
                };
              } else {
                return {
                  'text-align': 'right',
                  color: 'black',
                  'background-color': '#dfa9f5'
                };
              }
            },
            aggFunc: TotalPercentageAggFunc,
            valueGetter: TotalPhysicalPercentageValueGetter,
            valueFormatter: this.currencyFormatter,
            type: 'numericColumn'
          }
        ]
      },
      {
        headerName: 'Financial',
        marryChildren: true,
        children: [
          {
            headerName: 'Allocation',
            field: 'ft',
            editable: this.canEdit,
            width: 100,
            cellClass: ['data'],
            type: 'valueColumn'
          },
          {
            headerName: 'Obligation',
            field: 'fa',
            editable: this.canEdit,
            width: 100,
            cellClass: ['data'],
            type: 'valueColumn'
          },
          {
            headerName: 'Percentage',
            width: 100,
            cellClass: ['data'],
            cellStyle: params => {
              if (params.node.group) {
                return {
                  'text-align': 'right',
                  color: 'black',
                  'background-color': '#81f7a6',
                  'font-weight': 'bold'
                };
              } else {
                return {
                  'text-align': 'right',
                  color: 'black',
                  'background-color': '#81f7a6'
                };
              }
            },
            aggFunc: TotalPercentageAggFunc,
            valueGetter: TotalFinancialPercentageValueGetter,
            valueFormatter: this.currencyFormatter,
            type: 'numericColumn'
          },
          {
            headerName: 'Disbursement',
            field: 'da',
            width: 100,
            editable: this.canEdit,
            cellClass: ['data'],
            type: 'valueColumn'
          },
          {
            headerName: 'Percentage',
            width: 100,
            cellClass: ['data'],
            cellStyle: params => {
              if (params.node.group) {
                return {
                  'text-align': 'right',
                  color: 'black',
                  'background-color': '#fae091',
                  'font-weight': 'bold'
                };
              } else {
                return {
                  'text-align': 'right',
                  color: 'black',
                  'background-color': '#fae091'
                };
              }
            },
            aggFunc: TotalPercentageAggFunc,
            valueGetter: TotalDisbursePercentageValueGetter,
            valueFormatter: this.currencyFormatter,
            type: 'numericColumn'
          }
        ]
      },
      {
        headerName: 'Remarks',
        marryChildren: true,
        children: [
          {
            headerName: 'Dec 2020',
            cellEditor: 'agLargeTextCellEditor',
            editable: this.canEdit,
            cellEditorParams: { maxLength: '3000', cols: '50', rows: 6 },
            field: 'decm',
            width: 100,
            cellClass: ['data']
          },
          {
            headerName: 'Jan',
            cellEditor: 'agLargeTextCellEditor',
            editable: this.canEdit,
            cellEditorParams: { maxLength: '3000', cols: '50', rows: 6 },
            field: 'jan',
            width: 100,
            cellClass: ['data']
          },
          {
            headerName: 'Feb',
            cellEditor: 'agLargeTextCellEditor',
            editable: this.canEdit,
            cellEditorParams: { maxLength: '3000', cols: '50', rows: 6 },
            field: 'feb',
            width: 100,
            cellClass: ['data']
          },
          {
            headerName: 'Mar',
            cellEditor: 'agLargeTextCellEditor',
            editable: this.canEdit,
            cellEditorParams: { maxLength: '3000', cols: '50', rows: 6 },
            field: 'mar',
            width: 100,
            cellClass: ['data']
          },
          {
            headerName: 'Apr',
            cellEditor: 'agLargeTextCellEditor',
            editable: this.canEdit,
            cellEditorParams: { maxLength: '3000', cols: '50', rows: 6 },
            field: 'apr',
            width: 100,
            cellClass: ['data']
          },
          {
            headerName: 'May',
            cellEditor: 'agLargeTextCellEditor',
            editable: this.canEdit,
            cellEditorParams: { maxLength: '3000', cols: '50', rows: 6 },
            field: 'may',
            width: 100,
            cellClass: ['data']
          },
          {
            headerName: 'Jun',
            cellEditor: 'agLargeTextCellEditor',
            editable: this.canEdit,
            cellEditorParams: { maxLength: '3000', cols: '50', rows: 6 },
            field: 'jun',
            width: 100,
            cellClass: ['data']
          },
          {
            headerName: 'Jul',
            cellEditor: 'agLargeTextCellEditor',
            editable: this.canEdit,
            cellEditorParams: { maxLength: '3000', cols: '50', rows: 6 },
            field: 'jul',
            width: 100,
            cellClass: ['data']
          },
          {
            headerName: 'Aug',
            cellEditor: 'agLargeTextCellEditor',
            editable: this.canEdit,
            cellEditorParams: { maxLength: '3000', cols: '50', rows: 6 },
            field: 'aug',
            width: 100,
            cellClass: ['data']
          },
          {
            headerName: 'Sep',
            cellEditor: 'agLargeTextCellEditor',
            editable: this.canEdit,
            cellEditorParams: { maxLength: '3000', cols: '50', rows: 6 },
            field: 'sep',
            width: 100,
            cellClass: ['data']
          },
          {
            headerName: 'Oct',
            cellEditor: 'agLargeTextCellEditor',
            editable: this.canEdit,
            cellEditorParams: { maxLength: '3000', cols: '50', rows: 6 },
            field: 'oct',
            width: 100,
            cellClass: ['data']
          },
          {
            headerName: 'Nov',
            cellEditor: 'agLargeTextCellEditor',
            editable: this.canEdit,
            cellEditorParams: { maxLength: '3000', cols: '50', rows: 6 },
            field: 'nov',
            width: 100,
            cellClass: ['data']
          },
          {
            headerName: 'Dec',
            cellEditor: 'agLargeTextCellEditor',
            editable: this.canEdit,
            cellEditorParams: { maxLength: '3000', cols: '50', rows: 6 },
            field: 'dece',
            width: 100,
            cellClass: ['data']
          }
        ]
      }
    ];

    this.defaultColDef = { sortable: true, resizable: true, filter: true };
    this.context = { componentParent: this };
    this.components = {
      simpleCellRenderer: getSimpleCellRenderer()
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

    this.columnTypes = {
      valueColumn: {
        width: 250,
        aggFunc: 'sum',
        valueParser: 'Number(newValue)',
        cellStyle: params => {
          if (params.node.group) {
            return { 'text-align': 'right', 'font-weight': 'bold' };
          } else {
            return { 'text-align': 'right' };
          }
        },
        valueFormatter: this.currencyFormatter
      }
    };

    // this.excelStyles = custom.excelStyles;
  }

  ob_rate: any;
  dis_rate: any;
  phys_rate: any;

  sumft1: any;
  sumfa1: any;
  sumda1: any;
  sumpt1: any;
  sumpa1: any;

  sumft2: any;
  sumfa2: any;
  sumda2: any;
  sumpt2: any;
  sumpa2: any;

  sumft3: any;
  sumfa3: any;
  sumda3: any;
  sumpt3: any;
  sumpa3: any;

  getRow(pid) {
    this.pmisService.getBayanihanSummary(pid).subscribe((data: any) => {
      this.rowData = data;
      console.log(data);

      let sumft: number = data
        .map(a => a.ft)
        .reduce(function(a, b) {
          return a + b;
        });
      let sumfa: number = data
        .map(a => a.fa)
        .reduce(function(a, b) {
          return a + b;
        });
      let sumda: number = data
        .map(a => a.da)
        .reduce(function(a, b) {
          return a + b;
        });

      let sumpa: number = data
        .map(a => a.pa)
        .reduce(function(a, b) {
          return a + b;
        });

      let sumpt: number = data
        .map(a => a.pt)
        .reduce(function(a, b) {
          return a + b;
        });

      this.ob_rate = (sumfa / sumft) * 100;
      this.dis_rate = (sumda / sumft) * 100;
      this.phys_rate = (sumpa / sumpt) * 100;
      this.cd.markForCheck();
      //console.log(this.ob_rate, this.dis_rate, this.phys_rate);

      let group = data.reduce(
        (h, obj) =>
          Object.assign(h, {
            [obj.header_program]: (h[obj.header_program] || []).concat(obj)
          }),
        {}
      );

      this.sumft1 = group['A.Productivity Enhancement Project']
        .map(a => a.ft)
        .reduce(function(a, b) {
          return a + b;
        });
      this.sumfa1 = group['A.Productivity Enhancement Project']
        .map(a => a.fa)
        .reduce(function(a, b) {
          return a + b;
        });
      this.sumda1 = group['A.Productivity Enhancement Project']
        .map(a => a.da)
        .reduce(function(a, b) {
          return a + b;
        });
      this.sumpt1 = group['A.Productivity Enhancement Project']
        .map(a => a.pt)
        .reduce(function(a, b) {
          return a + b;
        });
      this.sumpa1 = group['A.Productivity Enhancement Project']
        .map(a => a.pa)
        .reduce(function(a, b) {
          return a + b;
        });

      this.sumft2 = group['B. Income Enhancement Projects']
        .map(a => a.ft)
        .reduce(function(a, b) {
          return a + b;
        });
      this.sumfa2 = group['B. Income Enhancement Projects']
        .map(a => a.fa)
        .reduce(function(a, b) {
          return a + b;
        });
      this.sumda2 = group['B. Income Enhancement Projects']
        .map(a => a.da)
        .reduce(function(a, b) {
          return a + b;
        });
      this.sumpt2 = group['B. Income Enhancement Projects']
        .map(a => a.pt)
        .reduce(function(a, b) {
          return a + b;
        });
      this.sumpa2 = group['B. Income Enhancement Projects']
        .map(a => a.pa)
        .reduce(function(a, b) {
          return a + b;
        });

      this.sumft3 = group['C. Social protection and Amelioration Project']
        .map(a => a.ft)
        .reduce(function(a, b) {
          return a + b;
        });
      this.sumfa3 = group['C. Social protection and Amelioration Project']
        .map(a => a.fa)
        .reduce(function(a, b) {
          return a + b;
        });
      this.sumda3 = group['C. Social protection and Amelioration Project']
        .map(a => a.da)
        .reduce(function(a, b) {
          return a + b;
        });
      this.sumpt3 = group['C. Social protection and Amelioration Project']
        .map(a => a.pt)
        .reduce(function(a, b) {
          return a + b;
        });
      this.sumpa3 = group['C. Social protection and Amelioration Project']
        .map(a => a.pa)
        .reduce(function(a, b) {
          return a + b;
        });

      this.chart();
    });
  }

  export() {}

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
    if (
      isNaN(+event.newValue) &&
      event.colDef.cellEditor != 'agLargeTextCellEditor'
    ) {
      alert('Invalid entry...input numbers only');
      event.newValue = null;
    } else {
      this.pmisService
        .upBayanihan(event.colDef.field, event.newValue, event.data.mfo_id)
        .subscribe(data => {
          console.log(data);
          if (!data) {
            alert('something wrong happen!');
          }
        });
    }
  }

  ngOnInit(): void {
    this.getRow(102);
  }

  chart() {
    console.log(this.sumft1, this.sumft2, this.sumft3);
    var chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      axisY: {
        title: 'Pesos',
        includeZero: true
      },
      legend: {
        cursor: 'pointer'
      },
      toolTip: {
        shared: true
      },
      axisY2: {
        title: 'Percentage',
        titleFontColor: '#4F81BC',
        lineColor: '#4F81BC',
        labelFontColor: '#4F81BC',
        tickColor: '#4F81BC'
      },
      data: [
        {
          type: 'column',
          showInLegend: true,
          name: 'Allocation',
          color: 'gold',
          dataPoints: [
            { y: this.sumft1, label: 'PEP' },
            { y: this.sumft2, label: 'IEP' },
            { y: this.sumft3, label: 'SP & SAP' }
          ]
        },
        {
          type: 'column',
          showInLegend: true,
          name: 'Obligation',
          color: 'silver',
          dataPoints: [
            { y: this.sumfa1, label: 'PEP' },
            { y: this.sumfa2, label: 'IEP' },
            { y: this.sumfa3, label: 'SP & SAP' }
          ]
        },
        {
          type: 'column',
          showInLegend: true,
          name: 'Disbursement',
          color: '#A57164',
          dataPoints: [
            { y: this.sumda1, label: 'PEP' },
            { y: this.sumda2, label: 'IEP' },
            { y: this.sumda3, label: 'SP & SAP' }
          ]
        },
        {
          type: 'line',
          showInLegend: true,
          name: 'Obligation Rate',
          axisYType: 'secondary',
          color: 'blue',
          dataPoints: [
            { y: (this.sumfa1 / this.sumft1) * 100, label: 'PEP' },
            { y: (this.sumfa2 / this.sumft2) * 100, label: 'IEP' },
            { y: (this.sumfa3 / this.sumft3) * 100, label: 'SP & SAP' }
          ]
        },
        {
          type: 'line',
          showInLegend: true,
          name: 'Disbursement Rate',
          axisYType: 'secondary',
          color: 'green',
          dataPoints: [
            { y: (this.sumda1 / this.sumft1) * 100, label: 'PEP' },
            { y: (this.sumda2 / this.sumft2) * 100, label: 'IEP' },
            { y: (this.sumda3 / this.sumft3) * 100, label: 'SP & SAP' }
          ]
        }
      ]
    });
    chart.render();

    var chart2 = new CanvasJS.Chart('chartContainer2', {
      animationEnabled: true,
      axisY: {
        title: 'Targets',
        includeZero: true
      },
      legend: {
        cursor: 'pointer'
      },
      toolTip: {
        shared: true
      },
      axisY2: {
        title: 'Percentage',
        titleFontColor: '#4F81BC',
        lineColor: '#4F81BC',
        labelFontColor: '#4F81BC',
        tickColor: '#4F81BC'
      },
      data: [
        {
          type: 'column',
          showInLegend: true,
          name: 'Targets',
          color: 'gold',
          dataPoints: [
            { y: this.sumpt1, label: 'PEP' },
            { y: this.sumpt2, label: 'IEP' },
            { y: this.sumpt3, label: 'SP & SAP' }
          ]
        },
        {
          type: 'column',
          showInLegend: true,
          name: 'Accomplishment',
          color: 'silver',
          dataPoints: [
            { y: this.sumpa1, label: 'PEP' },
            { y: this.sumpa2, label: 'IEP' },
            { y: this.sumpa3, label: 'SP & SAP' }
          ]
        },
        {
          type: 'line',
          showInLegend: true,
          name: 'Physical Rate',
          axisYType: 'secondary',
          color: 'blue',
          dataPoints: [
            { y: (this.sumpa1 / this.sumpt1) * 100, label: 'PEP' },
            { y: (this.sumpa2 / this.sumpt2) * 100, label: 'IEP' },
            { y: (this.sumpa3 / this.sumpt3) * 100, label: 'SP & SAP' }
          ]
        }
      ]
    });
    chart2.render();
    this.cd.markForCheck();
  }
}

function getSimpleCellRenderer() {
  function SimpleCellRenderer() {}
  SimpleCellRenderer.prototype.init = function(params) {
    const tempDiv = document.createElement('div');
    if (params.node.group) {
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

function TotalPhysicalPercentageValueGetter(params) {
  if (!params.node.group) {
    return createTotalPercentageValueObject(params.data.pa, params.data.pt);
  }
}

function TotalFinancialPercentageValueGetter(params) {
  if (!params.node.group) {
    return createTotalPercentageValueObject(params.data.fa, params.data.ft);
  }
}

function TotalDisbursePercentageValueGetter(params) {
  if (!params.node.group) {
    return createTotalPercentageValueObject(params.data.da, params.data.fa);
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
