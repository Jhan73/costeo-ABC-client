import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TableColumn } from 'src/app/models/table-column.model';
import { TableConfig } from 'src/app/models/table-config.model';
import { ModalDialogComponent } from 'src/app/shared/base/components/modal-dialog/modal-dialog.component';
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
  }
  isLoadingTable: boolean = true
  statusTableRowFrom: string = 'INVALID'

  //------------------------------------
//************************************************** */

title = 'dialog-reutilizable';

  formGroup: FormGroup = new FormGroup({
    name: new FormControl(),
    lastname: new FormControl(),
  });
  private matDialogRef!: MatDialogRef<ModalDialogComponent>;
  
  constructor(private dialogService: DialogService){
    
  }
  openDialogWithTemplate(template: TemplateRef<any>) {
    this.matDialogRef = this.dialogService.openFormDialog(
      template
    );
    
    this.matDialogRef.afterClosed().subscribe((res) => {
      console.log('Dialog With Template Close', res);
      this.formGroup.reset();
    });
  }
  guardar() {
    console.log(this.formGroup.value);
    this.formGroup.reset();
    this.matDialogRef.close();
  }

  ngOnInit(): void {
    this.setColums()
  }


  setColums() {
    this.tableColumns = [
      { def: 'code', title: 'Código', dataKey: 'code' },
      { def: 'name', title: 'Producto', dataKey: 'name' },
      { def: 'productoLine', title: 'Linea de producto', dataKey: 'productoLine' },
      { def: 'number', title: 'Numero', dataKey: 'number' },
      { def: 'description', title: 'Descripción', dataKey: 'description' },
    ]
  }


  openDialog(){
    this.dialogService.openDialog({title: 'Titulito', content: 'Contenido'})
  }

}
