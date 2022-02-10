import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { PmisService } from '../../core/services/pmis.service';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../core/core.module';

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
     // console.log(data);
      this.cd.markForCheck();
    });
  }

  resultProg: any;
  resultOU: any;
  resulSpecial: any;

  capped = [];
  getSummary() {
    this.pmisService.getTblMFO().subscribe((data: any) => {
     // console.log(data);
      var groupBy = data.reduce(function(r, a) {
        r[a.program_id] = r[a.program_id] || [];
        r[a.program_id].push(a);
        return r;
      }, Object.create(null));

     // console.log(groupBy);

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

    //  console.log(this.capped);

      ///// PHYSICAL

      for(var key in this.capped) {
        if(this.capped[key].label == 'Rice') {
          const res = this.capped.find(({label}) => label === 'FPMA-RICE')
          this.capped[key].pt_mid = this.capped[key].pt_mid + res.pt_mid; // RICE & FPMA
          this.capped[key].pa_mid = this.capped[key].pa_mid + res.pa_mid; // RICE & FPMA
          this.capped[key].pt = this.capped[key].pt + res.pt; // RICE & FPMA
          this.capped[key].pa = this.capped[key].pa + res.pa; // RICE & FPMA
        }

        if(this.capped[key].label == 'Corn') {
          const res = this.capped.find(({label}) => label === 'FPMA-CORN')
          this.capped[key].pt_mid = this.capped[key].pt_mid + res.pt_mid; 
          this.capped[key].pa_mid = this.capped[key].pa_mid + res.pa_mid; 
          this.capped[key].pt = this.capped[key].pt + res.pt; 
          this.capped[key].pa = this.capped[key].pa + res.pa; 
        }

        if(this.capped[key].label == 'HVCDP') {
          const res = this.capped.find(({label}) => label === 'FPMA-HVCDP')
          this.capped[key].pt_mid = this.capped[key].pt_mid + res.pt_mid; 
          this.capped[key].pa_mid = this.capped[key].pa_mid + res.pa_mid; 
          this.capped[key].pt = this.capped[key].pt + res.pt; 
          this.capped[key].pa = this.capped[key].pa + res.pa; 
        }

        if(this.capped[key].label == 'Livestock') {
          const res = this.capped.find(({label}) => label === 'FPMA-LIVESTOCK')
          this.capped[key].pt_mid = this.capped[key].pt_mid + res.pt_mid; 
          this.capped[key].pa_mid = this.capped[key].pa_mid + res.pa_mid; 
          this.capped[key].pt = this.capped[key].pt + res.pt; 
          this.capped[key].pa = this.capped[key].pa + res.pa; 
        }

        if(this.capped[key].label == 'Organic') {
          const res = this.capped.find(({label}) => label === 'FPMA-OA')
          if(res) {
            this.capped[key].pt_mid = this.capped[key].pt_mid + res.pt_mid; 
            this.capped[key].pa_mid = this.capped[key].pa_mid + res.pa_mid; 
            this.capped[key].pt = this.capped[key].pt + res.pt; 
            this.capped[key].pa = this.capped[key].pa + res.pa; 
          }
      
        }

        if(this.capped[key].label == 'PMED') {
          const res = this.capped.find(({label}) => label === 'ICTS')
          this.capped[key].pt_mid = this.capped[key].pt_mid + res.pt_mid; 
          this.capped[key].pa_mid = this.capped[key].pa_mid + res.pa_mid; 
          this.capped[key].pt = this.capped[key].pt + res.pt; 
          this.capped[key].pa = this.capped[key].pa + res.pa; 
        }

        if(this.capped[key].label == 'RAED') {
          const res = this.capped.find(({label}) => label === 'FMRDP')
          this.capped[key].pt_mid = this.capped[key].pt_mid + res.pt_mid; 
          this.capped[key].pa_mid = this.capped[key].pa_mid + res.pa_mid; 
          this.capped[key].pt = this.capped[key].pt + res.pt; 
          this.capped[key].pa = this.capped[key].pa + res.pa; 
        }

        if(this.capped[key].label == 'RESEARCH') {
          const stn1 = this.capped.find(({label}) => label === 'STN TRENTO')
          const stn2 = this.capped.find(({label}) => label === 'STN DELMONTE')
          const stn3 = this.capped.find(({label}) => label === 'STN TAGBINA')
          if(stn1 && stn2 && stn3) {
            this.capped[key].pt_mid = this.capped[key].pt_mid + stn1.pt_mid + stn2.pt_mid + stn3.pt_mid; 
            this.capped[key].pa_mid = this.capped[key].pa_mid + stn1.pa_mid + stn2.pa_mid +  stn3.pa_mid; 
            this.capped[key].pt = this.capped[key].pt + stn1.pt + stn2.pt + stn3.pt; 
            this.capped[key].pa = this.capped[key].pa + stn1.pa + stn2.pa + stn3.pa;
          }
      
        }


      }

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

        for(var key in this.summary) {

          if(this.summary[key].name == 'Rice') {
            const res = this.summary.find(({name}) => name === 'FPMA-RICE')
            this.summary[key].ft = this.summary[key].ft + res.ft; 
            this.summary[key].fa = this.summary[key].fa + res.fa; 
            this.summary[key].da = this.summary[key].da + res.da; 
          }

          if(this.summary[key].name == 'HVCDP') {
            const res = this.summary.find(({name}) => name === 'FPMA-HVCDP')
            this.summary[key].ft = this.summary[key].ft + res.ft; 
            this.summary[key].fa = this.summary[key].fa + res.fa; 
            this.summary[key].da = this.summary[key].da + res.da; 
          }

          if(this.summary[key].name == 'Corn') {
            const res = this.summary.find(({name}) => name === 'FPMA-CORN')
            this.summary[key].ft = this.summary[key].ft + res.ft; 
            this.summary[key].fa = this.summary[key].fa + res.fa; 
            this.summary[key].da = this.summary[key].da + res.da; 
          }

          if(this.summary[key].name == 'Livestock') {
            const res = this.summary.find(({name}) => name === 'FPMA-LIVESTOCK')
            this.summary[key].ft = this.summary[key].ft + res.ft; 
            this.summary[key].fa = this.summary[key].fa + res.fa; 
            this.summary[key].da = this.summary[key].da + res.da; 
          }

          if(this.summary[key].name == 'RESEARCH') {
            const stn1 = this.summary.find(({name}) => name === 'STN TRENTO')
            const stn2 = this.summary.find(({name}) => name === 'STN DELMONTE')
            const stn3 = this.summary.find(({name}) => name === 'STN TAGBINA')

            if(stn1 && stn2 && stn3) {
              this.summary[key].ft = this.summary[key].ft + stn1.ft + stn2.ft + stn3.ft; 
              this.summary[key].fa = this.summary[key].ft + stn1.fa + stn2.fa + stn3.fa; 
              this.summary[key].da = this.summary[key].ft + stn1.da + stn2.da + stn3.da; 
            }
        
          }

          if(this.summary[key].name == 'RAED') {
            const res = this.summary.find(({name}) => name === 'FMRDP')
            this.summary[key].ft = this.summary[key].ft + res.ft; 
            this.summary[key].fa = this.summary[key].fa + res.fa; 
            this.summary[key].da = this.summary[key].da + res.da; 
          }

          if(this.summary[key].name == 'PMED') {
            const res = this.summary.find(({name}) => name === 'ICTS')
            this.summary[key].ft = this.summary[key].ft + res.ft; 
            this.summary[key].fa = this.summary[key].fa + res.fa; 
            this.summary[key].da = this.summary[key].da + res.da; 
          }


        }

        console.log(this.summary);
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
        console.log(this.resultProg);
      for (var i = 0; i < 5; i++) {
        if(this.resultProg.length > 0){
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
        }
   }

      for (var i = 0; i < this.resultOU.length; i++) {
        if(this.resultOU){
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
        }
     }

      for (var i = 0; i < this.resulSpecial.length; i++) {
        if(this.resulSpecial){
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
        }
     
    }

    if(this.dpsPhysical.length > 0) {

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
    }

   
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
