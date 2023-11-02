import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from '../components/modal-dialog/modal-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private matDialog: MatDialog) { }

  openDialog(data: {title: string, content: string}){
    this.matDialog.open(ModalDialogComponent, {data})
  }
  openFormDialog(template: TemplateRef<any>){
    return this.matDialog.open(ModalDialogComponent, {data: template})
  }
}
