import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserRoutes } from './user-routing-module';

@NgModule({
  imports: [RouterModule.forChild(UserRoutes)],
})
export class UserModule {}
