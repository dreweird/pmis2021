import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LazyElementsModule } from '@angular-extensions/elements';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { SharedModule } from '../../shared/shared.module';
import { environment } from '../../../environments/environment';
import { MomentModule } from 'ngx-moment';
import { AgGridModule } from 'ag-grid-angular';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { FEATURE_NAME, reducers } from './examples.state';
import { ExamplesRoutingModule } from './examples-routing.module';
import { ExamplesComponent } from './examples/examples.component';
import { TodosContainerComponent } from './todos/components/todos-container.component';
import { TodosEffects } from './todos/todos.effects';
import { StockMarketContainerComponent } from './stock-market/components/stock-market-container.component';
import { StockMarketEffects } from './stock-market/stock-market.effects';
import { StockMarketService } from './stock-market/stock-market.service';
import { ParentComponent } from './theming/parent/parent.component';
import { ChildComponent } from './theming/child/child.component';
import { CrudComponent } from './crud/components/crud.component';
import { BooksEffects } from './crud/books.effects';
import { FormComponent } from './form/components/form.component';
import { FormEffects } from './form/form.effects';
import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { NotificationsComponent } from './notifications/components/notifications.component';
import { ExamplesEffects } from './examples.effects';
import { UserComponent } from './simple-state-management/components/user.component';
import { UserService } from './simple-state-management/user.service';
import { ElementsComponent } from './elements/elements.component';
import { Bed1Component } from './bed1/bed1.component';
import { SummaryObjectComponent } from './bed1/summaryObject.component';
import { Bed1ContainerComponent } from './bed1/bed1-container/bed1-container.component';
import { BedPlanComponent } from './bed1/bed-plan.component';
import { AddObjectDialogComponent } from './bed1/addObject-dialog.component';
import { Bed2Component } from './bed2/bed2.component';
import { logDialog } from './bed2/logDialog.component';
import { entryDialog } from './crud/components/entryDialog.component';
import { districtDetailsDialog } from './district/districtDetailsDialog.component';
import { DistrictComponent } from './district/district.component';
import { Bed3PlanComponent } from './bed3/bed3-plan.component';
import { Bed3ContainerComponent } from './bed3/bed3-container/bed3-container.component';
import { Bed3Component } from './bed3/bed3.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, `./assets/i18n/examples/`, '.json');
}

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    LazyElementsModule,
    SharedModule,
    MomentModule,
    ExamplesRoutingModule,
    StoreModule.forFeature(FEATURE_NAME, reducers),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true
    }),
    EffectsModule.forFeature([
      ExamplesEffects,
      TodosEffects,
      StockMarketEffects,
      BooksEffects,
      FormEffects
    ]),
    AgGridModule.withComponents([]),
    NgxMatSelectSearchModule
  ],
  declarations: [
    ExamplesComponent,
    TodosContainerComponent,
    StockMarketContainerComponent,
    ParentComponent,
    ChildComponent,
    AuthenticatedComponent,
    CrudComponent,
    FormComponent,
    NotificationsComponent,
    UserComponent,
    ElementsComponent,
    Bed1Component,
    Bed1ContainerComponent,
    BedPlanComponent,
    SummaryObjectComponent,
    AddObjectDialogComponent,
    Bed2Component,
    logDialog,
    entryDialog,
    districtDetailsDialog,
    Bed2Component,
    Bed3ContainerComponent,
    Bed3PlanComponent,
    Bed3Component,
    DistrictComponent
  ],
  providers: [StockMarketService, UserService]
})
export class ExamplesModule {
  constructor() {}
}
