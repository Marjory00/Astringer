// Astringer/frontend/src/app/notification.service.ts (FINALIZED)

import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';

interface Notification {
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new BehaviorSubject<Notification>({ message: '', type: 'info' });
  notification$ = this.notificationSubject.asObservable();

  private readonly DEFAULT_DURATION = 4000; // 4 seconds

  show(message: string, type: 'success' | 'error' | 'info', duration: number = this.DEFAULT_DURATION) {
    // 1. Set the new notification
    this.notificationSubject.next({ message, type });

    // 2. Clear the notification after the duration
    timer(duration).subscribe(() => {
      this.clear();
    });
  }

  clear() {
    this.notificationSubject.next({ message: '', type: 'info' });
  }
}
