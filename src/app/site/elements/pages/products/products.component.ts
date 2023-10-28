import { Component, OnInit } from '@angular/core';
import { TableColumn } from 'src/app/models/table-column.model';
import { TableConfig } from 'src/app/models/table-config.model';

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
}
