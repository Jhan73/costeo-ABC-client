import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalysisRoutingModule } from './analysis-routing.module';
import { AnalysisComponent } from './analysis.component';
import { ViewAnalysisComponent } from './pages/view-analysis/view-analysis.component';
import { GenerateReportComponent } from './pages/generate-report/generate-report.component';

import { MatCardModule } from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TableIcDcComponent } from './pages/generate-report/table-ic-dc/table-ic-dc.component';
import { TableSicDistributionComponent } from './pages/generate-report/table-sic-distribution/table-sic-distribution.component';
import { TableSupicDistributionComponent } from './pages/generate-report/table-supic-distribution/table-supic-distribution.component';
import { TableOicDistributionComponent } from './pages/generate-report/table-oic-distribution/table-oic-distribution.component';
import { TableProdActComponent } from './pages/view-analysis/table-prod-act/table-prod-act.component';

@NgModule({
    declarations: [
        AnalysisComponent,
        ViewAnalysisComponent,
        GenerateReportComponent,
        TableProdActComponent
    ],
    imports: [
        CommonModule,
        AnalysisRoutingModule,
        MatCardModule,
        MatProgressBarModule,
        MatTableModule,
        MatFormFieldModule,
        TableIcDcComponent,
        TableSicDistributionComponent,
        TableSupicDistributionComponent,
        TableOicDistributionComponent
    ]
})
export class AnalysisModule { }
