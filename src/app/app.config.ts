import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideStore } from '@ngrx/store';
import { appReducer } from './store/app.reducer';
import { provideEffects } from '@ngrx/effects';
import { appEffect } from './store/app.effect';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authInterceptor } from './interceptors/auth.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-top-center',
      timeOut: 2000,
      closeButton: true,
    }),
    provideStore(appReducer),
    provideEffects(appEffect),
    provideStoreDevtools({ logOnly: !isDevMode() }),
    NgbModule
  ]
};
