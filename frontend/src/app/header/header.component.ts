import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface NavItem {
  path: string;
  label: string;
  icon: string; // Font Awesome class
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  appTitle: string = 'Astringer Logistics';
  trackingId: string = '';
  isMobileMenuOpen: boolean = false;

  navItems: NavItem[] = [
    { path: '/dashboard', label: 'Dashboard', icon: 'fa-chart-line' },
    { path: '/planning', label: 'Planning', icon: 'fa-calendar-alt' },
    { path: '/reporting', label: 'Reporting', icon: 'fa-clipboard-list' },
    { path: '/settings', label: 'Settings', icon: 'fa-cog' }
  ];

  constructor(private router: Router) {}

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  onTrackSubmit(): void {
    const id = this.trackingId.trim();
    if (id) {
      this.router.navigate(['/track', id]);
      this.trackingId = '';
    }
  }

  onQuickTrack(): void {
    // Optional: implement quick tracking logic here
    console.log('Quick track triggered');
  }
}
