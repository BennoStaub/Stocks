import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Stock } from 'src/interfaces/stock.interface';

@Component({
  selector: 'app-add-stock-popover',
  templateUrl: './add-stock-popover.page.html',
  styleUrls: ['./add-stock-popover.page.scss'],
})
export class AddStockPopoverPage implements OnInit {
  histYears: string[] = ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'];
  estYears: string[] = ['2024', '2025', '2026', '2027'];
  stock: Stock = {
    2016: {},
    2017: {},
    2018: {},
    2019: {},
    2020: {},
    2021: {},
    2022: {},
    2023: {},
    2024: {},
    2025: {},
    2026: {},
    2027: {},
  } as Stock;
  

  constructor(
    private firestore: FirestoreService,
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() {
  }

  save() {
    console.log(this.stock);
    this.firestore.addStock(this.stock);
    this.popoverCtrl.dismiss();
  }

}
