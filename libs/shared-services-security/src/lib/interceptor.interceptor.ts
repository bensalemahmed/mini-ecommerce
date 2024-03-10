import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loadingSubject.next(true);

    const modifiedRequest = request.clone({});

    return next.handle(modifiedRequest).pipe(
      catchError((error) => {
        // Handle error as needed (e.g., logging, showing an error message)
        return throwError(error);
      }),
      finalize(() => {
        this.loadingSubject.next(false);
      })
    );
  }
}
