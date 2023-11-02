import {Component} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {NgFor} from '@angular/common';

export interface StrategicIndirectCost {
  strategicindirectcost: string;
  criteria: string,
  position: number;
}

interface SIC{
  tag : string;
}

interface OIC{
  tag : string;
}

const ELEMENT_DATA: StrategicIndirectCost[] = [
  {position: 1, strategicindirectcost: 'CIE1', criteria: 'CR1'},
  {position: 1, strategicindirectcost: 'CIE2', criteria: 'CR2'},
  {position: 1, strategicindirectcost: 'CIE3', criteria: 'CR3'},
  {position: 1, strategicindirectcost: 'CIE4', criteria: 'CR4'},
  {position: 1, strategicindirectcost: 'CIE5', criteria: 'CR5'},
  {position: 1, strategicindirectcost: 'CIE6', criteria: 'CR6'},
  {position: 1, strategicindirectcost: 'CIE7', criteria: 'CR7'},
  {position: 1, strategicindirectcost: 'CIE8', criteria: 'CR8'},
  {position: 1, strategicindirectcost: 'CIE9', criteria: 'CR9'},
  {position: 1, strategicindirectcost: 'CIE10', criteria: 'CR10'},
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
      key: "CIA1",
      type: "text",
      label: "CIA1"
  },
  {
    key: "CIA2",
    type: "number",
    label: "CIA2"
  },
  {
    key: "CIA3",
    type: "number",
    label: "CIA3"
  },
  {
    key: "CIA4",
    type: "number",
    label: "CIA4"
  },
  {
    key: "CIA5",
    type: "number",
    label: "CIA5"
  },
  {
    key: "CIA6",
    type: "number",
    label: "CIA6"
  },
  {
    key: "CIA7",
    type: "number",
    label: "CIA7"
  },
  {
    key: "CIA8",
    type: "number",
    label: "CIA8"
  },
  {
    key: "CIA9",
    type: "number",
    label: "CIA9"
  },
  {
    key: "CIA10",
    type: "number",
    label: "CIA10"
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
  selector: 'app-table-sic-distribution',
  templateUrl: './table-sic-distribution.component.html',
  styleUrls: ['./table-sic-distribution.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatFormFieldModule, FormsModule, MatSelectModule, NgFor],
})
export class TableSicDistributionComponent {
  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  dataSource: any = ELEMENT_DATA;
  columnsSchema: any = COLUMNS_SCHEMA;

  supportindirectcosts:SIC[] = [
    {tag:'CIA1'},
    {tag:'CIA2'},
    {tag:'CIA3'},
    {tag:'CIA4'},
    {tag:'CIA5'},
    {tag:'CIA6'},
    {tag:'CIA7'},
    {tag:'CIA8'},
    {tag:'CIA9'},
    {tag:'CIA10'}
  ];

  operativeindirectcosts:OIC[] = [
    {tag: 'CIO1'},
    {tag: 'CIO2'},
    {tag: 'CIO3'},
    {tag: 'CIO4'},
    {tag: 'CIO5'},
    {tag: 'CIO6'}
  ];
}
