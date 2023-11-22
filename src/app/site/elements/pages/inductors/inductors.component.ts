import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { INPUT_TYPE } from 'src/app/enums/input_type.enum';
import { TABLE_ACTION } from 'src/app/enums/table-action.enum';
import { Inductor } from 'src/app/models/inductor.model';
import { ModalInput } from 'src/app/models/modalInput.model';
import { TableAction } from 'src/app/models/table-action.model';
import { TableColumn } from 'src/app/models/table-column.model';
import { TableConfig } from 'src/app/models/table-config.model';
import { DataService } from 'src/app/shared/base/services/data.service';
import { DialogService } from 'src/app/shared/base/services/dialog.service';
import { CommonService } from 'src/app/site/services/common.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-inductors',
  templateUrl: './inductors.component.html',
  styleUrls: ['./inductors.component.scss']
})
export class InductorsComponent {
  //============ TABLE =================
  tableColumns: TableColumn[] = [];
  dataSource: Array<Inductor> = [];
  tableConfig: TableConfig = {
    showAction: true,
    showFilter: true,
    showPaginator: true,
    showAddButton: true,
  }
  isLoadingTable: boolean = true
  statusTableRowFrom: string = 'INVALID'
  isIductorUpdate: boolean = false
  inductorButtonText: string = 'Guardar'

  //------------------------------------
  //============ MODAL =================
  private formDataSubscription: Subscription = new Subscription();

  modalFormGroup: FormGroup
  fields: ModalInput[] = [
    {inputType: INPUT_TYPE.TEXT, label: 'Codigo', controlName: 'code'},
    {inputType: INPUT_TYPE.TEXT, label: 'Nombre', controlName: 'name'},
    {inputType: INPUT_TYPE.TEXTAREA, label: 'Descripción', controlName: 'description'},
  ]

  //------------------------------------
  constructor (private matDialog: MatDialog, private dialogService: DialogService, private formBuilder: FormBuilder, 
    private dataService: DataService, private snackBar: MatSnackBar, private commonService: CommonService){
    this.modalFormGroup = new FormGroup({})
    this.defineModalFormGroup()
  }
  
  ngOnInit(): void {
    this.setColums()
    this.isLoadingTable = false
    this.loadInductors()
    this.subscribeToFormData();
  }
  ngOnDestroy() {
    this.dataService.formData.unsubscribe();
    // Desuscribirse al destruir el componente
    this.formDataSubscription.unsubscribe();
  }

  private getFormFields(){

  }
  private loadInductors(){
    this.commonService.getAll('/maintenance/inductors').subscribe({
      next: rest => {
        this.dataSource = rest
        console.log('Espero: ', this.dataSource)
      }
    })
  }
  subscribeToFormData() {
    this.formDataSubscription = this.dataService.formData.subscribe(data => {
      console.log('Form Data: ', data);
      this.onSave(data);
    });
  }

  onTableAction(tableAction: TableAction){
    switch (tableAction.action){
      case TABLE_ACTION.CREATE:
        this.onCreate()
        break;
      case TABLE_ACTION.EDIT:
        if (tableAction.rowIndex != undefined){
          this.onEditRow( tableAction.row, tableAction.rowIndex)
        }
        break;
      case TABLE_ACTION.DELETE:
        if (tableAction.rowIndex != undefined) {
          this.onDeleteRow(tableAction.row.id)
        }
        break;
    }
  }
  onCreate(){
    this.isIductorUpdate = false
    this.inductorButtonText = 'Guardar'
    this.openModal()
  }
  onEditRow(inductor: Inductor, id: number){
    this.isIductorUpdate = true
    this.inductorButtonText = 'Actualizar'
    this.openModal()
    console.log('👨‍👨‍👧‍👧', 'Editando',inductor, this.isIductorUpdate)
    this.modalFormGroup.patchValue({
      id: inductor.id,
      code: inductor.code,
      name: inductor.name,
      description: inductor.description,
    })

  }
  onSave(data: any){
    if(this.isIductorUpdate){
      console.log('Form Data Actualizando ', this.isIductorUpdate, data)
      this.commonService.update('/maintenance/inductors', data.id, data).subscribe({
        next: res => {
          console.log('Respuesta Back', res)
          this.loadInductors()
        }
      })
    } else {
      console.log('Form Data Nuevo ', this.isIductorUpdate, data)
      this.commonService.create('/maintenance/inductors', data).subscribe({
        next: res => {
          console.log('Respuesta Back', res)
          this.loadInductors()
        }
      })
    }
    this.modalFormGroup.reset()
    // this.dataService.formData.subscribe(data => {
    //   // const index = this.dataSource.findIndex(act => {
    //   //   return act.code === data.code
    //   // });

    //   // if (index !== -1) {
    //   //   this.dataSource[index].name = data.name;
    //   //   this.dataSource[index].description = data.description;
    //   // }
    //   console.log('Form Data: ', data)
    // })
  }
  onDeleteRow(id: number){
    console.log('🙎‍♂️', 'Eliminado'+id)
    // this.dataSource.splice(id, 1)
    // this.dataSource = this.dataSource.map(item => item)
    this.commonService.delete('/maintenance/inductors', id).subscribe({
      next: res =>{
        console.log('Respuesta Back', res)
        this.loadInductors()
      }
    })
    this.openSnackBar('Inductor Eliminada', 'Cerrar')
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }
  
  //============ TABLE =================
  setColums() {
    this.tableColumns = [
      { def: 'code', title: 'Código', dataKey: 'code'},
      { def: 'name', title: 'Inductor', dataKey: 'name' },
      { def: 'description', title: 'Descripción', dataKey: 'description' },
    ]
  }
  //------------------------------------
  //============ MODAL =================

  defineModalFormGroup() {
    this.modalFormGroup = this.formBuilder.group({
      id: [''],
      code:['', Validators.required],
      name:['', Validators.required],
      description:['', Validators.required],
    })
  }

  openModal(){
    this.dialogService.openFormModal({title: 'Inductor', buttonText: this.inductorButtonText, fields: this.fields, formGroup: this.modalFormGroup}).afterClosed().subscribe( res => {console.log('👨‍🎨', res)})
  }
  //------------------------------------
}
