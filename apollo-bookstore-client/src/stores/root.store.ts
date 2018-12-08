import { RouterState, RouterStore } from 'mobx-state-router';
import { routes } from './routes';

const notFound = new RouterState('notFound');

export class RootStore {
    routerStore = new RouterStore(this, routes, notFound);
}

export const rootStore = new RootStore();
