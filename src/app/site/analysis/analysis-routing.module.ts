import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerateReportComponent } from './pages/generate-report/generate-report.component';
import { ViewAnalysisComponent } from './pages/view-analysis/view-analysis.component';

const routes: Routes = [
  { path: '', redirectTo: 'view-analysis', pathMatch: 'full'},
  { path: 'view-analysis', component: ViewAnalysisComponent },
  { path: 'generate-report', component: GenerateReportComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalysisRoutingModule { }
