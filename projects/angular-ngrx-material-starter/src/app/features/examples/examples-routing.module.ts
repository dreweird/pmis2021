import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../../core/core.module';

import { ExamplesComponent } from './examples/examples.component';
// import { AuthenticatedComponent } from './authenticated/authenticated.component';

// import { ParentComponent } from './theming/parent/parent.component';
// import { TodosContainerComponent } from './todos/components/todos-container.component';
// import { StockMarketContainerComponent } from './stock-market/components/stock-market-container.component';
import { CrudComponent } from './crud/components/crud.component';
import { DocumentComponent } from './document/document.component';
// import { FormComponent } from './form/components/form.component';
// import { NotificationsComponent } from './notifications/components/notifications.component';
// import { UserComponent } from './simple-state-management/components/user.component';
// import { ElementsComponent } from './elements/elements.component';

const routes: Routes = [
  {
    path: '',
    component: ExamplesComponent,
    children: [
      {
        path: '',
        redirectTo: 'crud',
        pathMatch: 'full'
      },
      {
        path: 'crud',
        component: CrudComponent
      },
      {
        path: 'document/:id',
        component: DocumentComponent,
        canActivate: [AuthGuardService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamplesRoutingModule {}
