import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { interval, Subscription, timer } from 'rxjs';
import { TrackedTime } from '../models/tracked-time';
import { TrackedTimeService } from '../tracked-time.service';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss'],
})
export class TrackerComponent implements OnInit {
  seconds = 0;
  hours = 0;
  minutes = 0;
  subscription: Subscription;
  timer: number;
  formGroup: FormGroup;
  timerStarted = false;
  automaticProcedure = true;

  constructor(
    private formBuilder: FormBuilder,
    private trackedTimeService: TrackedTimeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.timer = 0;
    this.createForm();
  }

  createForm(): void {
    this.formGroup = this.formBuilder.group({
      hours: ['00', [Validators.required]],
      minutes: ['00', [Validators.required]],
      seconds: ['00', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit(values: any): void {
    const trackedTime: TrackedTime = {
      description: values.description,
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      duration: `${values.hours}:${values.minutes}:${values.seconds}`,
    };
    this.trackedTimeService.createTrackedTime(trackedTime).subscribe(() => {
      this.snackBar.open('time log booked successfully', 'ok', {
        duration: 3000,
      });
      this.patchFormValues(0, 0, 0);
    });
  }

  patchFormValues(seconds, minutes, hours): void {
    const addLeadingZero = (value) => (value < 10 ? '0' : '') + value;
    this.formGroup.patchValue({
      seconds: addLeadingZero(seconds),
      minutes: addLeadingZero(minutes),
      hours: addLeadingZero(hours),
      description: '',
    });
  }

  setBookingProcedure(): void {
    this.automaticProcedure = !this.automaticProcedure;
  }

  startTracker(): void {
    this.timerStarted = !this.timerStarted;
    if (this.timerStarted) {
      this.subscription = interval(1000).subscribe((val) => {
        this.timer++;
        this.seconds = Math.trunc(this.timer % 60);
        this.minutes = Math.trunc(this.timer / 60);
        this.hours = Math.trunc(this.timer / 3600);
        this.patchFormValues(this.seconds, this.minutes, this.hours);
      });
    } else {
      this.pauseTracker();
    }
  }

  resumeTracker(): void {
    this.timerStarted = false;
    this.subscription.unsubscribe();
    this.timer = 0;
    this.seconds = 0;
    this.hours = 0;
    this.minutes = 0;
    this.patchFormValues(this.seconds, this.minutes, this.hours);
  }

  pauseTracker(): void {
    this.timerStarted = false;
    this.subscription.unsubscribe();
  }
}
