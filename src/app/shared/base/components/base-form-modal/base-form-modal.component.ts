import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { INPUT_TYPE } from 'src/app/enums/input_type.enum';

@Component({
  selector: 'app-base-form-modal',
  templateUrl: './base-form-modal.component.html',
  styleUrls: ['./base-form-modal.component.scss']
})
export class BaseFormModalComponent {

  inputTypeControl = INPUT_TYPE;
  formGroup: FormGroup;
  @Input() rowFormGroup!: (item: any) => FormGroup


  fields: {inputType: INPUT_TYPE, label: string, nameControl: string}[] = [
    {inputType: INPUT_TYPE.TEXT, label: 'Texto', nameControl: 'textControl'},
    {inputType: INPUT_TYPE.NUMBER, label: 'Numero', nameControl: 'numberControl'},
    {inputType: INPUT_TYPE.DATE, label: 'Fecha', nameControl: 'dateControl'},
    {inputType: INPUT_TYPE.RADIO, label: 'Radio', nameControl: 'radioControl'},
    {inputType: INPUT_TYPE.TOGGLE, label: 'Togle', nameControl: 'toggleControl'},
    {inputType: INPUT_TYPE.SELECT, label: 'Seleccionable', nameControl: 'selectControl'},
    {inputType: INPUT_TYPE.TEXTAREA, label: 'Area de texto', nameControl: 'textareaControl'},
  ]

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder){
    this.formGroup = new FormGroup({})
    this.formGroup = this.formBuilder.group({
      textControl:['', Validators.required],
      numberControl:[''],
      dateControl:[''],
      radioControl:[''],
      toggleControl:[''],
      selectControl:[''],
      textareaControl:[''],
    })
  }







}
