// src/app/settings/settings.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  // --- Tab Control ---
  activeTab: 'general' | 'notifications' | 'data' = 'general';

  // --- General Settings ---
  theme: 'light' | 'dark' = 'light';
  itemsPerPage: number = 25;
  dateFormat: string = 'MM/dd/yyyy';

  // --- Notification Settings ---
  emailAlerts: boolean = true;
  smsAlerts: boolean = false;
  desktopNotifications: boolean = true;

  // --- Data Management ---
  lastExportDate: Date = new Date(2025, 9, 20); // Placeholder date

  constructor() {}

  setActiveTab(tab: 'general' | 'notifications' | 'data'): void {
    this.activeTab = tab;
  }

  saveSettings(): void {
    // In a real application, this would call a SettingsService to persist data
    console.log('Settings Saved:', {
      theme: this.theme,
      itemsPerPage: this.itemsPerPage,
      emailAlerts: this.emailAlerts,
      smsAlerts: this.smsAlerts
    });

    // Use our NotificationService (assuming it's injected, though skipping for brevity here)
    // notificationService.success('Settings saved successfully!');
    alert('Settings saved successfully!');
  }

  exportData(): void {
    alert('Simulating data export... Check your downloads folder.');
  }

  clearCache(): void {
    if (confirm('Are you sure you want to clear the local application cache?')) {
      alert('Local cache cleared!');
    }
  }
}
