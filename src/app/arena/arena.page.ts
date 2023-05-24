import { Component, OnInit, ViewChild, ElementRef, EventEmitter, HostListener } from '@angular/core'
import { GameService } from './game.service'

@Component({
   selector: 'app-arena',
   templateUrl: './arena.page.html',
   styleUrls: ['./arena.page.scss'],
})
export class ArenaPage implements OnInit {
   @ViewChild('arena') public canvas: ElementRef

   isImageLoaded: EventEmitter<number> = new EventEmitter();

   constructor(
      private gameService: GameService
   ) {
      console.log('ArenaPage constructor')
   }

   ngOnInit() {
      this.createPlayGround()
   }


	@HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
		this.movePlayer(event, 'keydown');
	}

	@HostListener('document:keyup', ['$event']) onKeyupHandler(event: KeyboardEvent) {
		this.movePlayer(event, 'keyup');
	}

   private createPlayGround(): void {
      const canvasEl: HTMLCanvasElement = this.canvas.nativeElement

      this.gameService.loadAssets(canvasEl).then((image) => {
         setTimeout(() => {
            this.gameService.startGameLoop()
         }, 1000)
      })
   }

	private movePlayer(event: KeyboardEvent, type: string): void {
		if (type === 'keydown') {
         console.log('keyCode: ', event.keyCode)
			if (event.keyCode === 37) {
				this.gameService.moveLeft = true;
			} else if (event.keyCode === 39) {
				this.gameService.moveRight = true;
			} else if (event.keyCode === 38) {
				this.gameService.moveUP = true;
			} else if (event.keyCode === 40) {
				this.gameService.moveDown = true;
			}
		} else if (type === 'keyup') {
			this.gameService.moveDown = false;
			this.gameService.moveLeft = false;
			this.gameService.moveRight = false;
			this.gameService.moveUP = false;
		}
	}   
}
