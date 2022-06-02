import { Injectable } from '@angular/core';
import {
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import {
  EMPTY,
  Observable,
} from 'rxjs';
import { ApiV3Service } from 'core-app/core/apiv3/api-v3.service';
import { IHALCollection } from 'core-app/core/apiv3/types/hal-collection.type';
import { HttpClient } from '@angular/common/http';
import {
  extendCollectionElementsWithId,
  insertCollectionIntoState,
} from 'core-app/core/state/collection-store';
import { WeekdayStore } from 'core-app/core/state/days/weekday.store';
import { WeekdayQuery } from 'core-app/core/state/days/weekday.query';
import { Weekday } from 'core-app/core/state/days/weekday.model';

@Injectable()
export class WeekdayResourceService {
  protected store = new WeekdayStore();

  readonly query = new WeekdayQuery(this.store);

  private get weekdaysPath():string {
    return this
      .apiV3Service
      .days
      .week
      .path;
  }

  constructor(
    private http:HttpClient,
    private apiV3Service:ApiV3Service,
  ) {
  }

  require():Observable<Weekday[]> {
    return this
      .query
      .selectHasCache()
      .pipe(
        switchMap((hasCache) => (hasCache ? EMPTY : this.fetchWeekdays())),
        switchMap(() => this.query.selectAll()),
      );
  }

  private fetchWeekdays():Observable<IHALCollection<Weekday>> {
    const collectionURL = 'all'; // We load all weekdays

    return this
      .http
      .get<IHALCollection<Weekday>>(this.weekdaysPath)
      .pipe(
        map((collection) => extendCollectionElementsWithId(collection)),
        tap((collection) => insertCollectionIntoState(this.store, collection, collectionURL)),
      );
  }
}
