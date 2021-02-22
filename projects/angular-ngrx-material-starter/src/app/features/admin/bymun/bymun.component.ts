import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { PmisService } from '../../../core/services/pmis.service';
import {
  FormControl,
  FormGroup,
  Validators,
  FormGroupDirective
} from '@angular/forms';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { Module } from '@ag-grid-community/all-modules';
import { LocalStorageService } from '../../../core/core.module';

@Component({
  selector: 'anms-bymunicipal',
  templateUrl: './bymun.component.html',
  styleUrls: ['./bymun.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BymunComponent implements OnInit {
  prov: any;
  mun: any;
  munfilter: any;
  inputForm: FormGroup;
  provselect: any;
  munselect: any;
  rowData: any;
  autoGroupColumnDef: any;
  components: any;
  defaultColDef = { resizable: true };
  gridApi: any;

  public modules: Module[] = AllModules;

  prog: any[];
  user: any;

  columnDefs = [
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
      headerName: 'header_subindicator',
      field: 'header_subindicator',
      rowGroup: true,
      hide: true
    },
    { headerName: 'mfo_name', field: 'mfo_name', hide: true },
    {
      headerName: 'Unit of Measure',
      field: 'unitmeasure',
      width: 100,
      cellClass: ['data']
    },
    {
      headerName: 'Budget Allocation',
      field: 'cost',
      width: 100,
      valueFormatter: this.currencyFormatter,
      type: 'numericColumn',
      cellClass: ['data'],
      valueGetter: function(params) {
        let data = params.data;
        var total = 0;
        if (data) {
          for (var i = 0, l = data.location.length; i < l; i++) {
            total = total + data.location[i].target;
          }
          return total * Number(data.cost);
        }
      }
    },
    {
      headerName: 'Physical Target',
      children: [
        {
          headerName: ' Target',
          field: 'target',
          width: 100,
          cellClass: ['data'],
          valueGetter: function(params) {
            let data = params.data;
            var total = 0;
            if (typeof data !== 'undefined') {
              for (var i = 0, l = data.location.length; i < l; i++) {
                total = total + data.location[i].target;
              }
              return total;
            }
          }
        },

        {
          headerName: 'Location',
          field: 'location',
          width: 300,
          cellClass: ['data'],
          valueGetter: function(params) {
            let data = params.data;
            let loc = '';
            if (typeof data !== 'undefined') {
              for (var i = 0, l = data.location.length; i < l; i++) {
                var obj = data.location[i];
                loc +=
                  data.location[i].municipal +
                  '  (' +
                  data.location[i].target +
                  ') ';
              }
              return loc;
            }
          }
        }
      ]
    },
    {
      headerName: 'Physical Accomplishment Q1',
      children: [
        {
          headerName: 'Accomplishment',
          width: 100,
          cellClass: ['data'],
          valueGetter: function(params) {
            let data = params.data;
            var total = 0;
            if (typeof data !== 'undefined') {
              for (var i = 0, l = data.q1_accomp.length; i < l; i++) {
                total = total + data.q1_accomp[i].accomp;
              }
              return total;
            }
          }
        },
        {
          headerName: 'Location',
          width: 300,
          cellClass: ['data'],
          valueGetter: function(params) {
            let data = params.data;
            let loc = '';
            if (typeof data !== 'undefined') {
              for (var i = 0, l = data.q1_accomp.length; i < l; i++) {
                loc +=
                  data.q1_accomp[i].municipal +
                  '  (' +
                  data.q1_accomp[i].accomp +
                  ') ';
              }
              return loc;
            }
          }
        }
      ]
    },
    {
      headerName: 'Physical Accomplishment Q2',
      children: [
        {
          headerName: 'Accomplishment',
          width: 100,
          cellClass: ['data'],
          valueGetter: function(params) {
            let data = params.data;
            var total = 0;
            if (typeof data !== 'undefined') {
              for (var i = 0, l = data.q2_accomp.length; i < l; i++) {
                total = total + data.q2_accomp[i].accomp;
              }
              return total;
            }
          }
        },
        {
          headerName: 'Location',
          width: 300,
          cellClass: ['data'],
          valueGetter: function(params) {
            let data = params.data;
            let loc = '';
            if (typeof data !== 'undefined') {
              for (var i = 0, l = data.q2_accomp.length; i < l; i++) {
                loc +=
                  data.q2_accomp[i].municipal +
                  '  (' +
                  data.q2_accomp[i].accomp +
                  ') ';
              }
              return loc;
            }
          }
        }
      ]
    },
    {
      headerName: 'Physical Accomplishment Q3',
      children: [
        {
          headerName: 'Accomplishment',
          width: 100,
          cellClass: ['data'],
          valueGetter: function(params) {
            let data = params.data;
            var total = 0;
            if (typeof data !== 'undefined') {
              for (var i = 0, l = data.q3_accomp.length; i < l; i++) {
                total = total + data.q3_accomp[i].accomp;
              }
              return total;
            }
          }
        },
        {
          headerName: 'Location',
          width: 300,
          cellClass: ['data'],
          valueGetter: function(params) {
            let data = params.data;
            let loc = '';
            if (typeof data !== 'undefined') {
              for (var i = 0, l = data.q3_accomp.length; i < l; i++) {
                loc +=
                  data.q3_accomp[i].municipal +
                  '  (' +
                  data.q3_accomp[i].accomp +
                  ') ';
              }
              return loc;
            }
          }
        }
      ]
    },
    {
      headerName: 'Physical Accomplishment Q4',
      children: [
        {
          headerName: 'Accomplishment',
          width: 100,
          cellClass: ['data'],
          valueGetter: function(params) {
            let data = params.data;
            var total = 0;
            if (typeof data !== 'undefined') {
              for (var i = 0, l = data.q4_accomp.length; i < l; i++) {
                total = total + data.q4_accomp[i].accomp;
              }
              return total;
            }
          }
        },
        {
          headerName: 'Location',
          width: 300,
          cellClass: ['data'],
          valueGetter: function(params) {
            let data = params.data;
            let loc = '';
            if (typeof data !== 'undefined') {
              for (var i = 0, l = data.q4_accomp.length; i < l; i++) {
                loc +=
                  data.q1_accomp[i].municipal +
                  '  (' +
                  data.q4_accomp[i].accomp +
                  ') ';
              }
              return loc;
            }
          }
        }
      ]
    },
    {
      headerName: 'Physical Accomplishment Total',
      children: [
        {
          headerName: 'Accomplishment',
          width: 100,
          cellClass: ['data'],
          valueGetter: function(params) {
            let data = params.data;
            var total = 0;
            if (typeof data !== 'undefined') {
              for (var i = 0, l = data.qtotal_accomp.length; i < l; i++) {
                total = total + data.qtotal_accomp[i].accomp;
              }
              return total;
            }
          }
        },
        {
          headerName: 'Location',
          width: 300,
          cellClass: ['data'],
          valueGetter: function(params) {
            let data = params.data;
            let loc = '';
            if (typeof data !== 'undefined') {
              for (var i = 0, l = data.qtotal_accomp.length; i < l; i++) {
                loc +=
                  data.qtotal_accomp[i].municipal +
                  '  (' +
                  data.qtotal_accomp[i].accomp +
                  ') ';
              }
              return loc;
            }
          }
        }
      ]
    }
  ];
  excelStyles = [
    { id: 'indent1', alignment: { indent: 1 } },
    { id: 'indent2', alignment: { indent: 2 } },
    { id: 'indent3', alignment: { indent: 3 } },
    { id: 'indent4', alignment: { indent: 4 } },
    { id: 'indent5', alignment: { indent: 5 } },
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
    {
      id: 'p1',
      interior: { color: '#BBDAFF', pattern: 'Solid' },
      font: { size: 11, fontName: 'Calibri', bold: true },
      alignment: { horizontal: 'Center' }
    },
    {
      id: 'p2',
      interior: { color: '#86BCFF', pattern: 'Solid' },
      font: { size: 11, fontName: 'Calibri', bold: true },
      alignment: { horizontal: 'Center' }
    },
    {
      id: 'p3',
      interior: { color: '#fddfdf', pattern: 'Solid' },
      font: { size: 11, fontName: 'Calibri', bold: true },
      alignment: { horizontal: 'Center' }
    },
    {
      id: 'p4',
      interior: { color: '#ffb7b2', pattern: 'Solid' },
      font: { size: 11, fontName: 'Calibri', bold: true },
      alignment: { horizontal: 'Center' }
    },
    {
      id: 'p5',
      interior: { color: '#92FEF9', pattern: 'Solid' },
      font: { size: 11, fontName: 'Calibri', bold: true },
      alignment: { horizontal: 'Center' }
    },
    {
      id: 'p6',
      interior: { color: '#01FCEF', pattern: 'Solid' },
      font: { size: 11, fontName: 'Calibri', bold: true },
      alignment: { horizontal: 'Center' }
    },
    { id: 'headappend', font: { size: 11, fontName: 'Calibri', bold: true } }
  ];

  onGridReady(params) {
    this.gridApi = params.api;
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
  constructor(
    private pmisService: PmisService,
    private cd: ChangeDetectorRef,
    private localStorageService: LocalStorageService
  ) {
    this.user = this.localStorageService.getItem('AUTH');
    if (this.user.pid == 100) {
      this.prog = [
        { value: 'RICE', pid: 1 },
        { value: 'CORN', pid: 2 },
        { value: 'HVCDP', pid: 3 },
        { value: 'LIVESTOCK', pid: 4 },
        { value: 'ORGANIC', pid: 5 },
        { value: 'ALL', pid: 0 }
      ];
    } else {
      this.prog = [{ value: this.user.username, pid: this.user.pid }];
    }
    this.pmisService.distinctProv().subscribe(data => {
      this.prov = data;
    });
    this.pmisService.distinctMun().subscribe(data => {
      this.mun = data;
    });
    this.inputForm = new FormGroup({
      prog: new FormControl('', [Validators.required]),
      prov: new FormControl('', [Validators.required]),
      mun: new FormControl('', [Validators.required])
    });
    this.components = { simpleCellRenderer: getSimpleCellRenderer() };
    this.autoGroupColumnDef = {
      headerName: 'Program/Project/Activity',
      cellRenderer: 'agGroupCellRenderer',
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
      },
      pinned: 'left',
      width: 300,
      field: 'mfo_name',
      cellRendererParams: {
        suppressCount: true, // turn off the row count
        innerRenderer: 'simpleCellRenderer'
      }
    };
  }
  export() {
    this.gridApi.exportDataAsExcel({
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
            data: { type: 'String', value: 'Caraga Region' }
          }
        ],
        [
          {
            styleId: 'headappend',
            data: { type: 'String', value: 'Capitol Site, Butuan City' }
          }
        ],
        [],
        [
          {
            styleId: 'headappend',
            data: {
              type: 'String',
              value: this.munselect + ', ' + this.provselect
            }
          }
        ],
        [],
        [
          { data: { type: 'String', value: '' } },
          { data: { type: 'String', value: '' } },
          { data: { type: 'String', value: '' } },
          {
            styleId: 'p1',
            data: { type: 'String', value: 'Physical Target' },
            mergeAcross: 1
          },
          {
            styleId: 'p2',
            data: { type: 'String', value: 'Physical Accomplishment - Q1' },
            mergeAcross: 1
          },
          {
            styleId: 'p3',
            data: { type: 'String', value: 'Physical Accomplishment - Q2' },
            mergeAcross: 1
          },
          {
            styleId: 'p4',
            data: { type: 'String', value: 'Physical Accomplishment - Q3' },
            mergeAcross: 1
          },
          {
            styleId: 'p5',
            data: { type: 'String', value: 'Physical Accomplishment - Q4' },
            mergeAcross: 1
          },
          {
            styleId: 'p6',
            data: { type: 'String', value: 'Physical Accomplishment - Total' },
            mergeAcross: 1
          }
        ]
      ],
      sheetName: 'CY 2021 Interventions based on GAA',
      fileName: this.provselect + ', District ' + this.munselect,
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
  provSelected(e) {
    this.munfilter = this.mun.filter(function(el: any) {
      return el.province === e.value;
    });
  }

  onGenerate(formDirective: FormGroupDirective) {
    this.provselect = this.inputForm.value.prov;
    this.munselect = this.inputForm.value.mun;
    this.pmisService
      .by_mun_generation(this.inputForm.value)
      .subscribe((data: any) => {
        if (data) {
          this.rowData = data;
          this.cd.markForCheck();
        } else {
          this.rowData = data;
          this.cd.markForCheck();
          alert('No results found. Please try another municipal.');
        }
      });
    formDirective.resetForm();
    this.inputForm.reset();
  }

  ngOnInit(): void {}
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
