import { Component } from '@angular/core';
import {
  trigger,
  transition,
  state,
  style,
  animate,
} from '@angular/animations';

@Component({
  selector: 'brewdude-io-landing-hero',
  templateUrl: './landing-hero.component.html',
  animations: [
    trigger('menu', [
      state(
        'void',
        style({
          opacity: 0,
          transform: 'scale(0.95)',
        })
      ),
      state(
        '*',
        style({
          opacity: 1,
          transform: 'scale(1)',
        })
      ),
      transition(':enter', [animate('150ms cubic-bezier(0, 0, 0.2, 1)')]),
      transition(':leave', [animate('100ms cubic-bezier(0.4, 0, 1, 1)')]),
    ]),
  ],
})
export class LandingHeroComponent {
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
