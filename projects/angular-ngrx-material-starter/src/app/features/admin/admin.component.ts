import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  LocalStorageService,
  routeAnimations,
  selectIsAuthenticated
} from '../../core/core.module';
import { Observable } from 'rxjs';
import { Store, State, select } from '@ngrx/store';

@Component({
  selector: 'anms-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;

  user: any;
  examples: { link: string; label: string }[];

  constructor(
    private store: Store,
    private localStorageService: LocalStorageService
  ) {
    this.user = this.localStorageService.getItem('AUTH');
    console.log(this.user);

    if (this.user.b == 1) {
      this.examples = [{ link: 'budget', label: 'Budget' }];
    } else if (this.user.b == 2) {
      this.examples = [{ link: 'budget', label: 'Disburse' }];
    } else if (this.user.b == 3) {
      this.examples = [
        { link: 'budget', label: 'M&E' },
        { link: 'bydistrict', label: 'By District' },
        { link: 'bymun', label: 'By Municipality' }
      ];
    } else if (this.user.b == 4) {
      this.examples = [
        { link: 'budget', label: 'M&E' },
        { link: 'locked', label: 'Locked' },
        { link: 'bydistrict', label: 'By District' },
        { link: 'bymun', label: 'By Municipality' }
      ];
    } else if (this.user.pid <= 5) {
      this.examples = [
        { link: 'obligation', label: 'Obligation' },
        { link: 'physical', label: 'Physical' },
        { link: 'disburesment', label: 'Disbursement' },
        { link: 'bydistrict', label: 'By District' },
        { link: 'bymun', label: 'By Municipality' }
      ];
    } else {
      this.examples = [
        { link: 'obligation', label: 'Obligation' },
        { link: 'physical', label: 'Physical' },
        { link: 'disburesment', label: 'Disbursement' }
      ];
    }
  }

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
  }
}
