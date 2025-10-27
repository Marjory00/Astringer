// Astringer/frontend/src/app/notification/notification.component.ts (FINALIZED)

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../core/services/notification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="notification"
      [ngClass]="notification.type"
      *ngIf="notification.message"
    >
      {{ notification.message }}
    </div>
  `,
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  // FIX: Added '!' to indicate it will be assigned in ngOnInit
  notification$!: Observable<any>;
  notification: any = { message: '' }; // Keep initializer for template safety

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    // This is where notification$ gets its value, satisfying the requirement
    this.notification$ = this.notificationService.notification$;

    this.notification$.subscribe(n => {
      this.notification = n;
    });
  }
}
