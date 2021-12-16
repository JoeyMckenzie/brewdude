import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingHeroComponent } from './landing-hero/landing-hero.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LandingHeroComponent],
  exports: [LandingHeroComponent],
})
export class BrewdudeIoUiComponentsModule {}
