import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElementsRoutingModule } from './elements-routing.module';
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
import { ModalDialogModule } from 'src/app/shared/base/components/modal-dialog/modal-dialog.module';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { InductorsComponent } from './pages/inductors/inductors.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ProductsComponent,
    ActivitiesComponent,
    CostCentersComponent,
    ResourcesComponent,
    InductorsComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ElementsRoutingModule,
    BaseTableModule,
    BaseFormModalModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    ModalDialogModule,
    MatSnackBarModule,
  ]
})
export class ElementsModule { }
