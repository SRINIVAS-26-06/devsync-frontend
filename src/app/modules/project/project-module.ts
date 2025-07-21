// src/app/modules/project/project-module.ts

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProjectRoutes } from './project-routing-module';

@NgModule({
  imports: [RouterModule.forChild(ProjectRoutes)]
})
export class ProjectModule {}
