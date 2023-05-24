import { Component, ViewChild, OnInit, ViewContainerRef, ComponentFactoryResolver } from '@angular/core'
import { PilotComponent } from '../pilot/pilot.component'
import { AlertController, ModalController } from '@ionic/angular'
import { OptionsComponent } from './options'
import { GlobalService } from 'fwk4-services';
import { fade } from '../animations'

@Component({
   selector: 'app-home',
   templateUrl: 'home.page.html',
   styleUrls: ['home.page.scss'],
   animations: [
      fade
   ]
})
export class HomePage implements OnInit {
   @ViewChild('arenaContainer', { read: ViewContainerRef }) container

   selectedCar: PilotComponent
   options: any
   cars: any = []
   first: PilotComponent

   powerEnabled: boolean = true;

   constructor(
      private resolver: ComponentFactoryResolver,
      private globalSrv: GlobalService,
      private modalCtrl: ModalController,
      private alertCtrl: AlertController
   ) {
      console.log('HomePage constructor')
   }
   ngOnInit() {
      this.globalSrv.getItem('options').then(opts => {
         if (opts != null)
            this.options = opts.data.options
         else {
            this.options = {
               distance: 500,
               diceNum: 2,
               carsNum: 4,
               cars: [
                  { name: 'Car A', image: '../assets/cars/carGreen.png' },
                  { name: 'Car B', image: '../assets/cars/carYellow.png' },
                  { name: 'Car C', image: '../assets/cars/carBlue.png' },
                  { name: 'Car D', image: '../assets/cars/carRed.png' },
                  { name: 'Car E', image: '../assets/cars/carCyan.png' },
                  { name: 'Car F', image: '../assets/cars/carOrange.png' },
                  { name: 'Car G', image: '../assets/cars/carViolet.png' },
                  { name: 'Car H', image: '../assets/cars/carWhite.png' }]
            }
         }
         this.init()
      })
   }
   evalCars() {
      if (!this.options) return 0
      const cols = { 'grid-template-columns': '0px repeat(' + this.options.carsNum + ', 1fr)' }
      return cols
   }
   pilotBoost() {
      this.cars.forEach(car => {
         car.boost()
         if (car.score > this.first.score)
            this.first = car
      })
      console.log('First car: ', this.first.name)
      if (this.first.score > this.options.distance){
         this.showWinner()
      }
      else
         this.first.youAreFirst()
   }
   showWinner() {
      this.powerEnabled = false
      this.first.cups += 1
      setTimeout(async () => {
         const alert = await this.alertCtrl.create({
            header: 'WINNER: ' + this.first.name,
            subHeader: 'Congratulations!!!!',
            message: 'Total cups: ' + this.first.cups,
            buttons: ['OK']
         })
         await alert.present()
         alert.onDidDismiss().then(x=>{
            this.resetCars()
         })
      }, 1000)
   }
   async showOptions() {
      const modal = await this.modalCtrl.create({
         component: OptionsComponent,
         componentProps: { options: this.options }
      })
      await modal.present()
      const opts = await modal.onDidDismiss()
      // this.options = opts
      this.globalSrv.setItem('options', opts, true).then(x => {
         window.location.reload();
      })
   }
   private resetCars(){
      this.cars.forEach(car => {
         car.init()
      })
      setTimeout(() => {
         this.powerEnabled = true
      }, 1000)
   }
   private init() {
      if (!this.container) return
      this.cars = []
      let i = 0
      while (i < this.options.carsNum) {
         const factory = this.resolver.resolveComponentFactory(PilotComponent)
         let botRef = this.container.createComponent(factory)
         botRef.instance.name = this.options.cars[i].name
         botRef.instance.pilotImg = this.options.cars[i].image
         botRef.instance.distance = this.options.distance
         botRef.instance.diceNum = this.options.diceNum
         this.cars.push(botRef.instance)
         i++
      }
      this.first = this.cars[0]
   }
}
