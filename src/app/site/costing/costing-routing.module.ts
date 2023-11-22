import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbcCostingComponent } from './pages/abc-costing/abc-costing.component';

const routes: Routes = [
  {
    path: 'abc-costing',
    component: AbcCostingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CostingRoutingModule { }
