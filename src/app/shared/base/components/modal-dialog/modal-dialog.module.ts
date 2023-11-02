import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDialogComponent } from './modal-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    ModalDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
  ]
})
export class ModalDialogModule { }
