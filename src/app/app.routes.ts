import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PeopleComponent } from './components/people/people.component';
import { ListComponent } from './components/people/list/list.component';
import { DetailsComponent } from './components/people/details/details.component';
const APP_ROUTES: Routes = [
  { path: 'home', component : HomeComponent },
  { path: 'people',
    component : PeopleComponent,
    children: [
      { path: 'list', component: ListComponent },
      { path: ':id/details', component: DetailsComponent },
      { path: '**', pathMatch: 'full', redirectTo: 'list'}
    ]
  },
  { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash: true });
