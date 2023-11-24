import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { INPUT_TYPE } from 'src/app/enums/input_type.enum';
import { TABLE_ACTION } from 'src/app/enums/table-action.enum';
import { Activity } from 'src/app/models/activity.model';
import { TableAction } from 'src/app/models/table-action.model';
import { TableColumn } from 'src/app/models/table-column.model';
import { TableConfig } from 'src/app/models/table-config.model';
import { MatDialog } from '@angular/material/dialog'
import { ModalInput } from 'src/app/models/modalInput.model';
import { DialogService } from 'src/app/shared/base/services/dialog.service';
import { DataService } from 'src/app/shared/base/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from 'src/app/site/services/common.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent {

  //============ TABLE =================
  tableColumns: TableColumn[] = [];
  dataSource: Array<Activity> = [];
  tableConfig: TableConfig = {
    showAction: true,
    showFilter: true,
    showPaginator: true,
    showAddButton: true,
  }
  isLoadingTable: boolean = true
  statusTableRowFrom: string = 'INVALID'
  isActivityUpdate: boolean = false
  activityButtonText: string = 'Guardar'
  
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
    this.loadActivities()
    this.subscribeToFormData();
  }
  ngOnDestroy() {
    this.dataService.formData.unsubscribe();
    this.formDataSubscription.unsubscribe();
  }

  private getFormFields(){

  }
  private loadActivities(){
    this.commonService.getAll('/maintenance/activities').subscribe({
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
  private loadValuesFormFields(){

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
    this.isActivityUpdate = false
    this.activityButtonText = 'Guardar'
    this.openModal()
  }
  onEditRow(activity: Activity, id: number){
    this.isActivityUpdate = true
    this.activityButtonText = 'Actualizar'
    this.openModal()
    console.log('👨‍👨‍👧‍👧', 'Editando',activity, this.isActivityUpdate)
    this.modalFormGroup.patchValue({
      id: activity.id,
      code: activity.code,
      name: activity.name,
      description: activity.description,
    })

  }
  onSave(data: any){
    if(this.isActivityUpdate){
      console.log('Form Data Actualizando ', this.isActivityUpdate, data)
      this.commonService.update('/maintenance/activities', data.id, data).subscribe({
        next: res => {
          console.log('Respuesta Back', res)
          this.loadActivities()
        }
      })
    } else {
      console.log('Form Data Nuevo ', this.isActivityUpdate, data)
      this.commonService.create('/maintenance/activities', data).subscribe({
        next: res => {
          console.log('Respuesta Back', res)
          this.loadActivities()
        }
      })
    }
    this.modalFormGroup.reset()
  }
  onDeleteRow(id: number){
    console.log('🙎‍♂️', 'Eliminado'+id)
    // this.dataSource.splice(id, 1)
    // this.dataSource = this.dataSource.map(item => item)
    this.commonService.delete('/maintenance/activities', id).subscribe({
      next: res =>{
        console.log('Respuesta Back', res)
        this.loadActivities()
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
      { def: 'name', title: 'Actividad', dataKey: 'name' },
      { def: 'description', title: 'Descripción', dataKey: 'description' },
    ]
  }
  //------------------------------------
  //============ MODAL =================

  defineModalFormGroup() {
    this.modalFormGroup = this.formBuilder.group({
      code:['', Validators.required],
      name:['', Validators.required],
      description:['', Validators.required],
    })
  }

  openModal(){
    this.dialogService.openFormModal({title: 'Actividad', buttonText: this.activityButtonText, fields: this.fields, formGroup: this.modalFormGroup}).afterClosed().subscribe( res => {console.log('👨‍🎨', res)})
  }
  //------------------------------------
}

