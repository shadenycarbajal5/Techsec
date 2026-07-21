import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { authInterceptor } from './auth/auth.interceptor';
import { ApiConfiguration } from './api/api-configuration';
import { environment } from './environments/environments';

// PrimeNG Config & Theming
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';
import { MessageService, ConfirmationService } from 'primeng/api';

const MyCustomPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#fdfbf7',
      100: '#f5f2eb',
      200: '#e6dfcc',
      300: '#d4c5a0',
      400: '#c5a028',
      500: '#d4af37', // TechSec Gold
      600: '#c29b2f',
      700: '#a38025',
      800: '#82661d',
      900: '#6b5318',
      950: '#42320b'
    },
    colorScheme: {
      dark: {
        primary: {
          color: '#d4af37',
          inverseColor: '#121212',
          hoverColor: '#c5a028',
          activeColor: '#a38025'
        },
        background: {
          primary: '#121212',
          secondary: '#1e1e1e'
        }
      }
    }
  }
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimationsAsync(),
    
    // API Configuration Factory injection
    {
      provide: ApiConfiguration,
      useFactory: () => {
        const config = new ApiConfiguration();
        config.rootUrl = environment.urlBase;
        return config;
      }
    },
    
    // PrimeNG Setup with Theme tokens & dark mode options
    providePrimeNG({
      theme: {
        preset: MyCustomPreset,
        options: {
          darkModeSelector: '.my-app-dark'
        }
      }
    }),
    MessageService,
    ConfirmationService
  ]
};
