import { Component, OnInit } from '@angular/core';
import { TableColumn } from 'src/app/models/table-column.model';
import { TableConfig } from 'src/app/models/table-config.model';

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
      { def: 'name', title: 'Actividad', dataKey: 'name' },
      { def: 'description', title: 'Descripción', dataKey: 'description' },
    ]
  }

}
