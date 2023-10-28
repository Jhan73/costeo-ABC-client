import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseFormModalComponent } from './base-form-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BaseFormModalComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,

  ],
  exports: [
    BaseFormModalComponent,
  ]
})
export class BaseFormModalModule { }
