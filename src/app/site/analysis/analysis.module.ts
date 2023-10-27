import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalysisRoutingModule } from './analysis-routing.module';
import { AnalysisComponent } from './analysis.component';
import { ViewAnalysisComponent } from './pages/view-analysis/view-analysis.component';
import { GenerateReportComponent } from './pages/generate-report/generate-report.component';


@NgModule({
  declarations: [
    AnalysisComponent,
    ViewAnalysisComponent,
    GenerateReportComponent,
  ],
  imports: [
    CommonModule,
    AnalysisRoutingModule
  ]
})
export class AnalysisModule { }
