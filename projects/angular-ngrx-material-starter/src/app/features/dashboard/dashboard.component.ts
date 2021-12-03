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
import * as moment from 'moment';

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
  dpsAllocation3 = [];
  dpsObligation3 = [];
  dpsDisbursement3 = [];

  dpsPhysical = [];
  dpsTop5Physical = [];

  //Secondary
  dpsObligationPercentage = [];
  dpsDisbursementPercentage = [];
  dpsObligationPercentage2 = [];
  dpsDisbursementPercentage2 = [];
  dpsObligationPercentage3 = [];
  dpsDisbursementPercentage3 = [];

  // Physical Accomplishment capped at 100%

  dpsPhysicalMY = [];
  dpsPhysicalYE = [];

  dpsPhysicalMY2 = [];
  dpsPhysicalYE2 = [];

  dpsPhysicalMY3 = [];
  dpsPhysicalYE3 = [];

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
      console.log(data);
      this.cd.markForCheck();
    });
  }

  resultProg: any;
  resultOU: any;
  resulSpecial: any;

  capped = [];
  getSummary() {
    this.pmisService.getTblMFO().subscribe((data: any) => {
      console.log(data);
      var groupBy = data.reduce(function(r, a) {
        r[a.program_id] = r[a.program_id] || [];
        r[a.program_id].push(a);
        return r;
      }, Object.create(null));

      console.log(groupBy);

      // CAPPED at 100%
      for (let i in groupBy) {
        var total_mid_target = 0;
        var total_ye_target = 0;
        var total_mid_capped = 0;
        var total_ye_capped = 0;
        var label;
        var type;
        for (let x in groupBy[i]) {
          var sumTarget =
            groupBy[i][x].jant +
            groupBy[i][x].febt +
            groupBy[i][x].mart +
            groupBy[i][x].aprt +
            groupBy[i][x].mayt +
            groupBy[i][x].junt;
          var sumAccomp =
            groupBy[i][x].jana +
            groupBy[i][x].feba +
            groupBy[i][x].mara +
            groupBy[i][x].apra +
            groupBy[i][x].maya +
            groupBy[i][x].juna;
          var sumTarget2 =
            sumTarget +
            groupBy[i][x].jult +
            groupBy[i][x].augt +
            groupBy[i][x].sept +
            groupBy[i][x].octt +
            groupBy[i][x].novt +
            groupBy[i][x].dect;
          var sumAccomp2 =
            sumAccomp +
            groupBy[i][x].jula +
            groupBy[i][x].auga +
            groupBy[i][x].sepa +
            groupBy[i][x].octa +
            groupBy[i][x].nova +
            groupBy[i][x].deca;
          total_mid_target += sumTarget;
          total_ye_target += sumTarget2;
          if (sumTarget < sumAccomp) {
            total_mid_capped += sumTarget;
          } else {
            total_mid_capped += sumAccomp;
          }
          if (sumTarget2 < sumAccomp2) {
            total_ye_capped += sumTarget2;
          } else {
            total_ye_capped += sumAccomp2;
          }
          label = groupBy[i][x].first_name;
          type = groupBy[i][x].type;
        }

        this.capped.push({
          label: label,
          type: type,
          pt_mid: total_mid_target,
          pt: total_ye_target,
          pa_mid: total_mid_capped,
          pa: total_ye_capped
        });
      }

      console.log(this.capped);

      ///// PHYSICAL

      this.capped[0].pt_mid = this.capped[0].pt_mid + this.capped[19].pt_mid; // RICE & FPMA
      this.capped[0].pa_mid = this.capped[0].pa_mid + this.capped[19].pa_mid; // RICE & FPMA
      this.capped[0].pt = this.capped[0].pt + this.capped[19].pt; // RICE & FPMA
      this.capped[0].pa = this.capped[0].pa + this.capped[19].pa; // RICE & FPMA

      this.capped[1].pt_mid = this.capped[1].pt_mid + this.capped[17].pt_mid; // CORN & FPMA
      this.capped[1].pa_mid = this.capped[1].pa_mid + this.capped[17].pa_mid; // CORN & FPMA
      this.capped[1].pt = this.capped[1].pt + this.capped[17].pt; // CORN & FPMA
      this.capped[1].pa = this.capped[1].pa + this.capped[17].pa; // CORN & FPMA

      this.capped[2].pt_mid = this.capped[2].pt_mid + this.capped[16].pt_mid; // HVCDP & FPMA
      this.capped[2].pa_mid = this.capped[2].pa_mid + this.capped[16].pa_mid; // HVCDP & FPMA
      this.capped[2].pt = this.capped[2].pt + this.capped[16].pt; // HVCDP & FPMA
      this.capped[2].pa = this.capped[2].pa + this.capped[16].pa; // HVCDP & FPMA

      this.capped[3].pt_mid = this.capped[3].pt_mid + this.capped[18].pt_mid; // Livestock & FPMA
      this.capped[3].pa_mid = this.capped[3].pa_mid + this.capped[18].pa_mid; // Livestock & FPMA
      this.capped[3].pt = this.capped[3].pt + this.capped[18].pt; // Livestock & FPMA
      this.capped[3].pa = this.capped[3].pa + this.capped[18].pa; // Livestock & FPMA

      this.capped[11].pt_mid = this.capped[11].pt_mid + this.capped[22].pt_mid; // PMED & ICTU
      this.capped[11].pa_mid = this.capped[11].pa_mid + this.capped[22].pa_mid; // PMED & ICTU
      this.capped[11].pt = this.capped[11].pt + this.capped[22].pt; // PMED & ICTU
      this.capped[11].pa = this.capped[11].pa + this.capped[22].pa; // PMED & ICTU

      this.capped[12].pt_mid = this.capped[12].pt_mid + this.capped[15].pt_mid; // RAED
      this.capped[12].pa_mid = this.capped[12].pa_mid + this.capped[15].pa_mid; // RAED
      this.capped[12].pt = this.capped[12].pt + this.capped[15].pt; // RAED
      this.capped[12].pa = this.capped[12].pa + this.capped[15].pa; // RAED

      this.capped[9].pt_mid =
        this.capped[9].pt_mid +
        this.capped[5].pt_mid +
        this.capped[6].pt_mid +
        this.capped[7].pt_mid; // Research & Stations
      this.capped[9].pa_mid =
        this.capped[9].pa_mid +
        this.capped[5].pa_mid +
        this.capped[6].pa_mid +
        this.capped[7].pa_mid; // Research & Stations
      this.capped[9].pt =
        this.capped[9].pt +
        this.capped[5].pt +
        this.capped[6].pt +
        this.capped[7].pt; // Research & Stations
      this.capped[9].pa =
        this.capped[9].pa +
        this.capped[5].pa +
        this.capped[6].pa +
        this.capped[7].pa; // Research & Stations

      console.log(ous_physical);
      var ous_physical = this.capped
        .filter(obj => {
          return obj.type == 2;
        })
        .sort((a, b) => b.pa_mid / b.pt_mid - a.pa_mid / a.pt_mid);

      var banner_physical = this.capped
        .filter(obj => {
          return obj.type == 1;
        })
        .sort((a, b) => b.pa_mid / b.pt_mid - a.pa_mid / a.pt_mid);

      var special_physical = this.capped
        .filter(obj => {
          return obj.type == 3;
        })
        .sort((a, b) => b.pa_mid / b.pt_mid - a.pa_mid / a.pt_mid);

      console.log(banner_physical);
      for (var i = 0; i < ous_physical.length; i++) {
        this.dpsPhysicalMY2.push({
          y: (ous_physical[i].pa_mid / ous_physical[i].pt_mid) * 100,
          label: ous_physical[i].label
        });
        this.dpsPhysicalYE2.push({
          y: (ous_physical[i].pa / ous_physical[i].pt) * 100,
          label: ous_physical[i].label
        });
      }

      for (var i = 0; i < banner_physical.length; i++) {
        this.dpsPhysicalMY.push({
          y: (banner_physical[i].pa_mid / banner_physical[i].pt_mid) * 100,
          label: banner_physical[i].label
        });
        this.dpsPhysicalYE.push({
          y: (banner_physical[i].pa / banner_physical[i].pt) * 100,
          label: banner_physical[i].label
        });
      }

      for (var i = 0; i < special_physical.length; i++) {
        this.dpsPhysicalMY3.push({
          y: (special_physical[i].pa_mid / special_physical[i].pt_mid) * 100,
          label: special_physical[i].label
        });
        this.dpsPhysicalYE3.push({
          y: (special_physical[i].pa / special_physical[i].pt) * 100,
          label: special_physical[i].label
        });
      }
    });

    this.pmisService.summary_all().subscribe(data => {
      this.summary = data;
      this.rowData = data;
      console.log(this.summary);

      var total_allocation = this.summary
        .map(x => x.ft)
        .reduce((acc, x) => x + acc);
      var total_obligation = this.summary
        .map(x => x.fa)
        .reduce((acc, x) => x + acc);
      this.ob_yearend = (total_obligation / total_allocation) * 100;

      var total_mid_allocation = this.summary
        .map(x => x.ft_mid)
        .reduce((acc, x) => x + acc);
      var total_mid_obligation = this.summary
        .map(x => x.fa_mid)
        .reduce((acc, x) => x + acc);
      this.ob_midyear = (total_mid_obligation / total_mid_allocation) * 100;

      var total_disburse_plan = this.summary
        .map(x => x.dt)
        .reduce((acc, x) => x + acc);
      var total_disburse_actual = this.summary
        .map(x => x.da)
        .reduce((acc, x) => x + acc);
      this.dis_yearend = (total_disburse_actual / total_disburse_plan) * 100;

      var total_disburse_midplan = this.summary
        .map(x => x.dt_mid)
        .reduce((acc, x) => x + acc);
      var total_disburse_midactual = this.summary
        .map(x => x.da_mid)
        .reduce((acc, x) => x + acc);
      this.dis_midyear =
        (total_disburse_midactual / total_disburse_midplan) * 100;

      var total_physical_plan = this.summary
        .map(x => x.pt)
        .reduce((acc, x) => x + acc);
      var total_physical_actual = this.summary
        .map(x => x.pa)
        .reduce((acc, x) => x + acc);
      this.phy_yearend = (total_physical_actual / total_physical_plan) * 100;

      var total_physical_midplan = this.summary
        .map(x => x.pt_mid)
        .reduce((acc, x) => x + acc);
      var total_physical_midactual = this.summary
        .map(x => x.pa_mid)
        .reduce((acc, x) => x + acc);
      this.phy_midyear =
        (total_physical_midactual / total_physical_midplan) * 100;

      this.summary[0].ft = this.summary[0].ft + this.summary[8].ft; // Rice & FPMA
      this.summary[1].ft = this.summary[1].ft + this.summary[12].ft; // HVCDP & FPMA
      this.summary[2].ft = this.summary[2].ft + this.summary[11].ft; // Corn & FPMA
      this.summary[4].ft = this.summary[4].ft + this.summary[16].ft; // Livestock & FPMA

      this.summary[0].fa = this.summary[0].fa + this.summary[8].fa; // Rice & FPMA
      this.summary[1].fa = this.summary[1].fa + this.summary[12].fa; // HVCDP & FPMA
      this.summary[2].fa = this.summary[2].fa + this.summary[11].fa; // Corn & FPMA
      this.summary[4].fa = this.summary[4].fa + this.summary[16].fa; // Livestock & FPMA

      this.summary[0].da = this.summary[0].da + this.summary[8].da; // Rice & FPMA
      this.summary[1].da = this.summary[1].da + this.summary[12].da; // HVCDP & FPMA
      this.summary[2].da = this.summary[2].da + this.summary[11].da; // Corn & FPMA
      this.summary[4].da = this.summary[4].da + this.summary[16].da; // Livestock & FPMA

      this.summary[23].ft =
        this.summary[26].ft +
        this.summary[23].ft +
        this.summary[24].ft +
        this.summary[25].ft; // Research & Stations
      this.summary[23].fa =
        this.summary[26].fa +
        this.summary[23].fa +
        this.summary[24].fa +
        this.summary[25].fa; // Research & Stations
      this.summary[23].da =
        this.summary[26].da +
        this.summary[23].da +
        this.summary[24].da +
        this.summary[25].da; // Research & Stations

      this.summary[15].ft = this.summary[15].ft + this.summary[17].ft; // RAED
      this.summary[15].fa = this.summary[15].fa + this.summary[17].fa; // RAED
      this.summary[15].da = this.summary[15].da + this.summary[17].da; // RAED

      this.summary[20].ft = this.summary[20].ft + this.summary[18].ft; // PMED & ICTU
      this.summary[20].fa = this.summary[20].fa + this.summary[18].fa; // PMED & ICTU
      this.summary[20].da = this.summary[20].da + this.summary[18].da; // PMED & ICTU

      this.resultProg = this.summary
        .filter(obj => {
          return obj.program_id < 6;
        })
        .sort((a, b) => b.fa / b.ft - a.fa / a.ft);

      this.resultOU = this.summary
        .filter(obj => {
          return obj.type == 2;
        })
        .sort((a, b) => b.fa / b.ft - a.fa / a.ft);

      this.resulSpecial = this.summary
        .filter(obj => {
          return obj.type == 3;
        })
        .sort((a, b) => b.fa / b.ft - a.fa / a.ft);

      for (var i = 0; i < 5; i++) {
        this.dpsAllocation.push({
          y: this.resultProg[i].ft,
          label: this.resultProg[i].name
        });
        this.dpsObligation.push({
          y: this.resultProg[i].fa,
          label: this.resultProg[i].name
        });
        this.dpsDisbursement.push({
          y: this.resultProg[i].da,
          label: this.resultProg[i].name
        });
        this.dpsObligationPercentage.push({
          y: (this.resultProg[i].fa / this.resultProg[i].ft) * 100,
          label: this.resultProg[i].name
        });
        this.dpsDisbursementPercentage.push({
          y: (this.resultProg[i].da / this.resultProg[i].ft) * 100,
          label: this.resultProg[i].name
        });

        // this.dpsPhysicalMY.push({y: (this.resultProg[i].pa_mid / this.resultProg[i].pt_mid ) *100 , label: this.resultProg[i].name});
        // this.dpsPhysicalYE.push({y: (this.resultProg[i].pa / this.resultProg[i].pt ) *100 , label: this.resultProg[i].name});
      }

      for (var i = 0; i < this.resultOU.length; i++) {
        this.dpsAllocation2.push({
          y: this.resultOU[i].ft,
          label: this.resultOU[i].name
        });
        this.dpsObligation2.push({
          y: this.resultOU[i].fa,
          label: this.resultOU[i].name
        });
        this.dpsDisbursement2.push({
          y: this.resultOU[i].da,
          label: this.resultOU[i].name
        });
        this.dpsObligationPercentage2.push({
          y: (this.resultOU[i].fa / this.resultOU[i].ft) * 100,
          label: this.resultOU[i].name
        });
        this.dpsDisbursementPercentage2.push({
          y: (this.resultOU[i].da / this.resultOU[i].ft) * 100,
          label: this.resultOU[i].name
        });

        // this.dpsPhysicalMY2.push({y: (this.resultOU[i].pa_mid / this.resultOU[i].pt_mid ) *100 , label: this.resultOU[i].name});
        // this.dpsPhysicalYE2.push({y: (this.resultOU[i].pa / this.resultOU[i].pt ) *100 , label: this.resultOU[i].name});
      }

      for (var i = 0; i < this.resulSpecial.length; i++) {
        this.dpsAllocation3.push({
          y: this.resulSpecial[i].ft,
          label: this.resulSpecial[i].name
        });
        this.dpsObligation3.push({
          y: this.resulSpecial[i].fa,
          label: this.resulSpecial[i].name
        });
        this.dpsDisbursement3.push({
          y: this.resulSpecial[i].da,
          label: this.resulSpecial[i].name
        });
        this.dpsObligationPercentage3.push({
          y: (this.resulSpecial[i].fa / this.resulSpecial[i].ft) * 100,
          label: this.resulSpecial[i].name
        });
        this.dpsDisbursementPercentage3.push({
          y: (this.resulSpecial[i].da / this.resulSpecial[i].ft) * 100,
          label: this.resulSpecial[i].name
        });

        // this.dpsPhysicalMY3.push({y: (this.resulSpecial[i].pa_mid / this.resulSpecial[i].pt_mid ) *100 , label: this.resulSpecial[i].name});
        // this.dpsPhysicalYE3.push({y: (this.resulSpecial[i].pa / this.resulSpecial[i].pt ) *100 , label: this.resulSpecial[i].name});
      }

      for (var i = 0; i < this.summary.length; i++) {
        this.dpsPhysical.push({
          y: (this.summary[i].pa / this.summary[i].pt) * 100,
          label: this.summary[i].name
        });
      }
      this.dpsPhysical.sort((a, b) => parseFloat(b.y) - parseFloat(a.y));

      for (var i = 0; i < 5; i++) {
        if (this.dpsPhysical[i].y > 100) {
          this.dpsPhysical[i].y = 100;
        }
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
    return (
      number.toLocaleString('en-us', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }) + ' %'
    );
  }

  columnDefs2: any;
  constructor(public pmisService: PmisService, private cd: ChangeDetectorRef) {
    this.columnDefs = [
      { headerName: 'Banner/Ous', field: 'name', pinned: 'left', width: 120 },
      {
        headerName: 'Physical',
        children: [
          {
            headerName: 'MidYear',
            type: 'numericColumn',
            valueFormatter: this.currencyFormatter,
            width: 120,
            valueGetter: function(params) {
              let s = params.data;
              if (s) {
                return (
                  ((s.jana + s.feba + s.mara + s.apra + +s.maya + s.juna) /
                    (s.jant + s.febt + s.mart + s.aprt + +s.mayt + s.junt)) *
                  100
                );
              }
            }
          },
          {
            headerName: 'YearEnd',
            type: 'numericColumn',
            valueFormatter: this.currencyFormatter,
            width: 120,
            valueGetter: function(params) {
              let s = params.data;
              if (s) {
                return (s.pa / s.pt) * 100;
              }
            }
          }
        ]
      },
      {
        headerName: 'Obligation',
        children: [
          {
            headerName: 'MidYear',
            type: 'numericColumn',
            valueFormatter: this.currencyFormatter,
            width: 120,
            valueGetter: function(params) {
              let s = params.data;
              if (s) {
                return (
                  ((s.janfa +
                    s.febfa +
                    s.marfa +
                    s.aprfa +
                    +s.mayfa +
                    s.junfa) /
                    (s.janft +
                      s.febft +
                      s.marft +
                      s.aprft +
                      +s.mayft +
                      s.junft)) *
                  100
                );
              }
            }
          },
          {
            headerName: 'YearEnd',
            type: 'numericColumn',
            valueFormatter: this.currencyFormatter,
            width: 120,
            valueGetter: function(params) {
              let s = params.data;
              if (s) {
                return (s.fa / s.ft) * 100;
              }
            }
          }
        ]
      },
      {
        headerName: 'Disbursement',
        children: [
          {
            headerName: 'MidYear',
            type: 'numericColumn',
            valueFormatter: this.currencyFormatter,
            width: 120,
            valueGetter: function(params) {
              let s = params.data;
              if (s) {
                return (
                  ((s.janda +
                    s.febda +
                    s.marda +
                    s.aprda +
                    +s.mayda +
                    s.junda) /
                    (s.jandt +
                      s.febdt +
                      s.mardt +
                      s.aprdt +
                      +s.maydt +
                      s.jundt)) *
                  100
                );
              }
            }
          },
          {
            headerName: 'YearEnd',
            type: 'numericColumn',
            valueFormatter: this.currencyFormatter,
            width: 120,
            valueGetter: function(params) {
              let s = params.data;
              if (s) {
                return (s.da / s.dt) * 100;
              }
            }
          }
        ]
      },
      { headerName: 'Graph', cellRenderer: 'graphCellRenderer' }
    ];

    this.defaultColDef = { sortable: true, resizable: true, filter: true };
    this.frameworkComponents = {
      graphCellRenderer: graphCellRenderer
    };

    this.columnDefs2 = [
      {
        headerName: 'Banner/Ous',
        field: 'username',
        pinned: 'left',
        width: 100
      },
      {
        headerName: 'Obligation',
        width: 100,
        field: 'bed1.date_updated',
        cellRenderer: data => {
          return moment(data.data.bed1.date_updated).fromNow();
        },
        cellStyle: params => {
          if (params.value === null) {
            //mark police cells as red
            return { color: 'red', backgroundColor: 'white' };
          }
          return null;
        }
      },
      {
        headerName: 'Physical',
        width: 100,
        field: 'bed2.date_updated',
        cellRenderer: data => {
          return moment(data.data.bed2.date_updated).fromNow();
        },
        cellStyle: params => {
          if (params.value === null) {
            //mark police cells as red
            return { color: 'red', backgroundColor: 'white' };
          }
          return null;
        }
      },
      {
        headerName: 'Disbursement',
        width: 100,
        field: 'bed3.date_updated',
        cellRenderer: data => {
          return moment(data.data.bed3.date_updated).fromNow();
        },
        cellStyle: params => {
          if (params.value === null) {
            //mark police cells as red
            return { color: 'red', backgroundColor: 'white' };
          }
          return null;
        }
      }
    ];
  }

  graph() {
    alert('hello');
  }

  ngOnInit() {
    this.getSummary();
    this.getLocked();
    this.getLogsReport();
    var chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      axisY: {
        title: 'Pesos',
        includeZero: true,
        valueFormatString: '#,###,,.##M'
      },
      axisY2: {
        title: 'Percentage',
        titleFontColor: '#4F81BC',
        lineColor: '#4F81BC',
        labelFontColor: '#4F81BC',
        tickColor: '#4F81BC',
        includeZero: true
      },
      legend: {
        cursor: 'pointer'
        //  itemclick : toggleDataSeries
      },
      axisX: {
        interval: 1,
        labelFontSize: 15
      },
      toolTip: {
        shared: true
        // content: toolTipFormatter
      },
      data: [
        {
          type: 'column',
          showInLegend: true,
          name: 'Allocation',
          color: 'gold',
          dataPoints: this.dpsAllocation
        },
        {
          type: 'column',
          showInLegend: true,
          name: 'Obligation',
          color: 'silver',
          dataPoints: this.dpsObligation
        },
        {
          type: 'column',
          showInLegend: true,
          name: 'Disbursement',
          color: '#A57164',
          dataPoints: this.dpsDisbursement
        },
        {
          type: 'line',
          name: 'Obligation %',
          axisYType: 'secondary',
          showInLegend: true,
          dataPoints: this.dpsObligationPercentage
        },
        {
          type: 'line',
          name: 'Disbursement %',
          axisYType: 'secondary',
          showInLegend: true,
          dataPoints: this.dpsDisbursementPercentage
        }
      ]
    });
    setTimeout(function() {
      chart.render();
    }, 1000);

    var chart2 = new CanvasJS.Chart('chartContainer2', {
      animationEnabled: true,
      axisY: {
        title: 'Pesos',
        includeZero: true,
        valueFormatString: '#,###,,.##M'
      },
      legend: {
        cursor: 'pointer'
        //  itemclick : toggleDataSeries
      },
      axisX: {
        interval: 1,
        labelFontSize: 15
      },
      axisY2: {
        title: 'Percentage',
        titleFontColor: '#4F81BC',
        lineColor: '#4F81BC',
        labelFontColor: '#4F81BC',
        tickColor: '#4F81BC',
        includeZero: true
      },
      toolTip: {
        shared: true
        // content: toolTipFormatter
      },
      data: [
        {
          type: 'column',
          showInLegend: true,
          name: 'Allocation',
          color: 'gold',
          dataPoints: this.dpsAllocation2
        },
        {
          type: 'column',
          showInLegend: true,
          name: 'Obligation',
          color: 'silver',
          dataPoints: this.dpsObligation2
        },
        {
          type: 'column',
          showInLegend: true,
          name: 'Disbursement',
          color: '#A57164',
          dataPoints: this.dpsDisbursement2
        },
        {
          type: 'line',
          name: 'Obligation %',
          axisYType: 'secondary',
          showInLegend: true,
          dataPoints: this.dpsObligationPercentage2
        },
        {
          type: 'line',
          name: 'Disbursement %',
          axisYType: 'secondary',
          showInLegend: true,
          dataPoints: this.dpsDisbursementPercentage2
        }
      ]
    });
    setTimeout(function() {
      chart2.render();
    }, 1000);

    var chart3 = new CanvasJS.Chart('chartContainer3', {
      animationEnabled: true,
      axisY: {
        title: 'Pesos',
        includeZero: true,
        valueFormatString: '#,###,,.##M'
      },
      legend: {
        cursor: 'pointer'
      },
      axisX: {
        interval: 1,
        labelFontSize: 15
      },
      axisY2: {
        title: 'Percentage',
        titleFontColor: '#4F81BC',
        lineColor: '#4F81BC',
        labelFontColor: '#4F81BC',
        tickColor: '#4F81BC',
        includeZero: true
      },
      toolTip: {
        shared: true
      },
      data: [
        {
          type: 'column',
          showInLegend: true,
          name: 'Allocation',
          color: 'gold',
          dataPoints: this.dpsAllocation3
        },
        {
          type: 'column',
          showInLegend: true,
          name: 'Obligation',
          color: 'silver',
          dataPoints: this.dpsObligation3
        },
        {
          type: 'column',
          showInLegend: true,
          name: 'Disbursement',
          color: '#A57164',
          dataPoints: this.dpsDisbursement3
        },
        {
          type: 'line',
          name: 'Obligation %',
          axisYType: 'secondary',
          showInLegend: true,
          dataPoints: this.dpsObligationPercentage3
        },
        {
          type: 'line',
          name: 'Disbursement %',
          axisYType: 'secondary',
          showInLegend: true,
          dataPoints: this.dpsDisbursementPercentage3
        }
      ]
    });
    setTimeout(function() {
      chart3.render();
    }, 1000);

    var chart4 = new CanvasJS.Chart('chartContainer4', {
      animationEnabled: true,
      axisY: {
        title: 'Percentage',
        includeZero: true
      },
      legend: {
        cursor: 'pointer'
      },
      axisX: {
        interval: 1,
        labelFontSize: 15
      },
      toolTip: {
        shared: true
      },
      data: [
        {
          type: 'column',
          showInLegend: true,
          name: 'MidYear %',
          dataPoints: this.dpsPhysicalMY
        },
        {
          type: 'column',
          showInLegend: true,
          name: 'YearEnd %',
          dataPoints: this.dpsPhysicalYE
        }
      ]
    });
    setTimeout(function() {
      chart4.render();
    }, 1000);

    var chart5 = new CanvasJS.Chart('chartContainer5', {
      animationEnabled: true,
      axisY: {
        title: 'Percentage',
        includeZero: true
      },
      legend: {
        cursor: 'pointer'
      },
      axisX: {
        interval: 1,
        labelFontSize: 15
      },
      toolTip: {
        shared: true
      },
      data: [
        {
          type: 'column',
          showInLegend: true,
          name: 'MidYear %',
          dataPoints: this.dpsPhysicalMY2
        },
        {
          type: 'column',
          showInLegend: true,
          name: 'YearEnd %',
          dataPoints: this.dpsPhysicalYE2
        }
      ]
    });
    setTimeout(function() {
      chart5.render();
    }, 1000);

    var chart6 = new CanvasJS.Chart('chartContainer6', {
      animationEnabled: true,
      axisY: {
        title: 'Percentage',
        includeZero: true
      },
      legend: {
        cursor: 'pointer'
      },
      axisX: {
        interval: 1,
        labelFontSize: 15
      },
      toolTip: {
        shared: true
      },
      data: [
        {
          type: 'column',
          showInLegend: true,
          name: 'MidYear %',
          dataPoints: this.dpsPhysicalMY3
        },
        {
          type: 'column',
          showInLegend: true,
          name: 'YearEnd %',
          dataPoints: this.dpsPhysicalYE3
        }
      ]
    });
    setTimeout(function() {
      chart6.render();
    }, 1000);
  }
}
