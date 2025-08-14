import { bootstrapApplication } from '@angular/platform-browser'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { provideRouter } from '@angular/router'
import { provideAnimations } from '@angular/platform-browser/animations'

import { routes } from './app/app.routes'
import { authInterceptor } from './app/core/interceptors/auth.interceptor'
import {AppComponent} from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(),
  ],
}).catch((err) => console.error(err))
