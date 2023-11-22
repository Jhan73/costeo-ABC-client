import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { INPUT_TYPE } from 'src/app/enums/input_type.enum';
import { TABLE_ACTION } from 'src/app/enums/table-action.enum';
import { ModalInput } from 'src/app/models/modalInput.model';
import { Resource } from 'src/app/models/resource.model';
import { TableAction } from 'src/app/models/table-action.model';
import { TableColumn } from 'src/app/models/table-column.model';
import { TableConfig } from 'src/app/models/table-config.model';
import { DataService } from 'src/app/shared/base/services/data.service';
import { DialogService } from 'src/app/shared/base/services/dialog.service';

const RESOURCES: Resource[] = [
  {code: 'R00001', name: 'Recurso', value: 454, cuantity: 5, unit: 'paquete', type: 'Personal', description: 'Recurso'}
]

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  //============ TABLE =================
  tableColumns: TableColumn[] = [];
  dataSource: Array<Resource> = RESOURCES;
  tableConfig: TableConfig = {
    showAction: true,
    showFilter: false,
    showPaginator: true,
    showAddButton: true,
  }
  isLoadingTable: boolean = true
  statusTableRowFrom: string = 'INVALID'

  //------------------------------------
  //============ MODAL =================
  resourceFormButtonText: string = 'Guardar'
  modalFormGroup: FormGroup
  fields: ModalInput[] = [
    {inputType: INPUT_TYPE.TEXT, label: 'Codigo', controlName: 'code'},
    {inputType: INPUT_TYPE.TEXT, label: 'Nombre', controlName: 'name'},
    {inputType: INPUT_TYPE.NUMBER, label: 'Valor', controlName: 'value'},
    {inputType: INPUT_TYPE.NUMBER, label: 'Cantidad', controlName: 'cuantity'},
    {inputType: INPUT_TYPE.TEXT, label: 'Unidad', controlName: 'unit'},
    {inputType: INPUT_TYPE.TEXT, label: 'Tipo', controlName: 'type'},
    {inputType: INPUT_TYPE.TEXTAREA, label: 'Descripción', controlName: 'description'},
  ]
  //------------------------------------
  constructor(private dialog: MatDialog, private dialogService: DialogService, private formBuilder: FormBuilder,
    private dataService: DataService) {
    this.modalFormGroup = new FormGroup({})
    this.defineModalFormGroup()
  }

  ngOnInit(): void {
    this.setColums()
    this.onSave()
  }
  ngOnDestroy() {
    this.dataService.formData.unsubscribe();
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
  onEditRow(resource: Resource, id: number){
    this.openModal()
    console.log('👨‍👨‍👧‍👧', 'Editando')
    this.modalFormGroup.patchValue({
      code: resource.code,
      name: resource.name,
      value: resource.value,
      cuantity: resource.cuantity,
      unit: resource.unit,
      type: resource.type,
      description: resource.description,
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
      { def: 'code', title: 'Código', dataKey: 'code' },
      { def: 'name', title: 'Producto', dataKey: 'name' },
      { def: 'value', title: 'Valor de adquisición', dataKey: 'value' },
      { def: 'cuantity', title: 'Cantidad', dataKey: 'cuantity' },
      { def: 'unit', title: 'Unidad', dataKey: 'unit' },
      { def: 'type', title: 'Tipo', dataKey: 'type' },
      { def: 'description', title: 'Descripción', dataKey: 'description' },
    ]
  }
  //------------------------------------
  //============ MODAL =================
  defineModalFormGroup(){
    this.modalFormGroup = this.formBuilder.group({
      code:['', Validators.required],
      name:['', Validators.required],
      value:['', Validators.required],
      cuantity:['', Validators.required],
      unit:['', Validators.required],
      type:['', Validators.required],
      description:['', Validators.required],
    })
  }

  openModal(){
    this.dialogService.openFormModal({title: 'Recurso', buttonText: this.resourceFormButtonText, fields: this.fields, formGroup: this.modalFormGroup}).afterClosed().subscribe( res => {console.log('👨‍🎨', res)})
  }
  //------------------------------------
}
