import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AnimationBuilder, AnimationPlayer, trigger, state, style, animate, transition, keyframes, query, stagger } from '@angular/animations'

@Component({
   selector: 'app-pilot',
   templateUrl: './pilot.component.html',
   styleUrls: ['./pilot.component.scss'],
   animations: [
      trigger('carState', [
         state('prepared', style({ transform: 'translateX(0px) translateY(100px)' })),
         state('ready', style({ transform: 'translateX(0vw) translateY(0vh)' })),
         state('power', style({})),
         transition('prepared => ready', [
            animate('800ms')
         ])
      ]),
      trigger('linesState', [
         state('ready', style({})),
         state('state0', style({ transform: 'translateX(0px) translateY(0px)' })),
         state('state1', style({ transform: 'translateX(0px) translateY(14px)' })),
         transition('state0 => state1', [
            animate('200ms')
         ])
      ]),
      trigger('highlight', [
         state('on', style({ color: 'white', opacity: 1 })),
         state('off', style({ color: 'red', opacity: .5 })),
         transition('void <=> off', [
            animate('200ms')
         ]),
         transition('off <=> on', [
            animate('200ms')
         ])
      ])
   ]
})
export class PilotComponent implements OnInit {
   @ViewChild('ruta') ruta
   @ViewChild('car') car
   @ViewChild('lines') lines
   @ViewChild('highlight') beFirst

   @Input() pilotImg: string
   @Input() distance: number
   @Input() diceNum: number
   @Input()
   get name() {
      return this._name
   }
   set name(val) {
      this._name = val
   }

   cups: number = 0
   score: number = 0
   power: number = 0

   private _name: string

   highlightState: string = 'off'

   player: AnimationPlayer
   playerLines: AnimationPlayer
   currentLinesState: string = 'ready'

   currentCarState: string = 'prepared'
   bot: string = '0px'
   dy: number = 0
   factor: number = 0

   constructor(
      private builder: AnimationBuilder
   ) {
   }

   ngOnInit() {
      console.log('car: ', this._name)
      this.currentCarState = 'ready'
   }
   async init() {
      await this.changeCarState('prepared')
      await this.changeCarState('ready')
      this.currentLinesState = 'ready'
      this.animCar(this.dy, 0)
      this.score = 0
      this.power = 0
      this.dy = 0      
   }
   async boost() {
      if (this.currentCarState == 'ready') {
         this.factor = (this.ruta.nativeElement.clientHeight - this.car.nativeElement.clientHeight) / this.distance
         this.currentLinesState = 'state0'
         this.currentCarState = 'power'
         //await this.changeCarState('power')
      }

      this.power = Math.ceil(Math.random() * this.diceNum * 6)
      this.score = this.score + this.power
      const val = this.power * this.factor
      const d0 = this.dy
      const d1 = this.dy + val
      this.animCar(d0, d1)
      this.dy = this.dy + val
      await this.hightlight('off')
   }
   async youAreFirst() {
      this.hightlight('on')
   }
   async animLinesDone(event) {
      if (this.currentLinesState == 'ready') return

      if (this.currentLinesState == 'state0')
         this.currentLinesState = 'state1'
      else
         this.currentLinesState = 'state0'
   }
   async animCarDone(event) {
      console.log('animation car from: ' + event.fromState + ' to ' + event.toState)
   }

   private hightlight(onoff) {
      return new Promise<any>((resolve, reject) => {
         setTimeout(() => {
            this.highlightState = onoff
            resolve()
         }, 100)
      })
   }
   private changeCarState(st) {
      return new Promise<any>((resolve, reject) => {
         setTimeout(() => {
            this.currentCarState = st
            resolve()
         }, 100)
      })
   }
   private animCar(d0, d1) {
      const animCar = this.builder.build([
         style({
            transform: 'translateX(0vw) translateY(-' + d0 + 'px)',
         }),
         animate('1000ms ease', keyframes([
            style({ transform: 'translateX(0vw) translateY(-' + d0 + 'px)', offset: 0.5 }),
            style({ transform: 'translateX(0vw) translateY(-' + d1 + 'px)', offset: 1 })
         ]))
      ])

      this.player = animCar.create(this.car.nativeElement, {})
      this.player.play()
      // this.player.onDone(() => {
      // this.killPlayer()
      // if (this.isBusy == true)
      //    this.anim(delta)
      // })
   }
}
