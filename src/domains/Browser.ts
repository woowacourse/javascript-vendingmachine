import Domain from '../core/Domain';

export interface BrowserState {
  location: string;
}

export default class Browser extends Domain<BrowserState> {
  setLocation(location: string): void {
    this.state.location = location;
  }
}

export const browser = new Browser({
  location: '/',
});
