import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { PmisService } from '../../core/services/pmis.service';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../core/core.module';

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

  getLocked() {
    this.pmisService.month_locked().subscribe(data => {
      this.locked = data;
      this.cd.markForCheck();
    });
  }

  getLogsReport() {
    this.pmisService.logsReport().subscribe(data => {
      this.logs = data;
      console.log(this.logs);
      this.cd.markForCheck();
    });
  }

  constructor(public pmisService: PmisService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.getLocked();
    this.getLogsReport();
  }
}
