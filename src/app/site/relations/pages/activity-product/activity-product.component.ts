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

export interface ElementTest {
  code: string;
  name: string;
}
const ACTIVITIES: ElementTest [] = [
  {code: 'A0001', name: 'Actividad1'},
  {code: 'A0002', name: 'Actividad2'},
  {code: 'A0003', name: 'Actividad3'},
  {code: 'A0004', name: 'Actividad4'},
  {code: 'A0005', name: 'Actividad5'},
  {code: 'A0006', name: 'Actividad6'},
  {code: 'A0007', name: 'Actividad7'},
  {code: 'A0008', name: 'Actividad8'},
  {code: 'A0009', name: 'Actividad9'},
  {code: 'A00010', name: 'Actividad10'},
  {code: 'A00011', name: 'Actividad11'},
]

const PRODUCTS: ElementTest [] = [
  {code: 'P0001', name: 'Producto1'},
  {code: 'P0002', name: 'Producto2'},
  {code: 'P0003', name: 'Producto3'},
  {code: 'P0004', name: 'Producto4'},
  {code: 'P0005', name: 'Producto5'},
  {code: 'P0006', name: 'Producto6'},
  {code: 'P0007', name: 'Producto7'},
]

@Component({
  selector: 'app-activity-product',
  templateUrl: './activity-product.component.html',
  styleUrls: ['./activity-product.component.scss']
})
export class ActivityProductComponent {
  
  //============ TABLE 1 =================
    tableColumns: TableColumn[] = [];
    dataSource: Array<ElementTest> = ACTIVITIES;
    tableConfig: TableConfig = {
      showAction: false,
      showFilter: false,
    }
    isLoadingTable: boolean = true
    statusTableRowFrom: string = 'INVALID'

    //------------------------------------
    //============ MODAL =================
    activityProductFormButtonText: string = 'Guardar'
    modalFormGroup: FormGroup
    fields: ModalInput[] = [
      {inputType: INPUT_TYPE.TEXT, label: 'Codigo', controlName: 'code'},
      {inputType: INPUT_TYPE.TEXT, label: 'Nombre', controlName: 'name'},
    ]
    //------------------------------------
    constructor (private matDialog: MatDialog, private dialogService: DialogService, private formBuilder: FormBuilder, 
      private dataService: DataService){
      this.modalFormGroup = new FormGroup({})
      this.modalFormGroup2 = new FormGroup({})
      this.defineModalFormGroup()
    }
    ngOnDestroy() {
      this.dataService.formData.unsubscribe();
    }

    private getFormFields(){

    }
    private loadValuesFormFields(){

    }

    onSubmit(){

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
            this.onDeleteRow(tableAction.rowIndex)
          }
          break;
      }
    }
    onCreate(){
      this.openModal()
    }
    onEditRow(activity: Activity, id: number){
      this.openModal()
      console.log('👨‍👨‍👧‍👧', 'Editando',activity)
      this.modalFormGroup.patchValue({
        code: activity.code,
        name: activity.name,
        description: activity.description,
      })

    }
    onSave(){
      this.dataService.formData.subscribe(data => {
        const index = this.dataSource.findIndex(act => {
          return act.code === data.code
        });

        if (index !== -1) {
          this.dataSource[index].name = data.name;
        }
      })
    }
    onDeleteRow(id: number){
      console.log('🙎‍♂️', 'Eliminado'+id)
      this.dataSource.splice(id, 1)
      this.dataSource = this.dataSource.map(item => item)
    }
    
    //============ TABLE =================
    setColums() {
      this.tableColumns = [
        { def: 'code', title: 'Código', dataKey: 'code'},
        { def: 'name', title: 'Actividad', dataKey: 'name' },
      ]
      this.tableColumns2 = [
        { def: 'code', title: 'Código', dataKey: 'code'},
        { def: 'name', title: 'Producto', dataKey: 'name' },
      ]
    }
    //------------------------------------
    //============ MODAL =================

    defineModalFormGroup() {
      this.modalFormGroup = this.formBuilder.group({
        code:['', Validators.required],
        name:['', Validators.required],
      })
    }

    openModal(){
      this.dialogService.openFormModal({title: 'Actividad', buttonText: this.activityProductFormButtonText, fields: this.fields, formGroup: this.modalFormGroup}).afterClosed().subscribe( res => {console.log('👨‍🎨', res)})
    }
    //------------------------------------
  //------------------------------------


  //============ TABLE 2 =================
  tableColumns2: TableColumn[] = [];
  dataSource2: Array<ElementTest> = PRODUCTS;
  tableConfig2: TableConfig = {
    showAction: false,
    showFilter: false,
  }
  isLoadingTable2: boolean = true
  statusTableRowFrom2: string = 'INVALID'

  //------------------------------------
  //============ MODAL =================
  modalFormGroup2: FormGroup
  fields2: ModalInput[] = [
    {inputType: INPUT_TYPE.TEXT, label: 'Codigo', controlName: 'code'},
    {inputType: INPUT_TYPE.TEXT, label: 'Nombre', controlName: 'name'},
  ]
  //------------------------------------
  
  ngOnInit(): void {
    this.setColums()
    this.isLoadingTable = false
    this.isLoadingTable2 = false
    this.onSave()
  }
//------------------------------------
}