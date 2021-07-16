import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input, OnChanges } from '@angular/core';
import { LocalStorageService, ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';
import * as CanvasJS from '../../../../assets/canvasjs.min';
import { PmisService } from '../../../core/services/pmis.service';
import { Router } from '@angular/router';

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

  max_month_ob: any;
  month_ob_per: any;
  max_month_obspike: any;
  max_quarter_ob : any;
  max_quarter_obper: any;
  actual_ob : any;

  max_month_dis: any;
  month_dis_per: any;
  max_month_disspike: any;
  max_quarter_dis : any;
  max_quarter_disper: any;
  actual_dis : any;

  max_month_p: any;
  month_p_per: any;
  max_month_pspike: any;
  max_quarter_p : any;
  max_quarter_pper: any;
  actual_p : any;

  array_obspike: { y: number; label: string; }[];
  array_obtarget: { y: any; label: string; }[];
  array_obquarter: { y: any; label: string; }[];

  array_disspike: { y: number; label: string; }[];
  array_distarget: { y: any; label: string; }[];
  array_disquarter: { y: any; label: string; }[];

  array_pspike: { y: number; label: string; }[];
  array_ptarget: { y: any; label: string; }[];
  array_pquarter: { y: any; label: string; }[];

  
  ngOnChanges(changes: any) {
    this.pid = changes.pid.currentValue;
    this.name = changes.name.currentValue;
    this.getChart(this.pid);
    console.log("ngonchanges");
  
  }

  total_mid_capped = 0;
  total_mid_target = 0;
  total_ye_capped = 0;
  total_ye_target = 0;

  getChart(pid){
    console.log(pid);

    this.pmisService.getPhysical(pid).subscribe((data: any) => {
      console.log(data);
      // CAPPED at 100%
      for (var key in data) {
        var sumTarget = data[key].jant + data[key].febt + data[key].mart  + data[key].aprt + data[key].mayt + data[key].junt;
        var sumAccomp = data[key].jana + data[key].feba + data[key].mara  + data[key].apra + data[key].maya + data[key].juna;
        var sumTarget2 = sumTarget + data[key].jult + data[key].augt + data[key].sept  + data[key].octt + data[key].novt + data[key].dect;
        var sumAccomp2 = sumAccomp + data[key].jula + data[key].auga + data[key].sepa  + data[key].octa + data[key].nova + data[key].deca;
        this.total_mid_target += sumTarget;
        this.total_ye_target += sumTarget2;
        if( sumTarget < sumAccomp) {
          this.total_mid_capped += sumTarget;
        }else{
          this.total_mid_capped += sumAccomp;
        }
        if( sumTarget2 < sumAccomp2) {
          this.total_ye_capped += sumTarget2;
        }else{
          this.total_ye_capped += sumAccomp2;
        }
    }

 this.pp_midyear = (this.total_mid_capped / this.total_mid_target) * 100;
 this.pp_yearend = (this.total_ye_capped / this.total_ye_target) * 100;

    })


    this.pmisService.getChart(pid).subscribe((data: any) => {
 
      
      this.op_midyear = (data.fa_mid / data.ft_mid) * 100;
      this.dp_midyear = (data.da_mid / data.dt_mid) * 100;
      //this.pp_yearend = (data.pa / data.pt) * 100;
      this.op_yearend = (data.fa / data.ft) * 100;
      this.dp_yearend = (data.da / data.dt) * 100;
      this.data = data;
      
      this.array_obtarget = [ 
        { y: data.janft, label: "Jan"},
        { y: data.febft, label: "Feb"},
        { y: data.marft, label: "Mar"},
        { y: data.aprft, label: "Apr" },
        { y: data.mayft, label: "May" },
        { y: data.junft, label: "Jun" },
        { y: data.julft, label: "Jul" },
        { y: data.augft, label: "Aug" },
        { y: data.sepft, label: "Sep" },
        { y: data.octft, label: "Oct" },
        { y: data.novft, label: "Nov" },
        { y: data.decft, label: "Dec" }];

      
      this.array_obspike = [
        { y: isFinite(( this.data.janfa / this.data.janft) * 100) ? (this.data.janfa / this.data.janft) * 100  : 0, label: 'Jan' },
        { y: isFinite(( this.data.febfa / this.data.febft) * 100) ? ( this.data.febfa / this.data.febft) * 100 : 0, label: 'Feb' },
        { y: isFinite(( this.data.marfa / this.data.marft) * 100) ? ( this.data.marfa / this.data.marft) * 100 : 0, label: 'Mar' },
        { y: isFinite(( this.data.aprfa / this.data.aprft) * 100) ? ( this.data.aprfa / this.data.aprft) * 100 : 0, label: 'Apr' },
        { y: isFinite(( this.data.mayfa / this.data.mayft) * 100) ? ( this.data.mayfa / this.data.mayft) * 100 : 0, label: 'May' },
        { y: isFinite(( this.data.junfa / this.data.junft) * 100) ? ( this.data.junfa / this.data.junft) * 100 : 0, label: 'Jun' },
        { y: isFinite(( this.data.julfa / this.data.julft) * 100) ? ( this.data.julfa / this.data.julft) * 100 : 0, label: 'Jul' },
        { y: isFinite(( this.data.augfa / this.data.augft) * 100) ? ( this.data.augfa / this.data.augft) * 100 : 0, label: 'Aug' },
        { y: isFinite(( this.data.sepfa / this.data.sepft) * 100) ? ( this.data.sepfa / this.data.sepft) * 100 : 0, label: 'Sep' },
        { y: isFinite(( this.data.octfa / this.data.octft) * 100) ? ( this.data.octfa / this.data.octft) * 100 : 0, label: 'Oct' },
        { y: isFinite(( this.data.novfa / this.data.novft) * 100) ? ( this.data.novfa / this.data.novft) * 100 : 0, label: 'Nov' },
        { y: isFinite(( this.data.decfa / this.data.decft) * 100) ? ( this.data.decfa / this.data.decft) * 100 : 0, label: 'Dec' },
];

      this.array_obquarter = [
        { y: data.janft + data.febft + data.marft, label: "1"}, 
        { y: data.aprft + data.mayft + data.junft, label: "2"}, 
        { y: data.julft + data.augft + data.sepft, label: "3"},
        { y: data.octft + data.novft + data.decft, label: "4"}, 
      ]

  
   

      this.array_distarget = [ 
        { y: data.jandt, label: "Jan"},
        { y: data.febdt, label: "Feb"},
        { y: data.mardt, label: "Mar"},
        { y: data.aprdt, label: "Apr" },
        { y: data.maydt, label: "May" },
        { y: data.jundt, label: "Jun" },
        { y: data.juldt, label: "Jul" },
        { y: data.augdt, label: "Aug" },
        { y: data.sepdt, label: "Sep" },
        { y: data.octdt, label: "Oct" },
        { y: data.novdt, label: "Nov" },
        { y: data.decdt, label: "Dec" }];

        this.array_disspike = [
          { y: ((data.janda / data.jandt) * 100), label: "Jan"}, 
          { y: ((data.febda / data.febdt) * 100), label: "Feb"}, 
          { y: ((data.marda / data.mardt) * 100), label: "Mar"},
          { y: ((data.aprda / data.aprdt) * 100), label: "Apr"}, 
          { y: ((data.mayda / data.maydt) * 100), label: "May"}, 
          { y: ((data.junda / data.jundt) * 100), label: "Jun"},
  
          { y: ((data.julda / data.juldt) * 100), label: "Jul"},
          { y: ((data.augda / data.augdt) * 100), label: "Aug"}, 
          { y: ((data.sepda / data.sepdt) * 100), label: "Sep"},
          { y: ((data.octda / data.octdt) * 100), label: "Oct"},
          { y: ((data.novda / data.novdt) * 100), label: "Nov"},
          { y: ((data.decda / data.decdt) * 100), label: "Dec"}];
  
        this.array_disquarter = [
          { y: data.jandt + data.febdt + data.mardt, label: "1"}, 
          { y: data.aprdt + data.maydt + data.jundt, label: "2"}, 
          { y: data.juldt + data.augdt + data.sepdt, label: "3"},
          { y: data.octdt + data.novdt + data.decdt, label: "4"}, 
        ];

        this.array_ptarget = [ 
          { y: data.jant, label: "Jan"},
          { y: data.febt, label: "Feb"},
          { y: data.mart, label: "Mar"},
          { y: data.aprt, label: "Apr" },
          { y: data.mayt, label: "May" },
          { y: data.junt, label: "Jun" },
          { y: data.jult, label: "Jul" },
          { y: data.augt, label: "Aug" },
          { y: data.sept, label: "Sep" },
          { y: data.octt, label: "Oct" },
          { y: data.novt, label: "Nov" },
          { y: data.dect, label: "Dec" }];
  
          this.array_pspike = [
            { y: ((data.jana / data.jant) * 100), label: "Jan"}, 
            { y: ((data.feba / data.febt) * 100), label: "Feb"}, 
            { y: ((data.mara / data.mart) * 100), label: "Mar"},
            { y: ((data.apra / data.aprt) * 100), label: "Apr"}, 
            { y: ((data.maya / data.mayt) * 100), label: "May"}, 
            { y: ((data.juna / data.junt) * 100), label: "Jun"},
    
            { y: ((data.jula / data.jult) * 100), label: "Jul"},
            { y: ((data.auga / data.augt) * 100), label: "Aug"}, 
            { y: ((data.sepa / data.sept) * 100), label: "Sep"},
            { y: ((data.octa / data.octt) * 100), label: "Oct"},
            { y: ((data.nova / data.novt) * 100), label: "Nov"},
            { y: ((data.deca / data.dect) * 100), label: "Dec"}];
    
          this.array_pquarter = [
            { y: data.jant + data.febt + data.mart, label: "1"}, 
            { y: data.aprt + data.mayt + data.junt, label: "2"}, 
            { y: data.jult + data.augt + data.sept, label: "3"},
            { y: data.octt + data.novt + data.dect, label: "4"}, 
          ];

  

      this.chartObligation();
      this.chartObligationQuarter();
      this.chartDisbursement();
      this.chartDisbursementQuarter();
      this.chartPhysical();
      this.chartPhysicalQuarter();


      let result = this.array_obtarget.sort(function(a: any,b: any){
        if(isFinite(b.y-a.y)) {
          return b.y-a.y; 
        } else {
          return isFinite(a.y) ? -1 : 1;
        }
      });

      let result2 = this.array_obspike.sort(function(a: any,b: any){
        if(isFinite(b.y-a.y)) {
          return b.y-a.y; 
        } else {
          return isFinite(a.y) ? -1 : 1;
        }
      });

      let result3 = this.array_obquarter.sort(function(a: any,b: any){
        if(isFinite(b.y-a.y)) {
          return b.y-a.y; 
        } else {
          return isFinite(a.y) ? -1 : 1;
        }
      });

      console.log(result);

      this.max_month_ob = result[0].label;
      this.month_ob_per =  (result[0].y / data.ft) * 100;
      this.max_month_obspike = result2[0];


      this.max_quarter_ob = result3[0].label;
      this.max_quarter_obper = result3[0].y / data.ft;
      this.actual_ob = data.fa;

   
 

 
      let result4 = this.array_distarget.sort(function(a: any,b: any){
        if(isFinite(b.y-a.y)) {
          return b.y-a.y; 
        } else {
          return isFinite(a.y) ? -1 : 1;
        }
      });

      let result5 = this.array_disspike.sort(function(a: any,b: any){
        if(isFinite(b.y-a.y)) {
          return b.y-a.y; 
        } else {
          return isFinite(a.y) ? -1 : 1;
        }
      });

      let result6 = this.array_disquarter.sort(function(a: any,b: any){
        if(isFinite(b.y-a.y)) {
          return b.y-a.y; 
        } else {
          return isFinite(a.y) ? -1 : 1;
        }
      });

      this.max_month_dis = result4[0].label;
      this.month_dis_per =  (result4[0].y / data.dt) * 100;
      this.max_month_disspike = result5[0];

 
      this.max_quarter_dis = result6[0].label;
      this.max_quarter_disper = result6[0].y / data.dt;
      this.actual_dis = data.da;

      let result7 = this.array_ptarget.sort(function(a: any,b: any){
        if(isFinite(b.y-a.y)) {
          return b.y-a.y; 
        } else {
          return isFinite(a.y) ? -1 : 1;
        }
      });

      let result8 = this.array_pspike.sort(function(a: any,b: any){
        if(isFinite(b.y-a.y)) {
          return b.y-a.y; 
        } else {
          return isFinite(a.y) ? -1 : 1;
        }
      });

      let result9 = this.array_pquarter.sort(function(a: any,b: any){
        if(isFinite(b.y-a.y)) {
          return b.y-a.y; 
        } else {
          return isFinite(a.y) ? -1 : 1;
        }
      });


      this.max_month_p = result7[0].label;
      this.month_p_per =  (result7[0].y / data.pt) * 100;
      this.max_month_pspike = result8[0];
  
  
      this.max_quarter_p = result9[0].label;
      this.max_quarter_pper = result9[0].y / data.pt;
      this.actual_p = data.pa;


      this.cd.markForCheck();

    
    });
 
  }

  constructor(private cd: ChangeDetectorRef, public pmisService: PmisService, private localStorageService: LocalStorageService, private router: Router) { }



  chartObligation(){
    let chart = new CanvasJS.Chart("chartObligation", {
      animationEnabled: true,
      exportEnabled: true,
      axisY: {
        title: "Pesos",
        titleFontColor: "#4F81BC",
        lineColor: "#4F81BC",
        labelFontColor: "#4F81BC",
        tickColor: "#4F81BC",
       // valueFormatString: "#," + " k",
      },
      axisY2: {
        title: "Percentage",
        titleFontColor: "#008000",
        lineColor: "#008000",
        labelFontColor: "#008000",
        tickColor: "#008000"
      },	
      legend: {
        cursor: 'pointer'
      },
      toolTip: {
        shared: true
      },
      data: [
        {
          type: 'column',
          showInLegend: true,
          name: 'Plan',
          dataPoints:this.array_obtarget
        },
          {
            type: 'column',
            showInLegend: true,
            name: 'Actual',
            dataPoints: [
              { y: this.data.janfa, label: 'Jan' },
              { y: this.data.febfa, label: 'Feb' },
              { y: this.data.marfa, label: 'Mar' },
              { y: this.data.aprfa, label: 'Apr' },
              { y: this.data.mayfa, label: 'May' },
              { y: this.data.junfa, label: 'Jun' },
              { y: this.data.julfa, label: 'Jul' },
              { y: this.data.augfa,label: 'Aug' },
              { y: this.data.sepfa, label: 'Sep' },
              { y: this.data.octfa, label: 'Oct' },
              { y: this.data.novfa, label: 'Nov' },
              { y: this.data.decfa, label: 'Dec' },
            ]
          },
     
          {
            type: 'line',
            showInLegend: true,
            axisYType: "secondary",
            name: 'Percentage',
            dataPoints: this.array_obspike
          },
        ]
    });
    chart.render();
  }

  chartObligationQuarter(){
    let chart = new CanvasJS.Chart("chartObligationQuarter", {
      animationEnabled: true,
  
      toolTip: {
        shared: true,
      },
      data: [{
        type: "stackedColumn",
        showInLegend: true,
        name: "Q1",
        dataPoints: [
          { y: (this.data.janft + this.data.febft + this.data.marft), label: "Plan" },
          { y: (this.data.janfa + this.data.febfa + this.data.marfa), label: "Actual" },
         
        ]
        },
        {        
          type: "stackedColumn",
          showInLegend: true,
          name: "Q2",
          dataPoints: [
            { y: (this.data.aprft + this.data.mayft + this.data.junft), label: "Plan" },
            { y: (this.data.aprfa + this.data.mayfa + this.data.junfa), label: "Actual" },
           
          ]
        },
        {        
          type: "stackedColumn",
          showInLegend: true,
          name: "Q3",
          dataPoints: [
            { y: (this.data.julft + this.data.augft + this.data.sepft), label: "Plan" },
            { y: (this.data.julfa + this.data.augfa + this.data.sepfa), label: "Actual" },
          
    
          ]
        },
        {        
          type: "stackedColumn",
          showInLegend: true,
          name: "Q4",
          dataPoints: [
            { y: (this.data.octft + this.data.novft + this.data.decft), label: "Plan" },
            { y: (this.data.octfa + this.data.novfa + this.data.decfa), label: "Actual" },
    
          ]
      }]
    });
    chart.render();
  }

  chartDisbursement(){
    let chart = new CanvasJS.Chart("chartDisbursement", {
      animationEnabled: true,
      exportEnabled: true,
      axisY: {
        title: "Pesos",
        titleFontColor: "#4F81BC",
        lineColor: "#4F81BC",
        labelFontColor: "#4F81BC",
        tickColor: "#4F81BC"
      },
      axisY2: {
        title: "Percentage",
        titleFontColor: "#008000",
        lineColor: "#008000",
        labelFontColor: "#008000",
        tickColor: "#008000"
      },	
      legend: {
        cursor: 'pointer'
      },
      toolTip: {
        shared: true
      },
      data: [
        {
          type: 'column',
          showInLegend: true,
          name: 'Plan',
          dataPoints: [
            { y: this.data.jandt, label: 'Jan' },
            { y: this.data.febdt, label: 'Feb' },
            { y: this.data.mardt, label: 'Mar' },
            { y: this.data.aprdt, label: 'Apr' },
            { y: this.data.maydt, label: 'May' },
            { y: this.data.jundt, label: 'Jun' },
            { y: this.data.juldt, label: 'Jul' },
            { y: this.data.augdt, label: 'Aug' },
            { y: this.data.sepdt, label: 'Sep' },
            { y: this.data.octdt, label: 'Oct' },
            { y: this.data.novdt, label: 'Nov' },
            { y: this.data.decdt, label: 'Dec' },
          ]
        },
          {
            type: 'column',
            showInLegend: true,
            name: 'Actual',
            dataPoints: [
              { y: this.data.janda, label: 'Jan' },
              { y: this.data.febda, label: 'Feb' },
              { y: this.data.marda, label: 'Mar' },
              { y: this.data.aprda, label: 'Apr' },
              { y: this.data.mayda, label: 'May' },
              { y: this.data.junda, label: 'Jun' },
              { y: this.data.julda, label: 'Jul' },
              { y: this.data.augda,label: 'Aug' },
              { y: this.data.sepda, label: 'Sep' },
              { y: this.data.octda, label: 'Oct' },
              { y: this.data.novda, label: 'Nov' },
              { y: this.data.decda, label: 'Dec' },
            ]
          },
  
          {
            type: 'line',
            showInLegend: true,
            axisYType: "secondary",
            name: 'Percentage',
            dataPoints: [
              { y: isFinite(( this.data.janda / this.data.jandt) * 100) ? (this.data.janda / this.data.jandt) * 100  : 0, label: 'Jan' },
              { y: isFinite(( this.data.febda / this.data.febdt) * 100) ? ( this.data.febda / this.data.febdt) * 100 : 0, label: 'Feb' },
              { y: isFinite(( this.data.marda / this.data.mardt) * 100) ? ( this.data.marda / this.data.mardt) * 100 : 0, label: 'Mar' },
              { y: isFinite(( this.data.aprda / this.data.aprdt) * 100) ? ( this.data.aprda / this.data.aprdt) * 100 : 0, label: 'Apr' },
              { y: isFinite(( this.data.mayda / this.data.maydt) * 100) ? ( this.data.mayda / this.data.maydt) * 100 : 0, label: 'May' },
              { y: isFinite(( this.data.junda / this.data.jundt) * 100) ? ( this.data.junda / this.data.jundt) * 100 : 0, label: 'Jun' },
              { y: isFinite(( this.data.julda / this.data.juldt) * 100) ? ( this.data.julda / this.data.juldt) * 100 : 0, label: 'Jul' },
              { y: isFinite(( this.data.augda / this.data.augdt) * 100) ? ( this.data.augda / this.data.augdt) * 100 : 0, label: 'Aug' },
              { y: isFinite(( this.data.sepda / this.data.sepdt) * 100) ? ( this.data.sepda / this.data.sepdt) * 100 : 0, label: 'Sep' },
              { y: isFinite(( this.data.octda / this.data.octdt) * 100) ? ( this.data.octda / this.data.octdt) * 100 : 0, label: 'Oct' },
              { y: isFinite(( this.data.novda / this.data.novdt) * 100) ? ( this.data.novda / this.data.novdt) * 100 : 0, label: 'Nov' },
              { y: isFinite(( this.data.decda / this.data.decdt) * 100) ? ( this.data.decda / this.data.decdt) * 100 : 0, label: 'Dec' },
            ]
          },
        ]
    });
    chart.render();

  }

  chartDisbursementQuarter(){
    let chart = new CanvasJS.Chart("chartDisbursementQuarter", {
      animationEnabled: true,
  
      toolTip: {
        shared: true,
      },
      data: [{
        type: "stackedColumn",
        showInLegend: true,
        name: "Q1",
        dataPoints: [
          { y: (this.data.jandt + this.data.febdt + this.data.mardt), label: "Plan" },
          { y: (this.data.janda + this.data.febda + this.data.marda), label: "Actual" },
     
        ]
        },
        {        
          type: "stackedColumn",
          showInLegend: true,
          name: "Q2",
          dataPoints: [
            { y: (this.data.aprdt + this.data.maydt + this.data.jundt), label: "Plan" },
            { y: (this.data.aprda + this.data.mayda + this.data.junda), label: "Actual" },
      
          ]
        },
        {        
          type: "stackedColumn",
          showInLegend: true,
          name: "Q3",
          dataPoints: [
            { y: (this.data.juldt + this.data.augdt + this.data.sepdt), label: "Plan" },
            { y: (this.data.julda + this.data.augda + this.data.sepda), label: "Actual" },
       
    
          ]
        },
        {        
          type: "stackedColumn",
          showInLegend: true,
          name: "Q4",
          dataPoints: [
            { y: (this.data.octdt + this.data.novdt + this.data.decdt), label: "Plan" },
            { y: (this.data.octda + this.data.novda + this.data.decda), label: "Actual" },
         
          ]
      }]
    });
    chart.render();
  }

  chartPhysical(){
    let chart = new CanvasJS.Chart("chartPhysical", {
      animationEnabled: true,
      exportEnabled: true,
      axisY: {
        title: "Targets",
        titleFontColor: "#FF0000",
        lineColor: "#FF0000",
        labelFontColor: "#FF0000",
        tickColor: "#FF0000"
      },
      axisY2: {
        title: "Percentage",
        titleFontColor: "#008000",
        lineColor: "#008000",
        labelFontColor: "#008000",
        tickColor: "#008000"
      },	
      legend: {
        cursor: 'pointer'
      },
      toolTip: {
        shared: true
      },
      data: [
        {
          type: 'column',
          showInLegend: true,
          name: 'Plan',
          dataPoints: [
            { y: this.data.jant, label: 'Jan' },
            { y: this.data.febt, label: 'Feb' },
            { y: this.data.mart, label: 'Mar' },
            { y: this.data.aprt, label: 'Apr' },
            { y: this.data.mayt, label: 'May' },
            { y: this.data.junt, label: 'Jun' },
            { y: this.data.jult, label: 'Jul' },
            { y: this.data.augt, label: 'Aug' },
            { y: this.data.sept, label: 'Sep' },
            { y: this.data.octt, label: 'Oct' },
            { y: this.data.novt, label: 'Nov' },
            { y: this.data.dect, label: 'Dec' },
          ]
        },
          {
            type: 'column',
            showInLegend: true,
            name: 'Actual',
            dataPoints: [
              { y: this.data.jana, label: 'Jan' },
              { y: this.data.feba, label: 'Feb' },
              { y: this.data.mara, label: 'Mar' },
              { y: this.data.apra, label: 'Apr' },
              { y: this.data.maya, label: 'May' },
              { y: this.data.juna, label: 'Jun' },
              { y: this.data.jula, label: 'Jul' },
              { y: this.data.auga,label: 'Aug' },
              { y: this.data.sepa, label: 'Sep' },
              { y: this.data.octa, label: 'Oct' },
              { y: this.data.nova, label: 'Nov' },
              { y: this.data.deca, label: 'Dec' },
            ]
          },
    
          {
            type: 'line',
            showInLegend: true,
            axisYType: "secondary",
            name: 'Percentage',
            dataPoints: [
              { y: isFinite(( this.data.jana / this.data.jant) * 100) ? (this.data.jana / this.data.jant) * 100  : 0, label: 'Jan' },
              { y: isFinite(( this.data.feba / this.data.febt) * 100) ? ( this.data.feba / this.data.febt) * 100 : 0, label: 'Feb' },
              { y: isFinite(( this.data.mara / this.data.mart) * 100) ? ( this.data.mara / this.data.mart) * 100 : 0, label: 'Mar' },
              { y: isFinite(( this.data.apra / this.data.aprt) * 100) ? ( this.data.apra / this.data.aprt) * 100 : 0, label: 'Apr' },
              { y: isFinite(( this.data.maya / this.data.mayt) * 100) ? ( this.data.maya / this.data.mayt) * 100 : 0, label: 'May' },
              { y: isFinite(( this.data.juna / this.data.junt) * 100) ? ( this.data.juna / this.data.junt) * 100 : 0, label: 'Jun' },
              { y: isFinite(( this.data.jula / this.data.jult) * 100) ? ( this.data.jula / this.data.jult) * 100 : 0, label: 'Jul' },
              { y: isFinite(( this.data.auga / this.data.augt) * 100) ? ( this.data.auga / this.data.augt) * 100 : 0, label: 'Aug' },
              { y: isFinite(( this.data.sepa / this.data.sept) * 100) ? ( this.data.sepa / this.data.sept) * 100 : 0, label: 'Sep' },
              { y: isFinite(( this.data.octa / this.data.octt) * 100) ? ( this.data.octa / this.data.octt) * 100 : 0, label: 'Oct' },
              { y: isFinite(( this.data.nova / this.data.novt) * 100) ? ( this.data.nova / this.data.novt) * 100 : 0, label: 'Nov' },
              { y: isFinite(( this.data.deca / this.data.dect) * 100) ? ( this.data.deca / this.data.dect) * 100 : 0, label: 'Dec' },
            ]
          },
        ]
    });
    chart.render();
  
  }

  chartPhysicalQuarter(){
    let chart = new CanvasJS.Chart("chartPhysicalQuarter", {
      animationEnabled: true,
  
      toolTip: {
        shared: true,
      },
      data: [{
        type: "stackedColumn",
        showInLegend: true,
        name: "Q1",
        dataPoints: [
          { y: (this.data.jant + this.data.febt + this.data.mart), label: "Plan" },
          { y: (this.data.jana + this.data.feba + this.data.mara), label: "Actual" }
        
        ]
        },
        {        
          type: "stackedColumn",
          showInLegend: true,
          name: "Q2",
          dataPoints: [
            { y: (this.data.aprt + this.data.mayt + this.data.junt), label: "Plan" },
            { y: (this.data.apra + this.data.maya + this.data.juna), label: "Actual" }
          
          ]
        },
        {        
          type: "stackedColumn",
          showInLegend: true,
          name: "Q3",
          dataPoints: [
            { y: (this.data.jult + this.data.augt + this.data.sept), label: "Plan" },
            { y: (this.data.jula + this.data.auga + this.data.sepa), label: "Actual" }
       
    
          ]
        },
        {        
          type: "stackedColumn",
          showInLegend: true,
          name: "Q4",
          dataPoints: [
            { y: (this.data.octt + this.data.novt + this.data.dect), label: "Plan" },
            { y: (this.data.octa + this.data.nova + this.data.deca), label: "Actual" }

          ]
      }]
    });
    chart.render();
  }


  ngOnInit(): void {
    this.user = this.localStorageService.getItem('AUTH');
    if (this.router.url.indexOf('/dashboard/chart') > -1) {
    }else {
      this.getChart(this.user.pid);
    }
  
  }

}
