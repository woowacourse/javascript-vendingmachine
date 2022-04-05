export default abstract class Store<StateInterface> {
  protected abstract state: StateInterface;
  private subscribers: RenderMethod[] = [];

  public addSubscriber(subscriber: RenderMethod): void {
    this.subscribers.push(subscriber);
  }

  public removeSubscriber(subscriber: RenderMethod): void {
    const subscriberIndex: number = this.subscribers.indexOf(subscriber);
    this.subscribers.splice(subscriberIndex, 1);
  }

  public setState(newState: StateInterface) {
    const changedStateNames: Array<string> = Object.entries(newState).map(([key]) => key);

    this.state = { ...this.state, ...newState };
    this.subscribers.forEach(renderMethod =>
      renderMethod({ state: this.state, changedStateNames }),
    );
  }

  public getState(): StateInterface {
    return { ...this.state };
  }
}
