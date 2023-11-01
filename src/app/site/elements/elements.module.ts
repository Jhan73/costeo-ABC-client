import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElementsRoutingModule } from './elements-routing.module';
import { ElementsComponent } from './elements.component';
import { ProductsComponent } from './pages/products/products.component';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { CostCentersComponent } from './pages/cost-centers/cost-centers.component';
import { ResourcesComponent } from './pages/resources/resources.component';
import { BaseTableModule } from 'src/app/shared/base/components/base-table/base-table.module';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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
    ElementsRoutingModule,
    BaseTableModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ElementsModule { }
