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
import * as CanvasJS from '../../../assets/canvasjs.min';

@Component({
  selector: 'anms-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

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

  ob_midyear: any;
  ob_yearend: any;
  dis_midyear: any;
  dis_yearend: any;
  phy_midyear: any;
  phy_yearend: any;

 dpsAllocation = [];
 dpsObligation = [];
 dpsDisbursement = [];
 dpsAllocation2 = [];
 dpsObligation2 = [];
 dpsDisbursement2 = [];
 dpsPhysical = [];
 dpsTop5Physical = [];
  

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
      var total_allocation = this.summary.map(x => x.ft).reduce((acc, x) => x + acc);
      var total_obligation = this.summary.map(x => x.fa).reduce((acc, x) => x + acc);
      this.ob_yearend = (total_obligation / total_allocation) * 100;

      var total_mid_allocation = this.summary.map(x => x.ft_mid).reduce((acc, x) => x + acc);
      var total_mid_obligation = this.summary.map(x => x.fa_mid).reduce((acc, x) => x + acc);
      this.ob_midyear = (total_mid_obligation / total_mid_allocation) * 100;

      var total_disburse_plan = this.summary.map(x => x.dt).reduce((acc, x) => x + acc);
      var total_disburse_actual = this.summary.map(x => x.da).reduce((acc, x) => x + acc);
      this.dis_yearend = (total_disburse_actual / total_disburse_plan) * 100;

      var total_disburse_midplan = this.summary.map(x => x.dt_mid).reduce((acc, x) => x + acc);
      var total_disburse_midactual = this.summary.map(x => x.da_mid).reduce((acc, x) => x + acc);
      this.dis_midyear = (total_disburse_midactual / total_disburse_midplan) * 100;

      var total_physical_plan = this.summary.map(x => x.pt).reduce((acc, x) => x + acc);
      var total_physical_actual = this.summary.map(x => x.pa).reduce((acc, x) => x + acc);
      this.phy_yearend = (total_physical_actual / total_physical_plan) * 100;

      var total_physical_midplan = this.summary.map(x => x.pt_mid).reduce((acc, x) => x + acc);
      var total_physical_midactual = this.summary.map(x => x.pa_mid).reduce((acc, x) => x + acc);
      this.phy_midyear = (total_physical_midactual / total_physical_midplan) * 100;

      for(var i = 0; i < 10; i++) {
        this.dpsAllocation.push({y: this.summary[i].ft, label: this.summary[i].name});
        this.dpsObligation.push({y: this.summary[i].fa, label: this.summary[i].name});
        this.dpsDisbursement.push({y: this.summary[i].da, label: this.summary[i].name});
      }

      
      for(var i = 10; i < this.summary.length; i++) {
        this.dpsAllocation2.push({y: this.summary[i].ft, label: this.summary[i].name});
        this.dpsObligation2.push({y: this.summary[i].fa, label: this.summary[i].name});
        this.dpsDisbursement2.push({y: this.summary[i].da, label: this.summary[i].name});
      }

      for(var i = 0; i < this.summary.length; i++) {
        this.dpsPhysical.push({y: (this.summary[i].pa / this.summary[i].pt) * 100, label: this.summary[i].name});
      }
      this.dpsPhysical.sort((a,b) => parseFloat(b.y) - parseFloat(a.y));
  
      for(var i = 0; i < 5; i++) {
        this.dpsTop5Physical.push(this.dpsPhysical[i]);
      }
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
      { headerName: 'Banner/Ous', field: 'name', pinned: 'left', width: 120 },
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
    var chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      axisY: {
        title: "Pesos",
        titleFontSize: 15,
        labelFontSize: 15,
        includeZero: true
      },
      legend: {
        cursor:"pointer",
      //  itemclick : toggleDataSeries
      },
      axisX:{
        interval: 1,
        labelFontSize: 15
      },
      toolTip: {
        shared: true,
       // content: toolTipFormatter
      },
      data: [{
        type: "bar",
        showInLegend: true,
        name: "Allocation",
        color: "gold",
        dataPoints: this.dpsAllocation
      },
      {
        type: "bar",
        showInLegend: true,
        name: "Obligation",
        color: "silver",
        dataPoints: this.dpsObligation
      },
      {
        type: "bar",
        showInLegend: true,
        name: "Disbursement",
        color: "#A57164",
        dataPoints: this.dpsDisbursement
      }]
    });
    setTimeout(function(){  chart.render(); }, 1000);

    var chart2 = new CanvasJS.Chart("chartContainer2", {
      animationEnabled: true,
      axisY: {
        title: "Pesos",
        titleFontSize: 15,
        labelFontSize: 15,
        includeZero: true
      },
      legend: {
        cursor:"pointer",
      //  itemclick : toggleDataSeries
      },
      axisX:{
        interval: 1,
        labelFontSize: 15
      },
      toolTip: {
        shared: true,
       // content: toolTipFormatter
      },
      data: [{
        type: "bar",
        showInLegend: true,
        name: "Allocation",
        color: "gold",
        dataPoints: this.dpsAllocation2
      },
      {
        type: "bar",
        showInLegend: true,
        name: "Obligation",
        color: "silver",
        dataPoints: this.dpsObligation2
      },
      {
        type: "bar",
        showInLegend: true,
        name: "Disbursement",
        color: "#A57164",
        dataPoints: this.dpsDisbursement2
      }]
    });
    setTimeout(function(){  chart2.render(); }, 1000);

 
console.log(this.dpsTop5Physical);
    var chart3 = new CanvasJS.Chart("chartContainer3", {
      animationEnabled: true,
      theme: "light2", // "light1", "light2", "dark1", "dark2"
      axisY: {
        title: "Percentage"
      },
      data: [{        
        type: "column",  
        dataPoints: this.dpsTop5Physical
      }]
    });
    chart3.render();
    setTimeout(function(){  chart3.render(); }, 1000);
  }
}



