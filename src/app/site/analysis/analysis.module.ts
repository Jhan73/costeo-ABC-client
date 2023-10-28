import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalysisRoutingModule } from './analysis-routing.module';
import { AnalysisComponent } from './analysis.component';
import { ViewAnalysisComponent } from './pages/view-analysis/view-analysis.component';
import { GenerateReportComponent } from './pages/generate-report/generate-report.component';

import { MatCardModule } from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTableModule} from '@angular/material/table';
import { TableIcDcComponent } from './pages/generate-report/table-ic-dc/table-ic-dc.component';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
  declarations: [
    AnalysisComponent,
    ViewAnalysisComponent,
    GenerateReportComponent,
  ],
  imports: [
    CommonModule,
    AnalysisRoutingModule,
    MatCardModule,
    MatProgressBarModule,
    MatTableModule,
    TableIcDcComponent,
    MatFormFieldModule
  ]
})
export class AnalysisModule { }
