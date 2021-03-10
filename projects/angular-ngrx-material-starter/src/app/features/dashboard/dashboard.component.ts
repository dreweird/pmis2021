import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { PmisService } from '../../core/services/pmis.service';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../core/core.module';
import { Module } from '@ag-grid-community/all-modules';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { graphCellRenderer } from './graphCellRenderer';

@Component({
  selector: 'anms-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  da_fin: any;
  da_phys: any;
  da_dis: any;
  locked: any;
  logs: any;
  summary: any;

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
  excelStyles: any;
  

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  getLocked() {
    this.pmisService.month_locked().subscribe(data => {
      this.locked = data;
      this.cd.markForCheck();
    });
  }

  getLogsReport() {
    this.pmisService.logsReport().subscribe(data => {
      this.logs = data;
      this.cd.markForCheck();
    });
  }

  
  getSummary() {
    this.pmisService.summary_all().subscribe(data => {
      this.summary = data;
      this.rowData = data;
      console.log(this.summary);
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
    }) + ' %';
  }

  constructor(public pmisService: PmisService, private cd: ChangeDetectorRef) {
    this.columnDefs = [
      { headerName: 'Banner/Ous', field: 'name', pinned: 'left' },
      { headerName: 'Physical',
          children: [
            { headerName: 'MidYear',  type: 'numericColumn', valueFormatter: this.currencyFormatter, width: 120,
            valueGetter: function(params) {
              let s = params.data;
              if(s){
                return ((s.jana + s.feba + s.mara + s.apra + + s.maya + s.juna) / (s.jant + s.febt + s.mart + s.aprt + + s.mayt + s.junt)) * 100
              }
            }},
            { headerName: 'YearEnd', type: 'numericColumn', valueFormatter: this.currencyFormatter, width: 120,
            valueGetter: function(params) {
              let s = params.data;
              if(s){
                return (s.pa / s.pt) * 100
              }
            }},
          ] 
      },
      { headerName: 'Obligation',
      children: [
        { headerName: 'MidYear',  type: 'numericColumn', valueFormatter: this.currencyFormatter, width: 120,
        valueGetter: function(params) {
          let s = params.data;
          if(s){
            return ((s.janfa + s.febfa + s.marfa + s.aprfa + + s.mayfa + s.junfa) / (s.janft + s.febft + s.marft + s.aprft + + s.mayft + s.junft)) * 100
          }
        }},
        { headerName: 'YearEnd', type: 'numericColumn', valueFormatter: this.currencyFormatter, width: 120,
        valueGetter: function(params) {
          let s = params.data;
          if(s){
            return (s.fa / s.ft) * 100
          }
        }},
      ] 
      },
      { headerName: 'Disbursement',
      children: [
        { headerName: 'MidYear',  type: 'numericColumn', valueFormatter: this.currencyFormatter, width: 120,
        valueGetter: function(params) {
          let s = params.data;
          if(s){
            return ((s.janda + s.febda + s.marda + s.aprda + + s.mayda + s.junda) / (s.jandt + s.febdt + s.mardt + s.aprdt + + s.maydt + s.jundt)) * 100
          }
        }},
        { headerName: 'YearEnd', type: 'numericColumn', valueFormatter: this.currencyFormatter, width: 120,
        valueGetter: function(params) {
          let s = params.data;
          if(s){
            return (s.da / s.dt) * 100
          }
        }},
      ] 
      },
      { headerName: 'Graph', cellRenderer: 'graphCellRenderer'}
    ];

    this.defaultColDef = { sortable: true, resizable: true, filter: true };
    this.frameworkComponents = {
      graphCellRenderer: graphCellRenderer
    };
  }

  graph(){
    alert('hello')
  }

  ngOnInit() {
    this.getSummary();
    this.getLocked();
    this.getLogsReport();
  }
}



