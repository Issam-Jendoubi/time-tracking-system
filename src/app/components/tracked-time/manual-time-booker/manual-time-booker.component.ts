import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TrackedTime } from '../models/tracked-time';
import { TrackedTimeService } from '../tracked-time.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-manual-time-booker',
  templateUrl: './manual-time-booker.component.html',
  styleUrls: ['./manual-time-booker.component.scss'],
})
export class ManualTimeBookerComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private trackedTimeService: TrackedTimeService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.formGroup = this.formBuilder.group({
      startDate: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      description: ['', Validators.required],
    });
  }

  onSubmit(values: any): void {
    const trackedTime: TrackedTime = {
      description: values.description,
      startTime: new Date(values.startDate).toISOString(),
      endTime: new Date(values.endDate).toISOString(),
      duration: this.setDuration(values.startTime, values.endTime),
    };
    this.trackedTimeService.createTrackedTime(trackedTime).subscribe(() => {
      this.snackBar.open('time log booked successfully', 'ok', {
        duration: 2000,
      });
      this.formGroup.reset();
      this.router.navigate(['trackedTimes']);
    });
  }

  setDuration(startTime: string, endTime: string): string {
    const addLeadingZero = (value) => (value < 10 ? '0' : '') + value;
    const hours =
      parseInt(endTime.split(':')[0], 10) -
      parseInt(startTime.split(':')[0], 10);
    const minutes =
      parseInt(endTime.split(':')[1], 10) -
      parseInt(startTime.split(':')[1], 10);
    return `${addLeadingZero(hours)}:${addLeadingZero(minutes)}:00`;
  }
}
