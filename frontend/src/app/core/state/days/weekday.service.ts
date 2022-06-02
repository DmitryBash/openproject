import { Injectable } from '@angular/core';
import {
  map,
  tap,
} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiV3Service } from 'core-app/core/apiv3/api-v3.service';
import { IHALCollection } from 'core-app/core/apiv3/types/hal-collection.type';
import { HttpClient } from '@angular/common/http';
import { ApiV3ListParameters } from 'core-app/core/apiv3/paths/apiv3-list-resource.interface';
import {
  collectionKey,
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

  fetchWeekdays(params:ApiV3ListParameters):Observable<IHALCollection<Weekday>> {
    const collectionURL = collectionKey(params);

    return this
      .http
      .get<IHALCollection<Weekday>>(this.weekdaysPath + collectionURL)
      .pipe(
        map((collection) => extendCollectionElementsWithId(collection)),
        tap((collection) => insertCollectionIntoState(this.store, collection, collectionURL)),
      );
  }
}
