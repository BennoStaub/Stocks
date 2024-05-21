import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';
import { PopoverController } from '@ionic/angular';
import { AddStockPopoverPage } from '../popovers/add-stock-popover/add-stock-popover.page';
import { Stock } from 'src/interfaces/stock.interface';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  stockList: Stock[] = [];


  constructor(
    private firestore: FirestoreService,
    private popoverCtrl: PopoverController
  ) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    /*g
    this.firestore.addNote({title: 'testtitle', text: 'test text hhehe'}).then( data => {
      console.log(data);
    });
    */
   this.firestore.getStocks().subscribe( stockList => {
    this.stockList = stockList;
    this.processStockList(this.stockList);
    console.log(stockList);
   })
  }

  async addStock() {
    const popover = await this.popoverCtrl.create({
      component: AddStockPopoverPage,
      cssClass: 'add-stock-popover',
      componentProps: {
        testKey: 'testinnng'
      }
    });
    return await popover.present();
  }

  processStockList(stockList: Stock[]) {
    stockList.forEach( stock => {
      let sumKGV: number = 0;
      let avgKGV: number = 0;
      let numberYearEntriesKGV: number = 0;
      let startYear: number = 2016;
      let currentYear: number = new Date().getFullYear();
      while(startYear <= currentYear + 2) {
        if(stock[startYear].kgv) {
          sumKGV += stock[startYear].kgv;
          numberYearEntriesKGV += 1;
        }
        startYear += 1;
      }
      avgKGV = sumKGV / numberYearEntriesKGV;
      stock.avgKGV = avgKGV;
      stock[2024].estimatedPrice = stock[2024].estimatedEps * avgKGV;
      stock[2025].estimatedPrice = stock[2025].estimatedEps * avgKGV;
      stock[2026].estimatedPrice = stock[2026].estimatedEps * avgKGV;
    })
  }
}
