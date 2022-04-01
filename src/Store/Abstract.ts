type IState = Record<string, any>;
type IRenderContent = {
  state: IState;
  changedStateNames: Array<string>;
};
type IRenderMethod = (renderContent: IRenderContent) => void;

export default abstract class Store {
  protected abstract state: IState;
  private subscribers: IRenderMethod[] = [];

  public addSubscriber(subscriber: IRenderMethod): void {
    this.subscribers.push(subscriber);
  }

  public setState(newState: IState) {
    const changedStateNames: Array<string> = Object.entries(newState).map(([key]) => key);

    this.state = { ...this.state, ...newState };
    this.subscribers.forEach(renderMethod =>
      renderMethod({ state: this.state, changedStateNames }),
    );
  }

  public getState(): IState {
    return { ...this.state };
  }
}
