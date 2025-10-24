import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss' // <-- Correctly using SCSS
})
export class SettingsComponent {
  // Placeholder data
  userName = 'Marjory Webmaster';
  email = 'marjory.web@astringer.com';
}
