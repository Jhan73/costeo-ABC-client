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
import { BaseFormModalModule } from 'src/app/shared/base/components/base-form-modal/base-form-modal.module';
import { MatDialogModule } from '@angular/material/dialog';


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
    BaseFormModalModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ]
})
export class ElementsModule { }
