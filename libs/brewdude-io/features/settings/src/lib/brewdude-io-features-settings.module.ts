import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DarkModeService } from './services/dark-mode.service';
import { SettingsFacade } from './+state/settings.facade';

@NgModule({
  imports: [CommonModule],
  providers: [DarkModeService, SettingsFacade],
})
export class BrewdudeIoFeaturesSettingsModule {}
