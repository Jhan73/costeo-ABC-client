import {Component} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {NgFor} from '@angular/common';

export interface OperativeIndirectCost {
  operativeindirectcost: string;
  criteria: string,
  position: number;
}

interface Actividad{
  tag : string;
}

const ELEMENT_DATA: OperativeIndirectCost[] = [
  {position: 1, operativeindirectcost: 'CIO1', criteria: 'CR1'},
  {position: 1, operativeindirectcost: 'CIO2', criteria: 'CR2'},
  {position: 1, operativeindirectcost: 'CIO3', criteria: 'CR3'},
  {position: 1, operativeindirectcost: 'CIO4', criteria: 'CR4'},
  {position: 1, operativeindirectcost: 'CIO5', criteria: 'CR5'},
  {position: 1, operativeindirectcost: 'CIO6', criteria: 'CR6'},
];

const COLUMNS_SCHEMA = [
  {
      key: "indirectcost",
      type: "text",
      label: "Costo Indirecto Estratégico"
  },
  {
      key: "distributioncriteria",
      type: "text",
      label: "Criterio de Reparto"
  },
  {
    key: "A1",
    type: "number",
    label: "A1"
  },
  {
    key: "A2",
    type: "number",
    label: "A2"
  },
  {
    key: "A3",
    type: "number",
    label: "A3"
  },
  {
    key: "A4",
    type: "number",
    label: "A4"
  },
  {
    key: "A5",
    type: "number",
    label: "A5"
  },
  {
    key: "A6",
    type: "number",
    label: "A6"
  },
  {
    key: "A7",
    type: "number",
    label: "A6"
  },
  {
    key: "A8",
    type: "number",
    label: "A6"
  },
  {
    key: "A9",
    type: "number",
    label: "A6"
  },
  {
    key: "A10",
    type: "number",
    label: "A6"
  },
]

@Component({
  selector: 'app-table-oic-distribution',
  templateUrl: './table-oic-distribution.component.html',
  styleUrls: ['./table-oic-distribution.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatFormFieldModule, FormsModule, MatSelectModule, NgFor],
})
export class TableOicDistributionComponent {
  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  dataSource: any = ELEMENT_DATA;
  columnsSchema: any = COLUMNS_SCHEMA;

  actividades:Actividad[] = [
    {tag: 'A1'},
    {tag: 'A2'},
    {tag: 'A3'},
    {tag: 'A4'},
    {tag: 'A5'},
    {tag: 'A6'},
    {tag: 'A7'},
    {tag: 'A8'},
    {tag: 'A9'},
    {tag: 'A10'},
  ];
}

