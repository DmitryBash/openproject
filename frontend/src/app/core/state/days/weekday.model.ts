import { IHalResourceLinks } from 'core-app/core/state/hal-resource';

export interface Weekday {
  id:string;
  day:1|2|3|4|5|6|7;
  name:string;
  working:boolean;
  _links:IHalResourceLinks;
}
