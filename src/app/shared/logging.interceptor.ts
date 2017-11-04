import { Observable } from 'rxjs/Observable';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';
import 'rxjs/add/operator/do';


export class LoggingInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).do(
      event => {
        console.log('logging interceptor', event);
      }
    )
  }

}
