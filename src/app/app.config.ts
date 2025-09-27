import { ApplicationConfig } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './Services/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {

  // providers: [provideRouter(routes),  provideHttpClient(withFetch() , withInterceptors([AuthInterceptor]))]
    providers: [provideRouter(routes),  provideHttpClient(withFetch())]

};
function withFetch(): import("@angular/common/http").HttpFeature<import("@angular/common/http").HttpFeatureKind> {
  throw new Error('Function not implemented.');
}

