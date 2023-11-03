import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelationsRoutingModule } from './relations-routing.module';
import { RelationsComponent } from './relations.component';
import { ActivityProductComponent } from './pages/activity-product/activity-product.component';
import { CostCenterResourceComponent } from './pages/cost-center-resource/cost-center-resource.component';
import { ResourceActivityComponent } from './pages/resource-activity/resource-activity.component';
import { MaterialLaborComponent } from './pages/material-labor/material-labor.component';
import { BaseTableModule } from 'src/app/shared/base/components/base-table/base-table.module';


@NgModule({
  declarations: [
    RelationsComponent,
    ActivityProductComponent,
    CostCenterResourceComponent,
    ResourceActivityComponent,
    MaterialLaborComponent,
  ],
  imports: [
    CommonModule,
    RelationsRoutingModule,
    BaseTableModule
  ]
})
export class RelationsModule { }
