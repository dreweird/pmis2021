import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input, OnChanges } from '@angular/core';
import { LocalStorageService, ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';
import * as CanvasJS from '../../../../assets/canvasjs.min';
import { PmisService } from '../../../core/services/pmis.service';

@Component({
  selector: 'anms-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphComponent implements OnInit, OnChanges {

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  @Input() pid: number = 0;
  @Input() name: string = '';
  
  user: any;
  data: any;
  pp_midyear: any;
  op_midyear: any;
  dp_midyear: any;
  pp_yearend: any;
  op_yearend: any;
  dp_yearend: any;

  
  ngOnChanges(changes: any) {
    this.pid = changes.pid.currentValue;
    this.name = changes.name.currentValue;
    this.getChart(this.pid);
  
  }
  getChart(pid){
    console
    this.pmisService.getChart(pid).subscribe((data: any) => {
      console.log(data);
    
      this.pp_midyear = (data.pa_mid / data.pt_mid);
      this.op_midyear = (data.fa_mid / data.ft_mid);
      this.dp_midyear = (data.da_mid / data.dt_mid);
      this.pp_yearend = (data.pa / data.pt);
      this.op_yearend = (data.fa / data.ft);
      this.dp_yearend = (data.da / data.dt);
      this.data = data;
      this.chartPhysicalMidyear();
      this.cd.markForCheck();
    });
  }

  constructor(private cd: ChangeDetectorRef, public pmisService: PmisService, private localStorageService: LocalStorageService) { }

  chartPhysicalMidyear(){
    let chart = new CanvasJS.Chart("chartPhysicalMidyear", {
      animationEnabled: true,
      exportEnabled: true,
      axisY:{
        maximum: 120,
      },
      title: {
        text: "Physical Percentage - Mid Year",
        fontSize: 30,
        fontColor: "green",
        fontWeight: "normal",
        fontStyle: "normal"
      },
      legend: {
        cursor: 'pointer'
      },
      data: [
          {
            type: 'column',
            showInLegend: true,
            name: 'Actual Physical Accomplishment',
            dataPoints: [
              { y: ((this.data.jana / this.data.pt_mid) * 100), label: 'Jan' },
              { y: ((this.data.jana + this.data.feba) * 100 / this.data.pt_mid), label: 'Feb' },
              { y: ((this.data.jana + this.data.feba + this.data.mara) * 100 / this.data.pt_mid), label: 'Mar' },
              { y: ((this.data.jana + this.data.feba + this.data.mara + this.data.apra) * 100 / this.data.pt_mid), label: 'Apr' },
              { y: ((this.data.jana + this.data.feba + this.data.mara + this.data.apra + this.data.maya) * 100 / this.data.pt_mid), label: 'May' },
              { y: ( this.data.pa_mid / this.data.pt_mid) * 100, label: 'Jun' },
            ]
          },
          {
            type: 'line',
            showInLegend: true,
            name: 'BED-2 Target',
            dataPoints: [
              { y: ((this.data.jant / this.data.pt_mid) * 100), label: 'Jan' },
              { y: ((this.data.jant + this.data.febt) * 100 / this.data.pt_mid), label: 'Feb' },
              { y: ((this.data.jant + this.data.febt + this.data.mart) * 100 / this.data.pt_mid), label: 'Mar' },
              { y: ((this.data.jant + this.data.febt + this.data.mart + this.data.aprt) * 100 / this.data.pt_mid), label: 'Apr' },
              { y: ((this.data.jant + this.data.febt + this.data.mart + this.data.aprt + this.data.mayt) * 100 / this.data.pt_mid), label: 'May' },
              { y: ( this.data.pt_mid / this.data.pt_mid) * 100, label: 'Jun' },
          
            ]
          },
        ]
    });
    setTimeout(function(){  chart.render(); }, 1000);
    this.chartObligationMidyear();  
  }

  chartObligationMidyear(){
    let chart = new CanvasJS.Chart("chartObligationMidyear", {
      animationEnabled: true,
      exportEnabled: true,
      axisY:{
        maximum: 120,
      },
      title: {
        text: "Obligation Percentage - Mid Year",
        fontSize: 20,
        fontColor: "teal",
        fontWeight: "normal",
        fontStyle: "normal"
      },
      legend: {
        cursor: 'pointer'
      },
      data: [
          {
            type: 'column',
            showInLegend: true,
            name: 'Actual Obligation',
            dataPoints: [
              { y: ((this.data.janfa / this.data.ft_mid) * 100), label: 'Jan' },
              { y: ((this.data.janfa + this.data.febfa) * 100 / this.data.ft_mid), label: 'Feb' },
              { y: ((this.data.janfa + this.data.febfa + this.data.marfa) * 100 / this.data.ft_mid), label: 'Mar' },
              { y: ((this.data.janfa + this.data.febfa + this.data.marfa + this.data.aprfa) * 100 / this.data.ft_mid), label: 'Apr' },
              { y: ((this.data.janfa + this.data.febfa + this.data.marfa + this.data.aprfa + this.data.mayfa) * 100 / this.data.ft_mid), label: 'May' },
              { y: ( this.data.fa_mid / this.data.ft_mid) * 100, label: 'Jun' },
            ]
          },
          {
            type: 'line',
            showInLegend: true,
            name: 'BED-1 Target',
            dataPoints: [
              { y: ((this.data.janft / this.data.ft_mid) * 100), label: 'Jan' },
              { y: ((this.data.janft + this.data.febft) * 100 / this.data.ft_mid), label: 'Feb' },
              { y: ((this.data.janft + this.data.febft + this.data.marft) * 100 / this.data.ft_mid), label: 'Mar' },
              { y: ((this.data.janft + this.data.febft + this.data.marft + this.data.aprft) * 100 / this.data.ft_mid), label: 'Apr' },
              { y: ((this.data.janft + this.data.febft + this.data.marft + this.data.aprft + this.data.mayft) * 100 / this.data.ft_mid), label: 'May' },
              { y: ( this.data.ft_mid / this.data.ft_mid) * 100, label: 'Jun' },
            ]
          },
        ]
    });
    setTimeout(function(){  chart.render(); }, 1000);
    this.chartDisbursementMidyear();  
  }

  chartDisbursementMidyear(){
    let chart = new CanvasJS.Chart("chartDisbursementMidyear", {
      animationEnabled: true,
      exportEnabled: true,
      axisY:{
        maximum: 120,
      },
      title: {
        text: "Disbursement Percentage - Mid Year",
        fontSize: 20,
        fontColor: "teal",
        fontWeight: "normal",
        fontStyle: "normal"
      },
      legend: {
        cursor: 'pointer'
      },
      data: [
          {
            type: 'column',
            showInLegend: true,
            name: 'Actual Disbursement',
            dataPoints: [
              { y: ((this.data.janda / this.data.dt_mid) * 100), label: 'Jan' },
              { y: ((this.data.janda + this.data.febda) * 100 / this.data.dt_mid), label: 'Feb' },
              { y: ((this.data.janda + this.data.febda + this.data.marda) * 100 / this.data.dt_mid), label: 'Mar' },
              { y: ((this.data.janda + this.data.febda + this.data.marda + this.data.aprda) * 100 / this.data.dt_mid), label: 'Apr' },
              { y: ((this.data.janda + this.data.febda + this.data.marda + this.data.aprda + this.data.mayda) * 100 / this.data.dt_mid), label: 'May' },
              { y: ( this.data.da_mid / this.data.dt_mid) * 100, label: 'Jun' },
            ]
          },
          {
            type: 'line',
            showInLegend: true,
            name: 'BED-3 Target',
            dataPoints: [
              { y: ((this.data.jandt / this.data.dt_mid) * 100), label: 'Jan' },
              { y: ((this.data.jandt + this.data.febdt) * 100 / this.data.dt_mid), label: 'Feb' },
              { y: ((this.data.jandt + this.data.febdt + this.data.mardt) * 100 / this.data.dt_mid), label: 'Mar' },
              { y: ((this.data.jandt + this.data.febdt + this.data.mardt + this.data.aprdt) * 100 / this.data.dt_mid), label: 'Apr' },
              { y: ((this.data.jandt + this.data.febdt + this.data.mardt + this.data.aprdt + this.data.maydt) * 100 / this.data.dt_mid), label: 'May' },
              { y: ( this.data.dt_mid / this.data.dt_mid) * 100, label: 'Jun' },
            ]
          },
        ]
    });
    setTimeout(function(){  chart.render(); }, 1000);
    this.chartPhysicalYearEnd();
  }

  chartPhysicalYearEnd(){
    let chart = new CanvasJS.Chart("chartPhysicalYearEnd", {
      animationEnabled: true,
      exportEnabled: true,
      axisY:{
        maximum: 120,
      },
      title: {
        text: "Physical Percentage - Year End",
        fontSize: 30,
        fontColor: "green",
        fontWeight: "normal",
        fontStyle: "normal"
      },
      legend: {
        cursor: 'pointer'
      },
      data: [
          {
            type: 'column',
            showInLegend: true,
            name: 'Actual Physical Accomplishment',
            dataPoints: [
              { y: ((this.data.jana / this.data.pt) * 100), label: 'Jan' },
              { y: ((this.data.jana + this.data.feba) / this.data.pt * 100), label: 'Feb' },
              { y: ((this.data.jana + this.data.feba + this.data.mara)  / this.data.pt * 100), label: 'Mar' },
              { y: ((this.data.jana + this.data.feba + this.data.mara + this.data.apra)  / this.data.pt * 100), label: 'Apr' },
              { y: ((this.data.jana + this.data.feba + this.data.mara + this.data.apra + this.data.maya) / this.data.pt * 100 ), label: 'May' },
              { y: ( this.data.pa_mid / this.data.pt) * 100, label: 'Jun' },
              { y: ((this.data.pa_mid + this.data.jula) / this.data.pt) * 100, label: 'Jul' },
              { y: ((this.data.pa_mid + this.data.jula + this.data.auga) / this.data.pt) * 100, label: 'Aug' },
              { y: ((this.data.pa_mid + this.data.jula + this.data.auga + this.data.sepa) / this.data.pt) * 100, label: 'Sep' },
              { y: ((this.data.pa_mid + this.data.jula + this.data.auga + this.data.sepa + this.data.octa) / this.data.pt) * 100, label: 'Oct' },
              { y: ((this.data.pa_mid + this.data.jula + this.data.auga + this.data.sepa + this.data.octa + this.data.nova) / this.data.pt) * 100, label: 'Nov' },
              { y: ( this.data.pa / this.data.pt) * 100, label: 'Dec' },
            ]
          },
          {
            type: 'line',
            showInLegend: true,
            name: 'BED-2 Target',
            dataPoints: [
              { y: ((this.data.jant / this.data.pt) * 100), label: 'Jan' },
              { y: ((this.data.jant + this.data.febt) / this.data.pt * 100), label: 'Feb' },
              { y: ((this.data.jant + this.data.febt + this.data.mart)  / this.data.pt * 100), label: 'Mar' },
              { y: ((this.data.jant + this.data.febt + this.data.mart + this.data.aprt)  / this.data.pt * 100), label: 'Apr' },
              { y: ((this.data.jant + this.data.febt + this.data.mart + this.data.aprt + this.data.mayt) / this.data.pt * 100 ), label: 'May' },
              { y: ( this.data.pt_mid / this.data.pt) * 100, label: 'Jun' },
              { y: ((this.data.pt_mid + this.data.jult) / this.data.pt) * 100, label: 'Jul' },
              { y: ((this.data.pt_mid + this.data.jult + this.data.augt) / this.data.pt) * 100, label: 'Aug' },
              { y: ((this.data.pt_mid + this.data.jult + this.data.augt + this.data.sept) / this.data.pt) * 100, label: 'Sep' },
              { y: ((this.data.pt_mid + this.data.jult + this.data.augt + this.data.sept + this.data.octt) / this.data.pt) * 100, label: 'Oct' },
              { y: ((this.data.pt_mid + this.data.jult + this.data.augt + this.data.sept + this.data.octt + this.data.novt) / this.data.pt) * 100, label: 'Nov' },
              { y: ( this.data.pt / this.data.pt) * 100, label: 'Dec' },
            ]
          },
        ]
    });
    setTimeout(function(){  chart.render(); }, 1000);
   this.chartObligationYearEnd();
  }
  chartObligationYearEnd(){
    let chart = new CanvasJS.Chart("chartObligationYearEnd", {
      animationEnabled: true,
      exportEnabled: true,
      axisY:{
        maximum: 120,
      },
      title: {
        text: "Obligation Percentage - Year End",
        fontSize: 20,
        fontColor: "teal",
        fontWeight: "normal",
        fontStyle: "normal"
      },
      legend: {
        cursor: 'pointer'
      },
      data: [
          {
            type: 'column',
            showInLegend: true,
            name: 'Actual Obligation',
            dataPoints: [
              { y: ((this.data.janfa / this.data.ft) * 100), label: 'Jan' },
              { y: ((this.data.janfa + this.data.febfa) / this.data.ft * 100), label: 'Feb' },
              { y: ((this.data.janfa + this.data.febfa + this.data.marfa)  / this.data.ft * 100), label: 'Mar' },
              { y: ((this.data.janfa + this.data.febfa + this.data.marfa + this.data.aprfa)  / this.data.ft * 100), label: 'Apr' },
              { y: ((this.data.janfa + this.data.febfa + this.data.marfa + this.data.aprfa + this.data.mayfa) / this.data.ft * 100 ), label: 'May' },
              { y: ( this.data.fa_mid / this.data.ft) * 100, label: 'Jun' },
              { y: ((this.data.fa_mid + this.data.julfa) / this.data.ft) * 100, label: 'Jul' },
              { y: ((this.data.fa_mid + this.data.julfa + this.data.augfa) / this.data.ft) * 100, label: 'Aug' },
              { y: ((this.data.fa_mid + this.data.julfa + this.data.augfa + this.data.sepfa) / this.data.ft) * 100, label: 'Sep' },
              { y: ((this.data.fa_mid + this.data.julfa + this.data.augfa + this.data.sepfa + this.data.octfa) / this.data.ft) * 100, label: 'Oct' },
              { y: ((this.data.fa_mid + this.data.julfa + this.data.augfa + this.data.sepfa + this.data.octfa + this.data.novfa) / this.data.ft) * 100, label: 'Nov' },
              { y: ( this.data.fa / this.data.ft) * 100, label: 'Dec' },
            ]
          },
          {
            type: 'line',
            showInLegend: true,
            name: 'BED-1 Target',
            dataPoints: [
              { y: ((this.data.janft / this.data.ft) * 100), label: 'Jan' },
              { y: ((this.data.janft + this.data.febft) / this.data.ft * 100), label: 'Feb' },
              { y: ((this.data.janft + this.data.febft + this.data.marft)  / this.data.ft * 100), label: 'Mar' },
              { y: ((this.data.janft + this.data.febft + this.data.marft + this.data.aprft)  / this.data.ft * 100), label: 'Apr' },
              { y: ((this.data.janft + this.data.febft + this.data.marft + this.data.aprft + this.data.mayft) / this.data.ft * 100 ), label: 'May' },
              { y: ( this.data.ft_mid / this.data.ft) * 100, label: 'Jun' },
              { y: ((this.data.ft_mid + this.data.julft) / this.data.ft) * 100, label: 'Jul' },
              { y: ((this.data.ft_mid + this.data.julft + this.data.augft) / this.data.ft) * 100, label: 'Aug' },
              { y: ((this.data.ft_mid + this.data.julft + this.data.augft + this.data.sepft) / this.data.ft) * 100, label: 'Sep' },
              { y: ((this.data.ft_mid + this.data.julft + this.data.augft + this.data.sepft + this.data.octft) / this.data.ft) * 100, label: 'Oct' },
              { y: ((this.data.ft_mid + this.data.julft + this.data.augft + this.data.sepft + this.data.octft + this.data.novft) / this.data.ft) * 100, label: 'Nov' },
              { y: ( this.data.ft / this.data.ft) * 100, label: 'Dec' },
            ]
          },
        ]
    });
    setTimeout(function(){  chart.render(); }, 1000);
    this.chartDisbursementYearEnd();
  }

  chartDisbursementYearEnd(){
    let chart = new CanvasJS.Chart("chartDisbursementYearEnd", {
      animationEnabled: true,
      exportEnabled: true,
      axisY:{
        maximum: 120,
      },
      title: {
        text: "Disbursement Percentage - Year End",
        fontSize: 20,
        fontColor: "teal",
        fontWeight: "normal",
        fontStyle: "normal"
      },
      legend: {
        cursor: 'pointer'
      },
      data: [
          {
            type: 'column',
            showInLegend: true,
            name: 'Actual Disbursement',
            dataPoints: [
              { y: ((this.data.janda / this.data.dt) * 100), label: 'Jan' },
              { y: ((this.data.janda + this.data.febda) / this.data.dt * 100), label: 'Feb' },
              { y: ((this.data.janda + this.data.febda + this.data.marda)  / this.data.dt * 100), label: 'Mar' },
              { y: ((this.data.janda + this.data.febda + this.data.marda + this.data.aprda)  / this.data.dt * 100), label: 'Apr' },
              { y: ((this.data.janda + this.data.febda + this.data.marda + this.data.aprda + this.data.mayda) / this.data.dt * 100 ), label: 'May' },
              { y: ( this.data.da_mid / this.data.dt) * 100, label: 'Jun' },
              { y: ((this.data.da_mid + this.data.julda) / this.data.dt) * 100, label: 'Jul' },
              { y: ((this.data.da_mid + this.data.julda + this.data.augda) / this.data.dt) * 100, label: 'Aug' },
              { y: ((this.data.da_mid + this.data.julda + this.data.augda + this.data.sepda) / this.data.dt) * 100, label: 'Sep' },
              { y: ((this.data.da_mid + this.data.julda + this.data.augda + this.data.sepda + this.data.octda) / this.data.dt) * 100, label: 'Oct' },
              { y: ((this.data.da_mid + this.data.julda + this.data.augda + this.data.sepda + this.data.octda + this.data.novda) / this.data.dt) * 100, label: 'Nov' },
              { y: ( this.data.da / this.data.dt) * 100, label: 'Dec' },
            ]
          },
          {
            type: 'line',
            showInLegend: true,
            name: 'BED-1 Target',
            dataPoints: [
              { y: ((this.data.jandt / this.data.dt) * 100), label: 'Jan' },
              { y: ((this.data.jandt + this.data.febdt) / this.data.dt * 100), label: 'Feb' },
              { y: ((this.data.jandt + this.data.febdt + this.data.mardt)  / this.data.dt * 100), label: 'Mar' },
              { y: ((this.data.jandt + this.data.febdt + this.data.mardt + this.data.aprdt)  / this.data.dt * 100), label: 'Apr' },
              { y: ((this.data.jandt + this.data.febdt + this.data.mardt + this.data.aprdt + this.data.maydt) / this.data.dt * 100 ), label: 'May' },
              { y: ( this.data.dt_mid / this.data.dt) * 100, label: 'Jun' },
              { y: ((this.data.dt_mid + this.data.juldt) / this.data.dt) * 100, label: 'Jul' },
              { y: ((this.data.dt_mid + this.data.juldt + this.data.augdt) / this.data.dt) * 100, label: 'Aug' },
              { y: ((this.data.dt_mid + this.data.juldt + this.data.augdt + this.data.sepdt) / this.data.dt) * 100, label: 'Sep' },
              { y: ((this.data.dt_mid + this.data.juldt + this.data.augdt + this.data.sepdt + this.data.octdt) / this.data.dt) * 100, label: 'Oct' },
              { y: ((this.data.dt_mid + this.data.juldt + this.data.augdt + this.data.sepdt + this.data.octdt + this.data.novdt) / this.data.dt) * 100, label: 'Nov' },
              { y: ( this.data.dt / this.data.dt) * 100, label: 'Dec' },
            ]
          },
        ]
    });
    setTimeout(function(){  chart.render(); }, 1000);
  }

  ngOnInit(): void {
    this.user = this.localStorageService.getItem('AUTH');
    this.getChart(this.user.pid)
  }

}
