import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TaskRoutes } from './task-routing-module';

@NgModule({
  imports: [RouterModule.forChild(TaskRoutes)],
})
export class TaskModule {}
