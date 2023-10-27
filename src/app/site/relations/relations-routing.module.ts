import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityProductComponent } from './pages/activity-product/activity-product.component';
import { CostCenterResourceComponent } from './pages/cost-center-resource/cost-center-resource.component';
import { MaterialLaborComponent } from './pages/material-labor/material-labor.component';
import { ResourceActivityComponent } from './pages/resource-activity/resource-activity.component';

const routes: Routes = [
  { path: '', redirectTo: 'activity-product', pathMatch: 'full'},
  { path: 'activity-product', component: ActivityProductComponent },
  { path: 'cost-center-resource', component: CostCenterResourceComponent },
  { path: 'material-labor', component: MaterialLaborComponent },
  { path: 'resource-activity', component: ResourceActivityComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelationsRoutingModule { }
