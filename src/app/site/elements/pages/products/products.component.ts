import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { INPUT_TYPE } from 'src/app/enums/input_type.enum';
import { TABLE_ACTION } from 'src/app/enums/table-action.enum';
import { ModalInput } from 'src/app/models/modalInput.model';
import { TableAction } from 'src/app/models/table-action.model';
import { TableColumn } from 'src/app/models/table-column.model';
import { TableConfig } from 'src/app/models/table-config.model';
import { ModalDialogComponent } from 'src/app/shared/base/components/modal-dialog/modal-dialog.component';
import { DataService } from 'src/app/shared/base/services/data.service';
import { DialogService } from 'src/app/shared/base/services/dialog.service';

export interface Product{
  code: string;
  name: string;
  productoLine: string;
  number: number;
  description: string;
}

const PRODUCTS: Product[]= [
  {code: 'P0001',name: 'Producto1', productoLine: 'linea de producto', number: 1, description: 'Produto 1'},
  {code: 'P0001',name: 'Producto2', productoLine: 'linea de producto', number: 1, description: 'Produto 2'},
  {code: 'P0001',name: 'Producto3', productoLine: 'linea de producto', number: 1, description: 'Produto 3'},
  {code: 'P0001',name: 'Producto4', productoLine: 'linea de producto', number: 1, description: 'Produto 4'},
  {code: 'P0001',name: 'Producto5', productoLine: 'linea de producto', number: 1, description: 'Produto 5'},
  {code: 'P0001',name: 'Producto6', productoLine: 'linea de producto', number: 1, description: 'Produto 6'},
  {code: 'P0001',name: 'Producto7', productoLine: 'linea de producto', number: 1, description: 'Produto 7'},
  {code: 'P0001',name: 'Producto8', productoLine: 'linea de producto', number: 1, description: 'Produto 8'},
  {code: 'P0001',name: 'Producto9', productoLine: 'linea de producto', number: 1, description: 'Produto 9'},
  {code: 'P0001',name: 'Producto0', productoLine: 'linea de producto', number: 1, description: 'Produto 10'},
  {code: 'P0001',name: 'Producto1', productoLine: 'linea de producto', number: 1, description: 'Produto 11'},
]

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  //============ TABLE =================
  tableColumns: TableColumn[] = [];
  dataSource: Array<Product> = PRODUCTS;
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
  productFormButtonText: string = 'Guardar'
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
  onEditRow(product: Product, id: number){
    this.openModal()
    console.log('👨‍👨‍👧‍👧', 'Editando',product)
    this.modalFormGroup.patchValue({
      code: product.code,
      name: product.name,
      productLine: product.productoLine,
      number: product.number,
      description: product.description,
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
      { def: 'productLine', title: 'Linea de producto', dataKey: 'productLine' },
      { def: 'number', title: 'Numero', dataKey: 'number' },
      { def: 'description', title: 'Descripción', dataKey: 'description' },
    ]
  }
  //------------------------------------
  //============ MODAL =================

  defineModalFormGroup() {
    this.modalFormGroup = this.formBuilder.group({
      code:['', Validators.required],
      name:['', Validators.required],
      productLine: ['', Validators.required],
      number: ['', Validators.required],
      description:['', Validators.required],
    })
  }

  openModal(){
    this.dialogService.openFormModal({title: 'Producto', buttonText: this.productFormButtonText, fields: this.fields, formGroup: this.modalFormGroup}).afterClosed().subscribe( res => {console.log('👨‍🎨', res)})
  }
  //------------------------------------

}
