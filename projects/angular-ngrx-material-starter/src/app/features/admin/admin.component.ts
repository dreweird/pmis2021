import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { routeAnimations, selectIsAuthenticated } from '../../core/core.module';
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

  constructor(private store: Store) {
    this.examples = [
      { link: 'commodity', label: 'Commodity' },
      { link: 'year2020', label: 'Year2020' }
    ];
  }

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
  }
}
