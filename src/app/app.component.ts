import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  menus = [
    {
      routerLink: 'trackedTimes',
      description: 'time tracked List',
    },
    {
      routerLink: 'tracker',
      description: 'Track time',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
