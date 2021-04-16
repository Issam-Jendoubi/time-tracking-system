import { TrackedTimesListComponent } from './components/tracked-time/tracked-times-list/tracked-times-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrackerComponent } from './components/tracked-time/tracker/tracker.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/trackedTimes',
    pathMatch: 'full',
  },
  {
    path: 'trackedTimes',
    component: TrackedTimesListComponent,
  },
  {
    path: 'tracker',
    component: TrackerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
