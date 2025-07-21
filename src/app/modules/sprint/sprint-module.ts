// src/app/modules/sprint/sprint-module.ts

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SprintRoutes } from './sprint-routing-module';

@NgModule({
  imports: [RouterModule.forChild(SprintRoutes)]
})
export class SprintModule {}
