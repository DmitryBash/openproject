import {
  EntityStore,
  StoreConfig,
} from '@datorama/akita';
import {
  CollectionState,
  createInitialCollectionState,
} from 'core-app/core/state/collection-store';
import { Weekday } from 'core-app/core/state/days/weekday.model';

export interface WeekdayState extends CollectionState<Weekday> {
}

@StoreConfig({ name: 'weekdays' })
export class WeekdayStore extends EntityStore<WeekdayState> {
  constructor() {
    super(createInitialCollectionState());
  }
}
