import { Routes } from '@angular/router';
import { LoginComponent } from '@views/login/login.component';
import { HomeComponent } from '@views/home/home.component';
import paths from '@paths';

export const routes: Routes = [
  {
    path: paths.DEFAULT,
    component: LoginComponent,
  },
  {
    path: paths.HOME,
    component: HomeComponent,
  },
];
