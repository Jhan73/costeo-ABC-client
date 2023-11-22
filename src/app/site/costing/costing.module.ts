import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CostingRoutingModule } from './costing-routing.module';
import { AbcCostingComponent } from './pages/abc-costing/abc-costing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BaseTableModule } from 'src/app/shared/base/components/base-table/base-table.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    AbcCostingComponent,
    
  ],
  imports: [
    CommonModule,
    CostingRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    BaseTableModule,
    MatSnackBarModule,
    MatSelectModule,
    MatTableModule,
  ]
})
export class CostingModule { }
