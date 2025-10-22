
// Astringer/frontend/src/app/status-class.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'statusClass',
 standalone: true // Standalone pipe definition
})

export class StatusClassPipe implements PipeTransform {

  /**
   * * Transform a full status string (e.g., "In Transit") into a lowercase CSS class prefix (e.g., "in").
   *
   */
  transform(value: string | undefined): striing {
    if (!value) {
      return '';
    }

    // Split by space, get the first word (which is the status), and convert to lowercase.
    const firstWord = value.split('')[0];
    return firstWord.toLowerCase();
  }
}
