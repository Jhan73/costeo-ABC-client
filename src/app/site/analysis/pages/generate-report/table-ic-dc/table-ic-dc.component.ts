import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {NgFor} from '@angular/common';

export interface IndirectCostDistributionCriteria {
  indirectcost: string;
  position: number;
}

interface DC{
  tag : string;
}

interface RT{
  tag : string;
}

const ELEMENT_DATA: IndirectCostDistributionCriteria[] = [
  {position: 1, indirectcost: 'CI1'},
  {position: 2, indirectcost: 'CI2'},
  {position: 3, indirectcost: 'CI3'},
  {position: 4, indirectcost: 'CI4'},
  {position: 5, indirectcost: 'CI5'},
  {position: 6, indirectcost: 'CI6'},
  {position: 7, indirectcost: 'CI7'},
  {position: 8, indirectcost: 'CI8'},
  {position: 9, indirectcost: 'CI9'},
  {position: 10, indirectcost: 'CI10'},
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
  imports: [MatTableModule, MatFormFieldModule, FormsModule, MatSelectModule, NgFor],
})
export class TableIcDcComponent {
  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  dataSource: any = ELEMENT_DATA;
  columnsSchema: any = COLUMNS_SCHEMA;

  distributioncriterias:DC[] = [
    {tag:'CR1'},
    {tag:'CR2'},
    {tag:'CR3'},
    {tag:'CR4'},
    {tag:'CR5'},
    {tag:'CR6'},
    {tag:'CR7'},
    {tag:'CR8'},
    {tag:'CR9'},
    {tag:'CR10'}
  ];

  ressourcetypes:RT[] = [
    {tag: 'Tipo 1'},
    {tag: 'Tipo 2'},
    {tag: 'Tipo 3'},
    {tag: 'Tipo 4'},
    {tag: 'Tipo 5'},
    {tag: 'Tipo 6'}
  ]

}
