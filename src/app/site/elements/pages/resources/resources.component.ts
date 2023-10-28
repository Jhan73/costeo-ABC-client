import { Component, OnInit } from '@angular/core';
import { TableColumn } from 'src/app/models/table-column.model';
import { TableConfig } from 'src/app/models/table-config.model';

export interface Resource {
  code: string;
  name: string;
  value: number;
  cuantity: number;
  unit: string;
  type: string;
  description: string;
}
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
      { def: 'value', title: 'Valor de adquisición', dataKey: 'value' },
      { def: 'cuantity', title: 'Cantidad', dataKey: 'cuantity' },
      { def: 'unit', title: 'Unidad', dataKey: 'unit' },
      { def: 'type', title: 'Tipo', dataKey: 'type' },
      { def: 'description', title: 'Descripción', dataKey: 'description' },
    ]
  }

}
