import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddStockPopoverPage } from './add-stock-popover.page';

const routes: Routes = [
  {
    path: '',
    component: AddStockPopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddStockPopoverPageRoutingModule {}
