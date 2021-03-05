import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'anms-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnInit {


  pid = 0;
  name: string = '';

 

  constructor(private route: ActivatedRoute) {
    this.pid = Number(this.route.snapshot.paramMap.get('pid'));
    this.name = this.route.snapshot.paramMap.get('name');

   }

  ngOnInit(): void {
  }

}
