import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BaseFormModalComponent } from '../components/base-form-modal/base-form-modal.component';
import { ModalData } from 'src/app/models/modal-data.model';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private matDialog: MatDialog) { }

  openFormModal(data: ModalData){
    return this.matDialog.open(BaseFormModalComponent, {
      width: '350px',
      data: data
    })
  }
}
