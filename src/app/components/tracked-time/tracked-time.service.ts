import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrackedTime } from './models/tracked-time';

@Injectable({
  providedIn: 'root',
})
export class TrackedTimeService {
  serverUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllTrackedTimes(): Observable<TrackedTime[]> {
    return this.http.get<TrackedTime[]>(this.serverUrl + '/trackedTime');
  }

  createTrackedTime(trackedTime: TrackedTime): Observable<TrackedTime> {
    return this.http.post<TrackedTime>(
      this.serverUrl + '/trackedTime',
      trackedTime
    );
  }

  updateTrackedTime(
    trackedTime: Partial<TrackedTime>
  ): Observable<TrackedTime> {
    return this.http.patch<TrackedTime>(
      this.serverUrl + '/trackedTime/' + trackedTime.id,
      trackedTime
    );
  }

  getSingleTrackedTime(id: string): Observable<TrackedTime> {
    return this.http.get<TrackedTime>(this.serverUrl + '/trackedTime/' + id);
  }

  deleteTrackedTime(id: string): Observable<TrackedTime> {
    return this.http.delete<TrackedTime>(this.serverUrl + '/trackedTime/' + id);
  }
}
