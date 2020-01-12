import { action, observable } from 'mobx';
import { persist } from 'mobx-persist';

import { IEvent } from '../models/event';

export interface IEventsSettingsStore {
  event: IEvent;
  events: [];

  addEvent: (
    title: string,
    description: string,
    price: number
  ) => Promise<void>;
  receiveEvents: () => Promise<void>;
}

export const EVENTS_SETTINGS_STORE = 'EVENTS_SETTINGS_STORE';

export class EventsSettingsStore implements IEventsSettingsStore {
  @persist('object') @observable public event = {
    eventTitle: '',
    eventDescription: '',
    price: 0
  };
  @persist @observable public events = [];
  @observable public error = '';

  @action.bound
  public async addEvent(title: string, description: string, price: number) {
    throw Error('Not implemented');
  }

  public clean = () => {
    throw Error('Not implemented');
  }
}
