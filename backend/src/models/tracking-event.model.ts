
// src/app/tracking-event.model.ts (NEW FILE)

export interface TrackingEvent {
  status: string;
  location: string;
  timestamp: string; // ISO date string or similar
  isComplete: boolean; // For visual timeline completion
}
