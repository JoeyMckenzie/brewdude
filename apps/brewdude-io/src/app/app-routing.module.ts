import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: () =>
            import('@brewdude/brewdude-io/ui/pages').then(
              (m) => m.BrewdudeIoUiPagesModule
            ),
        },
      ],
      {
        initialNavigation: 'enabledBlocking',
        scrollPositionRestoration: 'top',
      }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
