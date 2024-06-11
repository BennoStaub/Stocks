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
  yearList: string[] = ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027']


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
        if(stock[startYear].kgv && !stock[startYear].ignoreKGV) {
          sumKGV += stock[startYear].kgv;
          numberYearEntriesKGV += 1;
        }
        startYear += 1;
      }
      avgKGV = Number((sumKGV / numberYearEntriesKGV).toFixed(1));
      stock.avgKGV = avgKGV;
      stock[2024].estimatedPrice = stock[2024].estimatedEps * avgKGV;
      stock[2025].estimatedPrice = stock[2025].estimatedEps * avgKGV;
      stock[2026].estimatedPrice = stock[2026].estimatedEps * avgKGV;
    })
  }

  computePricePotential(pricePotential: number, price: number) {
    let potential: number = (((pricePotential / price) - 1) * 100);
    let potentialString : string = potential.toFixed(1);
    if(potential >= 0) {
      potentialString = '+' + potentialString + '%';
    } else {
      potentialString = potentialString + '%';
    }
    return potentialString;
  }

  computeBackgroundColor(pricePotential: number, price: number) {
    let colors: string[] = ['#7c0a02', '#89221b', '#963a34', '#ffffff', '#0eff00', '#1fc600', '#089000', '#0a5d00'];
    let ratio : number = pricePotential / price;
    // - 50%- -> 0
    // - 50-31% -> 1
    // - 30-11% -> 2
    // - 10-1% -> 3
    // + 0-33% -> 4
    // + 34-66% -> 5
    // + 67-100% -> 6
    // + 101%+ -> 7
    if(ratio <= 0.5) {
      return colors[0];
    } else if(ratio <= 0.7) {
      return colors[1];
    } else if(ratio <= 0.9) {
      return colors[2];
    } else if(ratio <= 1.1) {
      return colors[3];
    } else if(ratio <= 1.33) {
      return colors[4];
    } else if(ratio <= 1.66) {
      return colors[5];
    } else if(ratio <= 2) {
      return colors[6];
    } else {
      return colors[7];
    }
  }

  KGVValuesshown(stock: Stock) {
    return stock.KGVValuesshown;
  }

  async showKGVValues(stock: Stock) {
    stock.KGVValuesshown = !stock.KGVValuesshown;
    await this.firestore.updateStock(stock);
  }

  async ignoreKGV(stock: Stock, year: string) {
    if(stock[year].ignoreKGV) {
      stock[year].ignoreKGV = !stock[year].ignoreKGV;
    } else {
      stock[year].ignoreKGV = true;
    }
    await this.firestore.updateStock(stock);
  }
}
