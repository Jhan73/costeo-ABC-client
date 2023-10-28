import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

export interface PeriodicElement {
  indirectcost: string;
  position: number;
  distributioncriteria: string;
  ressourcetype: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, indirectcost: 'CI1', distributioncriteria: 'CR1', ressourcetype: 1},
  {position: 2, indirectcost: 'CI2', distributioncriteria: 'CR2', ressourcetype: 1},
  {position: 3, indirectcost: 'CI3', distributioncriteria: 'CR3', ressourcetype: 1},
  {position: 4, indirectcost: 'CI4', distributioncriteria: 'CR4', ressourcetype: 2},
  {position: 5, indirectcost: 'CI5', distributioncriteria: 'CR5', ressourcetype: 2},
  {position: 6, indirectcost: 'CI6', distributioncriteria: 'CR6', ressourcetype: 2},
  {position: 7, indirectcost: 'CI7', distributioncriteria: 'CR7', ressourcetype: 2},
  {position: 8, indirectcost: 'CI8', distributioncriteria: 'CR8', ressourcetype: 3},
  {position: 9, indirectcost: 'CI9', distributioncriteria: 'CR9', ressourcetype: 3},
  {position: 10, indirectcost: 'CI10', distributioncriteria: 'CR10', ressourcetype: 3},
];

const COLUMNS_SCHEMA = [
  {
      key: "indirectcost",
      type: "text",
      label: "Costo Indirecto"
  },
  {
      key: "distributioncriteria",
      type: "text",
      label: "Criterio de Reparto"
  },
  {
      key: "ressourcetype",
      type: "number",
      label: "Tipo de Recurso"
  }
]

@Component({
  selector: 'app-table-ic-dc',
  templateUrl: './table-ic-dc.component.html',
  styleUrls: ['./table-ic-dc.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatFormFieldModule, FormsModule],
})
export class TableIcDcComponent {
  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  dataSource: any = ELEMENT_DATA;
  columnsSchema: any = COLUMNS_SCHEMA;
}
