import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';
import { PmisService } from '../../../core/services/pmis.service';


@Component({
  selector: 'anms-pdz',
  templateUrl: './pdz.component.html',
  styleUrls: ['./pdz.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PdzComponent implements OnInit {

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

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
  excelStyles: any;
  

  getRow() {
    this.apmisService.pdz().subscribe(data => {
      this.rowData = data;
      this.cd.markForCheck();
    });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  export() {

    var ck = ['header_main', 'municipal', 'barangay', 'group','header_subindicator', 'mfo_name', 'target', 'cost'];
    this.gridApi.exportDataAsExcel({
      sheetName: 'PDZ ',
      fileName: 'PDZ ' ,
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
            data: { type: 'String', value: 'DA Interventions for Peace and Development Zone (PSZ) and Communist Terrorist Group (CTG) Threatened and Affected Barangays' }
          }
        ],
        [
          {
            styleId: 'headappend',
            data: { type: 'String', value: 'C.Y. 2021 CURRENT APPROPRIATION' }
          }
        ],
      
      ],
      columnKeys: ck
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
  
  constructor( public apmisService: PmisService,
    private cd: ChangeDetectorRef) {
      this.columnDefs = [
        { headerName: 'Program', field: 'header_main', rowGroup: true, hide: true, cellClass: ['data'] },
        { headerName: 'Province', field: 'province', rowGroup: true, hide: true, cellClass: ['data'] },
        { headerName: 'Municipal', field: 'municipal', rowGroup: true, hide: true, cellClass: ['data'] },
        { headerName: 'Barangay', field: 'barangay', width: 100, cellClass: ['data'] },
        { headerName: 'Beneficiary', field: 'group', cellClass: ['data'] },
        { headerName: 'PAP', field: 'header_subindicator',cellClass: ['data'] },
        { headerName: 'Indicator', field: 'mfo_name',cellClass: ['data'] },
        { headerName: 'Physical Target', field: 'target', width: 100, aggFunc: 'sum',cellClass: ['data'] },
        { headerName: 'Budget Allocation', field: 'cost', width: 200, aggFunc: 'sum',cellClass: ['data'] , valueFormatter: this.currencyFormatter,
        type: 'numericColumn', 
        valueGetter: function(params) {
          let data = params.data;
          if(data){
            return Number(data.target) * Number(data.cost);
           
          }
        }}
      ];
      this.autoGroupColumnDef = {
        headerName: 'Location',
        colId: 'location',
        cellRenderer: 'agGroupCellRenderer',
        pinned: 'left',
        width: 200,
        cellRendererParams: {
          suppressCount: true, // turn off the row count
          innerRenderer: 'simpleCellRenderer'
        }
      };

      this.defaultColDef = { sortable: true, resizable: true, filter: true };
      this.context = { componentParent: this };
      this.components = {
        simpleCellRenderer: getSimpleCellRenderer()
      };
      this.excelStyles = [
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
        { id: 'headappend', font: { size: 11, fontName: 'Calibri', bold: true } }
      ];
  
    }

  

  ngOnInit(): void {
    this.getRow();
  }
}

function getSimpleCellRenderer() {
  function SimpleCellRenderer() {}
  SimpleCellRenderer.prototype.init = function(params) {
    const tempDiv = document.createElement('div');
     if (params.node.group) {
      tempDiv.innerHTML =
        '<span style="font-weight: bold">' + params.value + '</span>';
    } 
    this.eGui = tempDiv.firstChild;
  };
  SimpleCellRenderer.prototype.getGui = function() {
    return this.eGui;
  };
  return SimpleCellRenderer;
}
