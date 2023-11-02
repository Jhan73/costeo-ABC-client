import {Component} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {NgFor} from '@angular/common';

export interface SupportIndirectCost {
  supportindirectcost: string;
  criteria: string,
  position: number;
}

interface SIC{
  tag : string;
}

interface OIC{
  tag : string;
}

const ELEMENT_DATA: SupportIndirectCost[] = [
  {position: 1, supportindirectcost: 'CIA1', criteria: 'CR1'},
  {position: 1, supportindirectcost: 'CIA2', criteria: 'CR2'},
  {position: 1, supportindirectcost: 'CIA3', criteria: 'CR3'},
  {position: 1, supportindirectcost: 'CIA4', criteria: 'CR4'},
  {position: 1, supportindirectcost: 'CIA5', criteria: 'CR5'},
  {position: 1, supportindirectcost: 'CIA6', criteria: 'CR6'},
  {position: 1, supportindirectcost: 'CIA7', criteria: 'CR7'},
  {position: 1, supportindirectcost: 'CIA8', criteria: 'CR8'},
  {position: 1, supportindirectcost: 'CIA9', criteria: 'CR9'},
  {position: 1, supportindirectcost: 'CIA10', criteria: 'CR10'},
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
    key: "CIO1",
    type: "number",
    label: "CIO1"
  },
  {
    key: "CIO2",
    type: "number",
    label: "CIO2"
  },
  {
    key: "CIO3",
    type: "number",
    label: "CIO3"
  },
  {
    key: "CIO4",
    type: "number",
    label: "CIO4"
  },
  {
    key: "CIO5",
    type: "number",
    label: "CIO5"
  },
  {
    key: "CIO6",
    type: "number",
    label: "CIO6"
  },
]

@Component({
  selector: 'app-table-supic-distribution',
  templateUrl: './table-supic-distribution.component.html',
  styleUrls: ['./table-supic-distribution.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatFormFieldModule, FormsModule, MatSelectModule, NgFor],
})
export class TableSupicDistributionComponent {
  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  dataSource: any = ELEMENT_DATA;
  columnsSchema: any = COLUMNS_SCHEMA;

  operativeindirectcosts:OIC[] = [
    {tag: 'CIO1'},
    {tag: 'CIO2'},
    {tag: 'CIO3'},
    {tag: 'CIO4'},
    {tag: 'CIO5'},
    {tag: 'CIO6'}
  ];
}

