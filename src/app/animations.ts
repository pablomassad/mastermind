import {  AnimationBuilder, AnimationPlayer, trigger, transition, state, style, animate, query, stagger, keyframes } from '@angular/animations'

export const fade = trigger('fade', [
   state('void', style({ opacity: 0 })),
   // transition('void => *, * => void', animate('2000ms')),
   transition(':enter, :leave', animate('2000ms'))
])