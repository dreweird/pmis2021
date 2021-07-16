
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import {
  LocalStorageService,
  ROUTE_ANIMATIONS_ELEMENTS
} from '../../../core/core.module';
import { PmisService } from '../../../core/services/pmis.service';

@Component({
  selector: 'anms-midyear-all',
  templateUrl: './midyear-all.component.html',
  styleUrls: ['./midyear-all.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MidyearAllComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  user: any;
  menu: any;
  pid = 0;
  name: string = '';

  setPID(pid: number, name: string) {
    this.pid = pid;
    this.name = name;
  }

  constructor(
    private pmisService: PmisService,
    private cd: ChangeDetectorRef,
    private localStorageService: LocalStorageService
  ) {
    this.user = this.localStorageService.getItem('AUTH');
    if (this.user.pid == 100) {
      this.user.user_id = 62;
    }
    console.log(this.user.user_id);
    this.pmisService.getBudgetAssignmnet(this.user.user_id).subscribe(data => {
      this.menu = data;
      this.cd.markForCheck();
    });
  }

  ngOnInit(): void {}
}

