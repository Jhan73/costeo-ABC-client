import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { CostCentersComponent } from './pages/cost-centers/cost-centers.component';
import { ProductsComponent } from './pages/products/products.component';
import { ResourcesComponent } from './pages/resources/resources.component';

const routes: Routes = [
  { path: '', redirectTo: 'activities', pathMatch: 'full' },
  { path: 'activities', component: ActivitiesComponent },
  { path: 'cost-centers', component: CostCentersComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'resources', component: ResourcesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElementsRoutingModule { }
