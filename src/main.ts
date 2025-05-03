import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import LogRocket from 'logrocket';

// Initialize LogRocket
LogRocket.init('puvfes/mega-dev');

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);
