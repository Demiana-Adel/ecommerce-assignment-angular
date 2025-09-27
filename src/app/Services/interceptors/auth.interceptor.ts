import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // return next.handle(request);

    const myToken = localStorage.getItem('token');
    const cloneRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${myToken}`
      }
    });

    return next.handle(cloneRequest);
  }
}
