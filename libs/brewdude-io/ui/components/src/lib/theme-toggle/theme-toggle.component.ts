import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'brewdude-io-theme-toggle',
  templateUrl: './theme-toggle.component.html',
})
export class ThemeToggleComponent {
  @Input() darkModeEnabled = false;
  @Output() toggleDarkModeEvent?: EventEmitter<boolean>;

  /**
   * Toggle dark mode, based on the CURRENT dark mode value
   */
  toggleDarkMode() {
    this.toggleDarkModeEvent?.emit(!this.darkModeEnabled);
  }
}
