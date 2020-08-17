import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse,
  HttpEvent
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../utils/types/http';
import { UserKey } from '../utils/types/sessionStorage';
import { SystemService } from '../services/system.service';
import { Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private activeRequests = 0;
  constructor(private system: SystemService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    this.activeRequests += 1;
    this.system.LoadingState = true;
    const user: User = JSON.parse(sessionStorage.getItem(UserKey));
    return next
      .handle(
        user === null
          ? request
          : request.clone({
              headers: new HttpHeaders().set('Authorization', user.token)
            })
      )
      .pipe(
        finalize(() => {
          this.activeRequests -= 1;
          if (this.activeRequests === 0) {
            this.system.LoadingState = false;
          }
        })
      );
  }
}
