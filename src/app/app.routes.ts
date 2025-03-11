import { Routes } from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {VideoListComponent} from './a1/a1.component';
import {UpgradeComponent} from './upgrade/upgrade.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: VideoListComponent},
  { path: 'upgrade', component: UpgradeComponent},
  { path: '**', redirectTo: 'login' },
];
