import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';
import { PopoverController } from '@ionic/angular';
import { AddStockPopoverPage } from '../popovers/add-stock-popover/add-stock-popover.page';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
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
}
