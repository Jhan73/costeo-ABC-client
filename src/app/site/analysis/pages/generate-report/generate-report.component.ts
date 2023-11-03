import { Component } from '@angular/core';
import { TableIcDcComponent } from './table-ic-dc/table-ic-dc.component';
import { TableSicDistributionComponent } from './table-sic-distribution/table-sic-distribution.component';
import { TableSupicDistributionComponent } from './table-supic-distribution/table-supic-distribution.component';
import { TableOicDistributionComponent } from './table-oic-distribution/table-oic-distribution.component';

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.scss']
})
export class GenerateReportComponent {
  /*
  Valores del stage para visibilidad
  0: "procesando"
  1: tabla de criterios de reparto
  2: tabla de reparto de Estratégicos
  3: tabla de reparto de Apoyo
  4: tabla de reparto de Operativos
  */
  stage: number = 0;
}
