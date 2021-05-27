import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BedsComponent } from './beds/beds.component';


const routes: Routes = [
  {
    path: '',
    component: BedsComponent,
    data: { title: 'BEDS' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BayanihanRoutingModule { }
