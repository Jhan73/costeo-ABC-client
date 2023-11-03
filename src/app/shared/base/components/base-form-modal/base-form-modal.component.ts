import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { INPUT_TYPE } from 'src/app/enums/input_type.enum';
import { ModalData } from 'src/app/models/modal-data.model';
import { ModalInput } from 'src/app/models/modalInput.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-base-form-modal',
  templateUrl: './base-form-modal.component.html',
  styleUrls: ['./base-form-modal.component.scss']
})
export class BaseFormModalComponent {

  inputTypeControl = INPUT_TYPE;
  formGroup: FormGroup;
  fields: ModalInput[] = []

  constructor(@Inject(MAT_DIALOG_DATA) public data: ModalData, private dataService: DataService,
   private dialogRef: MatDialogRef<BaseFormModalComponent>){
    this.fields = data.fields
    this.formGroup = data.formGroup
  }

  onSubmit(){
    console.log('🧜‍♂️', this.formGroup.value)
    // this.formGroup.reset();
    this.dataService.formData.emit(this.formGroup.value)
    this.formGroup.markAsPristine();
    this.dialogRef.close();
  }
  onCancel(){
    this.formGroup.reset();
    this.formGroup.markAsPristine();
    this.dialogRef.close();
  }

}
