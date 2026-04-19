import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/home/pages/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/profile/pages/profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [authGuard]
      }
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/pages/login/login.component').then(m => m.LoginComponent)
      }
    ]
  },
  { path: '**', redirectTo: '' }
];