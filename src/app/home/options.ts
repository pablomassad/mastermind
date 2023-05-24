import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';


@Component({
   selector: 'app-modal',
   templateUrl: 'options.html',
   styleUrls: ['options.scss'],
})
export class OptionsComponent implements OnInit {
   options: any

   constructor(
      private navParams: NavParams,
      private modalCtrl: ModalController
   ){
      console.log('OptionsPage constructor')
      console.log('options: ', JSON.stringify(this.options))
   }
   ngOnInit(){
      this.options = this.navParams.get('options')
   }

   dismiss(){
      this.modalCtrl.dismiss({
         'options': this.options
       })
   }
}