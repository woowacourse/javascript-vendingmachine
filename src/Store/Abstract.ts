export default abstract class Store {
  protected abstract state: IStoreState;
  private subscribers: TRenderMethod[] = [];

  public addSubscriber(subscriber: TRenderMethod): void {
    this.subscribers.push(subscriber);
  }

  public removeSubscriber(subscriber: TRenderMethod): void {
    const subscriberIndex: number = this.subscribers.indexOf(subscriber);
    this.subscribers.splice(subscriberIndex, 1);
  }

  public setState(newState: IStoreState) {
    const changedStateNames: Array<string> = Object.entries(newState).map(([key]) => key);

    this.state = { ...this.state, ...newState };
    this.subscribers.forEach(renderMethod =>
      renderMethod({ state: this.state, changedStateNames }),
    );
  }

  public getState(): IStoreState {
    return { ...this.state };
  }
}
