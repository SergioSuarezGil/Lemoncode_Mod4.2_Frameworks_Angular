import { Routes } from '@angular/router';
import { AboutPageComponent } from '../pages/about/about-page.component';
import { UsersCrudPageComponent } from '../pages/crud/crud-page.component';
import { DashboardPageComponent } from '../pages/dashboard/dashboard-page.component';
import { GalleryPageComponent } from '../pages/gallery/gallery-page.component';
import { HomePageComponent } from '../pages/home/home-page.component';
import { LoginPageComponent } from '../pages/login/login-page.component';
import { ProfilePageComponent } from '../pages/profile/profile-page.component';
import { authGuard } from '../shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'acerca-de',
    component: AboutPageComponent
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    component: DashboardPageComponent
  },
  {
    path: 'galeria',
    canActivate: [authGuard],
    component: GalleryPageComponent
  },
  {
    path: 'users-crud',
    canActivate: [authGuard],
    component: UsersCrudPageComponent
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    component: ProfilePageComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];