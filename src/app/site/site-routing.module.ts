import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'elements', pathMatch: 'full'},
      {
        path: 'elements',
        loadChildren: () => import('./elements/elements.module').then(m => m.ElementsModule)
      },
      {
        path: 'relations',
        loadChildren: () => import('./relations/relations.module').then(m => m.RelationsModule)
      },
      {
        path: 'analysis',
        loadChildren: () => import('./analysis/analysis.module').then(m => m.AnalysisModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
