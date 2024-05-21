import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddStockPopoverPageRoutingModule } from './add-stock-popover-routing.module';

import { AddStockPopoverPage } from './add-stock-popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddStockPopoverPageRoutingModule
  ],
  declarations: [AddStockPopoverPage]
})
export class AddStockPopoverPageModule {}
