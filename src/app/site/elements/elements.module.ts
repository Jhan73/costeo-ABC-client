import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElementsRoutingModule } from './elements-routing.module';
import { ElementsComponent } from './elements.component';
import { ProductsComponent } from './pages/products/products.component';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { CostCentersComponent } from './pages/cost-centers/cost-centers.component';
import { ResourcesComponent } from './pages/resources/resources.component';


@NgModule({
  declarations: [
    ElementsComponent,
    ProductsComponent,
    ActivitiesComponent,
    CostCentersComponent,
    ResourcesComponent,
  ],
  imports: [
    CommonModule,
    ElementsRoutingModule
  ]
})
export class ElementsModule { }
