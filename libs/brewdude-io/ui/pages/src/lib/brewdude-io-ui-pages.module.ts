import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BrewdudeIoUiComponentsModule } from '@brewdude/brewdude-io/ui/components';

@NgModule({
  imports: [
    CommonModule,
    BrewdudeIoUiComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,
      },
    ]),
  ],
  declarations: [HomeComponent],
})
export class BrewdudeIoUiPagesModule {}
