import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseTableComponent } from './base-table.component';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { BaseFormModalModule } from '../base-form-modal/base-form-modal.module';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    BaseTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    BaseFormModalModule,
    MatInputModule,
  ],
  exports: [
    BaseTableComponent,

  ]
})
export class BaseTableModule { }
