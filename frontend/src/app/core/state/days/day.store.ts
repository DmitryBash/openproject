import {
  EntityStore,
  StoreConfig,
} from '@datorama/akita';
import {
  CollectionState,
  createInitialCollectionState,
} from 'core-app/core/state/collection-store';
import { Day } from 'core-app/core/state/days/day.model';

export interface DayState extends CollectionState<Day> {
}

@StoreConfig({ name: 'days' })
export class DayStore extends EntityStore<DayState> {
  constructor() {
    super(createInitialCollectionState());
  }
}
