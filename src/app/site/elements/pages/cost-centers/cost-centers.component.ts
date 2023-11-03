import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { INPUT_TYPE } from 'src/app/enums/input_type.enum';
import { TABLE_ACTION } from 'src/app/enums/table-action.enum';
import { ModalInput } from 'src/app/models/modalInput.model';
import { TableAction } from 'src/app/models/table-action.model';
import { TableColumn } from 'src/app/models/table-column.model';
import { TableConfig } from 'src/app/models/table-config.model';
import { ModalDialogComponent } from 'src/app/shared/base/components/modal-dialog/modal-dialog.component';
import { DataService } from 'src/app/shared/base/services/data.service';
import { DialogService } from 'src/app/shared/base/services/dialog.service';

export interface CostCenter {
  code: string;
  name: string;
  description: string;
}
const COSTCENTERS: CostCenter [] = [
  {code: 'CC0001', name: 'Centro de costo1', description: 'centro de costo 1'},
  {code: 'CC0002', name: 'Centro de costo2', description: 'centro de costo 2'},
  {code: 'CC0003', name: 'Centro de costo3', description: 'centro de costo 3'},
  {code: 'CC0004', name: 'Centro de costo4', description: 'centro de costo 4'},
  {code: 'CC0005', name: 'Centro de costo5', description: 'centro de costo 5'},
  {code: 'CC0006', name: 'Centro de costo6', description: 'centro de costo 6'},
  {code: 'CC0007', name: 'Centro de costo7', description: 'centro de costo 7'},
  {code: 'CC0008', name: 'Centro de costo8', description: 'centro de costo 8'},
  {code: 'CC0009', name: 'Centro de costo9', description: 'centro de costo 9'},
  {code: 'CC00010', name: 'Centro de costo0', description: 'centro de costo 10'},
  {code: 'CC00011', name: 'Centro de costo1', description: 'centro de costo 11'},
]

@Component({
  selector: 'app-cost-centers',
  templateUrl: './cost-centers.component.html',
  styleUrls: ['./cost-centers.component.scss']
})
export class CostCentersComponent implements OnInit {
  //============ TABLE =================
  tableColumns: TableColumn[] = [];
  dataSource: Array<CostCenter> = COSTCENTERS;
  tableConfig: TableConfig = {
    showAction: true,
    showFilter: true,
    showPaginator: true,
    showAddButton: true,
  }
  isLoadingTable: boolean = true
  statusTableRowFrom: string = 'INVALID'

  //------------------------------------

  modalFormGroup: FormGroup
  fields: ModalInput[] = [
    {inputType: INPUT_TYPE.TEXT, label: 'Codigo', controlName: 'code'},
    {inputType: INPUT_TYPE.TEXT, label: 'Nombre', controlName: 'name'},
    {inputType: INPUT_TYPE.TEXTAREA, label: 'Descripción', controlName: 'description'},
  ]

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
  onEditRow(costCenter: CostCenter, id: number){
    this.openModal()
    console.log('👨‍👨‍👧‍👧', 'Editando',costCenter)
    this.modalFormGroup.patchValue({
      code: costCenter.code,
      name: costCenter.name,
      description: costCenter.description,
    })

  }
  onSave(){
    this.dataService.formData.subscribe(data => {
      const index = this.dataSource.findIndex(cc => {
        return cc.code === data.code
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
  defineModalFormGroup(){
    this.modalFormGroup = this.formBuilder.group({
      code:['', Validators.required],
      name:['', Validators.required],
      description:['', Validators.required],
    })
  }

  openModal(){
    this.dialogService.openFormModal({title: 'Centro de costo', fields: this.fields, formGroup: this.modalFormGroup}).afterClosed().subscribe( res => {console.log('👨‍🎨', res)})
  }
  

}
