import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { NotificationService } from '../notifications/notification.service';

/** Application-wide error handler that adds a UI notification to the error handling
 * provided by the default Angular ErrorHandler.
 */
@Injectable()
export class AppErrorHandler extends ErrorHandler {
  constructor(private notificationsService: NotificationService) {
    super();
  }

  handleError(error: Error | HttpErrorResponse) {
    console.log(error);
    // const store = this.injector.get(Store);
    let displayMessage = 'An error occurred.';

    if (error instanceof HttpErrorResponse) {
      if (error.status === 401) {
        this.notificationsService.error(
          'Your Access is denied!! Please login again!'
        );
      }
      if (error.status === 400) {
        this.notificationsService.error(error.error);
      }
    } else {
      this.notificationsService.error(displayMessage);
    }
    if (!environment.production) {
      displayMessage += ' See console for details.';
    }

    super.handleError(error);
  }
}
