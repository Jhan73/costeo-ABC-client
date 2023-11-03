import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { INPUT_TYPE } from 'src/app/enums/input_type.enum';
import { TABLE_ACTION } from 'src/app/enums/table-action.enum';
import { Activity } from 'src/app/models/activity.model';
import { TableAction } from 'src/app/models/table-action.model';
import { TableColumn } from 'src/app/models/table-column.model';
import { TableConfig } from 'src/app/models/table-config.model';
import { BaseFormModalComponent } from 'src/app/shared/base/components/base-form-modal/base-form-modal.component';
import { MatDialog } from '@angular/material/dialog'
import { ModalInput } from 'src/app/models/modalInput.model';
import { DialogService } from 'src/app/shared/base/services/dialog.service';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/shared/base/services/data.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];
export interface ActivityTest {
  code: string;
  name: string;
  description: string;
}
const ACTIVITIES: ActivityTest [] = [
  {code: 'A0001', name: 'Actividad1', description: 'Actividad 1'},
  {code: 'A0002', name: 'Actividad2', description: 'Actividad 2'},
  {code: 'A0003', name: 'Actividad3', description: 'Actividad 3'},
  {code: 'A0004', name: 'Actividad4', description: 'Actividad 4'},
  {code: 'A0005', name: 'Actividad5', description: 'Actividad 5'},
  {code: 'A0006', name: 'Actividad6', description: 'Actividad 6'},
  {code: 'A0007', name: 'Actividad7', description: 'Actividad 7'},
  {code: 'A0008', name: 'Actividad8', description: 'Actividad 8'},
  {code: 'A0009', name: 'Actividad9', description: 'Actividad 9'},
  {code: 'A00010', name: 'Actividad0', description: 'Actividad 10'},
  {code: 'A00011', name: 'Actividad1', description: 'Actividad 11'},
]


@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {

  //============ TABLE =================
  tableColumns: TableColumn[] = [];
  dataSource: Array<ActivityTest> = ACTIVITIES;
  tableConfig: TableConfig = {
    showAction: true,
    showFilter: true,
  }
  isLoadingTable: boolean = true
  statusTableRowFrom: string = 'INVALID'

  //------------------------------------
  //============ MODAL =================
  modalFormGroup: FormGroup
  fields: ModalInput[] = [
    {inputType: INPUT_TYPE.TEXT, label: 'Codigo', controlName: 'code'},
    {inputType: INPUT_TYPE.TEXT, label: 'Nombre', controlName: 'name'},
    {inputType: INPUT_TYPE.TEXTAREA, label: 'Descripción', controlName: 'description'},
  ]
  //------------------------------------
  constructor (private matDialog: MatDialog, private dialogService: DialogService, private formBuilder: FormBuilder, 
    private dataService: DataService){
    this.modalFormGroup = new FormGroup({})
    this.defineModalFormGroup()
  }
  
  ngOnInit(): void {
    this.setColums()
    this.isLoadingTable = false
    this.onSave()
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
        this.dataSource[index].description = data.description;
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
    this.dialogService.openFormModal({title: 'Actividad', fields: this.fields, formGroup: this.modalFormGroup}).afterClosed().subscribe( res => {console.log('👨‍🎨', res)})
  }
  //------------------------------------
}

