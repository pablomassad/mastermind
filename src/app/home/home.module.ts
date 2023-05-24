import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { Fwk4ServicesModule } from 'fwk4-services'
import { HomePage } from './home.page'
import { PilotComponent } from '../pilot/pilot.component'
import { OptionsComponent } from './options';

@NgModule({
   imports: [
      Fwk4ServicesModule,
      CommonModule,
      FormsModule,
      IonicModule,
      RouterModule.forChild([
         {
            path: '',
            component: HomePage
         }
      ])
   ],
   entryComponents:[PilotComponent, OptionsComponent],
   declarations: [HomePage, PilotComponent, OptionsComponent]
})
export class HomePageModule { }
