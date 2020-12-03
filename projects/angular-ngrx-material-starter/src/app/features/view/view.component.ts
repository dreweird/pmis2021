import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../core/core.module';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { PmisService } from '../../core/services/pmis.service';

@Component({
  selector: 'anms-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  lineChartData: ChartDataSets[];
  lineChartLabels: Label[] = [];
  lineChartLegend = true;
  lineChartType = 'line';
  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)'
    }
  ];
  lineChartOptions: any & { annotation: any } = {
    responsive: true,
    title: {
      text: 'Prevailing Price Comparison - Year 2020',
      display: true
    }
  };
  chartReady = false;
  product;
  result = [];

  // object which holds the order value of the month
  monthNames = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12
  };

  constructor(
    private route: ActivatedRoute,
    public recordService: PmisService,
    private cd: ChangeDetectorRef
  ) {}

  distinctMonth;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let id = +params.get('id');
      this.recordService.find_commodity(id).subscribe((data: any) => {
        // console.log(data);
        data.url = 'http://172.16.128.163:3900/images/' + data.imageSrc;
        this.product = data;
        this.cd.markForCheck();
      });
      this.recordService.find_price(id).subscribe((data: any) => {
        const groupBy = keys => array =>
          array.reduce((objectsByKeyValue, obj) => {
            // Instead of creating a unique key for each grouped by values, we are now traversing (and building)
            // the whole object structure for every array value:
            keys.reduce((builder, key, index) => {
              if (index !== keys.length - 1) {
                // Building the nested grouped by structure
                builder[obj[key]] = builder[obj[key]] || {};
              } else {
                // Appending the current object at the leaf node
                builder[obj[key]] = (builder[obj[key]] || []).concat(
                  obj.price1
                );
              }
              return builder[obj[key]];
            }, objectsByKeyValue);

            return objectsByKeyValue;
          }, {});

        const resultGroupBy = groupBy(['area', 'month'])(data);
        console.log(resultGroupBy);
        // const list = [
        //   { color: 'white', size: 'XXL' },
        //   { color: 'red', size: 'XL' },
        //   { color: 'black', size: 'M' }
        // ];
        // console.log(list);
        // let s = list.sort((a, b) => (a.color > b.color) ? 1 : -1);
        // console.log(s);

        Object.keys(resultGroupBy).forEach((item, index) => {
          //  console.log(item); // Butuan City, ...
          let arr = resultGroupBy[item];
          let appendMonth = [];
          let appendResultMode = [];
          let lineChartData: ChartDataSets[];
          this.result[index] = { label: item };

          const sort = Object.entries(arr).sort(
            (a, b) => this.monthNames[a[0]] - this.monthNames[b[0]]
          );

          sort.forEach(i => {
            appendMonth.push(i[0]);
            appendResultMode.push(mode2(i[1]));
          });

          lineChartData = [
            { data: appendResultMode, label: item, fill: false }
          ];
          this.result[index].datasets = lineChartData;
          this.result[index].month = appendMonth;
        });
        this.result = this.result;
        this.chartReady = true;
        this.cd.markForCheck();
        console.log(this.result);
      });
    });
  }
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
    // console.log(arr, median(arr));
    return median(arr);
  } else {
    return modeFunction(arr);
  }
}
