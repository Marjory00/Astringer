// src/app/notification.service.ts (FINALIZED)

import { Injectable } from '@angular/core';
import { BehaviorSubject, timer, Subscription } from 'rxjs';

// Updated Model to include a unique ID
export interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning'; // Added 'warning' type for flexibility
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // Use a unique dummy ID for the initial state so the first real notification is always emitted.
  private notificationSubject = new BehaviorSubject<Notification>({ id: -1, message: '', type: 'info' });
  notification$ = this.notificationSubject.asObservable();

  private timerSubscription: Subscription | null = null;
  private nextId = 0;
  private readonly DEFAULT_DURATION = 4000; // 4 seconds

  show(message: string, type: 'success' | 'error' | 'info' | 'warning', duration: number = this.DEFAULT_DURATION) {
    // 1. Unsubscribe any existing timer to prevent premature clearing
    if (this.timerSubscription) {
        this.timerSubscription.unsubscribe();
    }

    // 2. Set the new notification with a unique ID
    const newNotification: Notification = {
        id: this.nextId++,
        message,
        type
    };
    this.notificationSubject.next(newNotification);

    // 3. Clear the notification after the duration
    this.timerSubscription = timer(duration).subscribe(() => {
        this.clear();
        this.timerSubscription = null;
    });
  }

  clear() {
    // Reset to a known empty state. The component should hide the notification when message is empty.
    this.notificationSubject.next({ id: -1, message: '', type: 'info' });
  }

  // Convenience methods (optional, but helpful)
  success(message: string, duration?: number): void {
    this.show(message, 'success', duration);
  }
  error(message: string, duration?: number): void {
    this.show(message, 'error', duration);
  }
  info(message: string, duration?: number): void {
    this.show(message, 'info', duration);
  }
  warning(message: string, duration?: number): void {
    this.show(message, 'warning', duration);
  }
}
